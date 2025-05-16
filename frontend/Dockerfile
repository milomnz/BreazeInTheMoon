# frontend/Dockerfile
# Build
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Producción
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]