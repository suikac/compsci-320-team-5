FROM node:14-alpine
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . /app
RUN yarn build
EXPOSE 1234
CMD ["yarn", "run", "start"]
