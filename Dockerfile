FROM node:20-alpine

RUN apk update
RUN apk add python3
RUN apk add make
RUN apk add build-base
RUN apk add bash

COPY frontend ./frontend
COPY backend ./backend

RUN npm -g i concurrently nodemon

WORKDIR /frontend
RUN npm i

WORKDIR /backend
RUN npm i

WORKDIR /frontend

EXPOSE 3000 5000 5001 5002

# CMD ["sh", "-c", "nodemon /frontend/app.js & node backend/index.js"]
CMD ["npm", "run", "both"]