FROM node:14-alpine
WORKDIR /app
ADD . /app
RUN yarn install
RUN yarn build
EXPOSE 3001
CMD ["yarn", "run", "start"]
