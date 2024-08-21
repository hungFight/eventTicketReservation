FROM node:20.10.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build
CMD ["node","dist/main.js"]