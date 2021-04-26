FROM node:15.14.0-alpine3.10
RUN apk add bash
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD [ "npm", "start" ]
