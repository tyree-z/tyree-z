FROM node:lts-alpine AS build-stage

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

# Expose
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl --fail http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
