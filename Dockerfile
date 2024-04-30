# Build
FROM node:lts AS build-stage

RUN groupadd -r appuser && useradd -r -g appuser -m appuser

WORKDIR /app
COPY package*.json ./

RUN chown -R appuser:appuser /app
USER appuser
RUN npm install
COPY . .
RUN npm run build

# Expose
FROM nginx:stable
COPY --from=build-stage --chown=appuser:appuser /app/dist /usr/share/nginx/html
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000 || exit 1

CMD ["nginx", "-g", "daemon off;"]
