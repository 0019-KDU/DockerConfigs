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