# Use an official Node.js image as a base
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the application files from the "game" folder
COPY game/. .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Use Nginx to serve the built React app
FROM nginx:alpine

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
