#FROM ubuntu:latest
#LABEL authors="thanush"
#
##ENTRYPOINT ["top", "-b"]
#
# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]


#FROM node:17-alpine3.15 AS builder
## Set working directory
#WORKDIR /app
## Copy all files from current directory to working dir in image
#COPY . .
## install node modules and build assets
#RUN npm install && npm run build
#
## nginx state for serving content
#FROM nginx:alpine
#
#RUN rm /etc/nginx/conf.d/default.conf
#
#COPY nginx.conf /etc/nginx/conf.d
#
## Set working directory to nginx asset directory
#WORKDIR /usr/share/nginx/html
## Remove default nginx static assets
#RUN rm -rf ./*
## Copy static assets from builder stage
#COPY --from=builder /app/build .
## Containers run nginx with global directives and daemon off
#ENTRYPOINT ["nginx", "-g", "daemon off;"]