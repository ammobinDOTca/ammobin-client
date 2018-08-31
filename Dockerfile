FROM node:8-alpine
RUN apk --no-cache add wget git

WORKDIR /build
COPY package.json /build
RUN npm install --production
RUN apk --no-cache del git
COPY . /build

EXPOSE 3000
RUN npm run build
HEALTHCHECK --interval=30s --timeout=1s CMD wget localhost:3000/ping -q || exit 1

USER node
CMD HOST=0.0.0.0 NODE_ENV=production PROD=true ./node_modules/nuxt/bin/nuxt start
