# Build Stage: Node.js and Application Build
FROM node:lts-alpine AS build-stage

# Install Node.js dependencies
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files and build the Node.js project
COPY . .
RUN npm run build && ls -la /app/dist

## Production Stage
FROM tyreez/frontend-proxy:latest AS production-stage

# Copy custom NGINX configurations
COPY docker-files/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker-files/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built application from the build stage to the NGINX HTML directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for NGINX
EXPOSE 80

# Healthcheck to monitor NGINX
HEALTHCHECK --interval=30s --timeout=10s --start-period=3s --retries=5 CMD curl --fail http://localhost:80 || exit 1

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
