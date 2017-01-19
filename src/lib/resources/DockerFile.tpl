FROM node:boron

MAINTAINER {{& username}} <{{& email}}>

RUN mkdir -p /usr/src/
WORKDIR /usr/src

RUN git clone {{& repository.url}} app

WORKDIR /usr/src/app

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
