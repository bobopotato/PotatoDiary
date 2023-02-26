FROM node:16.13.2-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY ./package.json ./

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]