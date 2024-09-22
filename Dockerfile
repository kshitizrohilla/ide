FROM node:20
WORKDIR /app

COPY package*.json ./
COPY server.js ./

RUN npm install
RUN npm install -g nodemon
RUN apt update
RUN apt install -y openssl shellinabox vim

RUN echo "SHELLINABOX_PORT=5001" >> /etc/default/shellinabox
RUN echo "SHELLINABOX_ARGS=\"--no-beep --disable-ssl\"" >> /etc/default/shellinabox
RUN echo "OPTS=\"-s /:SSH:localhost\"" >> /etc/default/shellinabox
RUN apt update

EXPOSE 5000
EXPOSE 5001

# RUN service shellinabox start
RUN echo "root:123" | chpasswd

# CMD ["nodemon", "app.js"]
# CMD ["service", "shellinabox", "start", "nodemon", "app.js"]
CMD service shellinabox start && npm start
