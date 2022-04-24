FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3004

CMD ["yarn", "start"]
