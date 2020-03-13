FROM node:10

WORKDIR /app

COPY ./package.json .

RUN npm install

RUN cd /frontend && npm install && npm run generate

COPY . .

EXPOSE 8000

CMD npm start
