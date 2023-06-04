# Use an official Node runtime as the base image
FROM node:18.16.0-bullseye-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the app dependencies inside the container
RUN yarn install --only=production

# Copy the rest of your app's source code into the working directory
COPY . .

# Expose port 443 on the container
EXPOSE 443

# Define the command to run your app
CMD [ "node", "index.js" ]
