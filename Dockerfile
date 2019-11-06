FROM node:10.15.3-slim
MAINTAINER "HMCTS Team <https://github.com/hmcts>"
LABEL maintainer = "HMCTS Team <https://github.com/hmcts>"
COPY hello.js
EXPOSE 8080
CMD [ "node", "hello.js" ]