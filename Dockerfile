FROM node:16-alpine

USER node
ENV NODE_ENV dev

COPY . /app
WORKDIR /app
