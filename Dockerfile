FROM node:10

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN cd frontend && npm install && npm run generate

EXPOSE 8000

CMD npm start
