####
# build: pull in + install everything to run nuxt build
####

FROM node:12-alpine as build
RUN apk --no-cache add wget git g++ make python

WORKDIR /build
COPY package*.json /build/
RUN npm install
RUN apk --no-cache del git g++ make python
COPY . /build

RUN npm run build


########
# run: do production install + copy build output of build container and run the node server
########
FROM node:12-alpine as main

WORKDIR /build
COPY --from=build /build/package*.json /build/
RUN npm install --production

# copy min needed to run (built) app
COPY --from=build /build/nuxt.config.ts /build
COPY --from=build /build/.nuxt /build/.nuxt
COPY --from=build /build/static /build/static
RUN apk --no-cache add wget

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=1s CMD wget localhost:3000/ping -q  -O/dev/null || exit 1

USER node
CMD npm start
