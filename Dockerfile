# TODO: move to 12-alpine once available
FROM node:12-alpine
RUN apk --no-cache add wget git g++ make python

WORKDIR /build
COPY package*.json /build/
RUN npm install #--production
RUN apk --no-cache del git g++ make python
COPY . /build

EXPOSE 3000
RUN npm run build
HEALTHCHECK --interval=30s --timeout=1s CMD wget localhost:3000/ping -q  -O/dev/null || exit 1

#USER node
CMD npm start
