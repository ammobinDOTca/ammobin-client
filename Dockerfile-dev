FROM node:10-alpine

WORKDIR /build
COPY package*.json /build/
VOLUME /build

EXPOSE 3000

CMD HOST=0.0.0.0 NODE_ENV=production PROD=true npm run dev
