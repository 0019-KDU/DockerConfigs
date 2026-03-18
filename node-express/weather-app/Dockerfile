FROM node:21-alpine

ENV API_KEY=f2f0d40bb2beaf83b396318ee2bb419c
ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]