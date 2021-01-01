FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd frontend && npm install && npm run generate
RUN cd frontend-react && npm install && npm run build

EXPOSE 8000

CMD npm start
