FROM node:15.14.0-alpine3.10
RUN apk add bash
USER node
WORKDIR /usr/src/app
CMD [ "npm", "start" ]
# CMD [ "tail", "-f", "/dev/null" ]