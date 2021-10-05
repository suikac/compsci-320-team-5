FROM node:14-alpine
WORKDIR /app
ADD . /app
RUN yarn install
RUN yarn build
EXPOSE 1234
CMD ["yarn", "run", "start"]
