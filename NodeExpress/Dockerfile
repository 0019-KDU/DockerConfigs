# Create image based on the official Node image from dockerhub
FROM node:20-alpine
 
# Create app directory
WORKDIR /usr/src/app
 
# We then copy the package.json and package-lock.json files to the working directory:
COPY package*.json ./
 
# Install dependencies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm ci
 
#  we copy the rest of our application's source code to the Docker container:
COPY . .
 
# Expose the port the app runs in
EXPOSE 3000
 
# Serve the app
CMD ["npm", "start"]


# FROM node:18-alpine: Specifies the base image to use. In this case, we're using the official Node.js 14 image.
# WORKDIR /usr/src/app: Sets the working directory in the container.
# COPY package*.json ./: Copies the package.json and package-lock.json files to the working directory.
# RUN npm install: Installs the app dependencies.
# COPY . .: Copies the rest of the app source code to the working directory.
# EXPOSE 3000: Exposes the port your app is listening on (change the port number if necessary).
# CMD ["node", "app.js"]: Defines the command to start your Node.js application.