FROM node:20.9.0

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install 

EXPOSE 5000

CMD [ "npm","run","start" ]