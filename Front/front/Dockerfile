FROM node:16

WORKDIR /front
COPY /Front/front/package*.json ./

RUN npm install

COPY /Front/front .

EXPOSE 3000

CMD npm start