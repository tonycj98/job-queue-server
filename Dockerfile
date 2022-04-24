FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install -g yarn
RUN yarn install

EXPOSE 3004

CMD ["yarn", "start"]
