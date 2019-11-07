FROM node:10.15.3

MAINTAINER "HMCTS Team <https://github.com/hmcts>"
LABEL maintainer = "HMCTS Team <https://github.com/hmcts>"

RUN mkdir -p /usr/src/app
RUN chmod 777 /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

COPY . .

RUN yarn
RUN yarn compile

EXPOSE 8080
CMD [ "yarn", "start" ]
