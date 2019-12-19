FROM node:10-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

# RUN npm ci 

COPY . /opt/app

RUN yarn install --dev && yarn run build

CMD [ "yarn", "start" ]
