# should be alpine but https://github.com/webpack-contrib/css-loader/pull/597 requires us to have git
FROM node:8-alpine
WORKDIR /build
COPY package.json /build
RUN npm install --production
COPY . /build

EXPOSE 3000
RUN npm run build
CMD HOST=0.0.0.0 NODE_ENV=production PROD=true ./node_modules/nuxt/bin/nuxt start
