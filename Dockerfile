FROM node:8-alpine
WORKDIR /build
COPY package.json /build
RUN npm install --production 
COPY . /build

EXPOSE 3000
RUN npm run build
CMD npm start
