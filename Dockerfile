# Build Stage: Node.js and NGINX Compilation
FROM alpine:latest AS build-stage

# Install dependencies for building NGINX, compiling modules, and Node.js
RUN apk add --no-cache \
    build-base \
    openssl-dev \
    pcre-dev \
    zlib-dev \
    linux-headers \
    curl \
    git \
    nodejs \
    npm

# Set up Node.js build directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files and build the Node.js project
COPY . .
RUN npm run build && ls -la /app/dist  # Check if the dist folder was created

# Download and compile NGINX with Headers-More module
ARG NGINX_VERSION=1.26.2
ARG HEADERS_MORE_VERSION=0.37

# Download and extract NGINX source
WORKDIR /usr/local/src
RUN curl -fSL https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz -o nginx.tar.gz && \
    tar -zxvf nginx.tar.gz && \
    rm nginx.tar.gz

# Download Headers-More module
RUN curl -fSL https://github.com/openresty/headers-more-nginx-module/archive/refs/tags/v${HEADERS_MORE_VERSION}.tar.gz -o headers-more.tar.gz && \
    tar -zxvf headers-more.tar.gz && \
    rm headers-more.tar.gz

# Configure and compile NGINX with the Headers-More module
WORKDIR /usr/local/src/nginx-${NGINX_VERSION}
RUN ./configure \
    --prefix=/etc/nginx \
    --sbin-path=/usr/sbin/nginx \
    --modules-path=/usr/lib/nginx/modules \
    --conf-path=/etc/nginx/nginx.conf \
    --error-log-path=/var/log/nginx/error.log \
    --http-log-path=/var/log/nginx/access.log \
    --pid-path=/var/run/nginx.pid \
    --lock-path=/var/run/nginx.lock \
    --http-client-body-temp-path=/var/cache/nginx/client_temp \
    --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
    --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
    --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
    --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
    --with-http_ssl_module \
    --with-http_v2_module \
    --with-http_stub_status_module \
    --with-stream \
    --add-module=../headers-more-nginx-module-${HEADERS_MORE_VERSION} && \
    make && \
    make install

# Production Stage: 
FROM alpine:latest AS production-stage

# Install NGINX runtime dependencies and set up directories
RUN apk add --no-cache curl && \
    mkdir -p /var/cache/nginx /usr/share/nginx/html /etc/nginx /usr/lib/nginx/modules /var/log/nginx

# Copy compiled NGINX binaries and modules
COPY --from=build-stage /etc/nginx /etc/nginx
COPY --from=build-stage /usr/sbin/nginx /usr/sbin/nginx
COPY --from=build-stage /usr/lib/nginx/modules /usr/lib/nginx/modules

# Copy custom NGINX configurations
COPY docker-files/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker-files/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy application files if the build was successful
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl --fail http://localhost:80 || exit 1

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]