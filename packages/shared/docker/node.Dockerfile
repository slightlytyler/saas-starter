FROM node:8.1.1-alpine

ENV FLOW_VERSION 0.48.0

RUN apk update \
  && apk add --update ca-certificates openssl \
  && update-ca-certificates \
  && wget -O /etc/apk/keys/sgerrand.rsa.pub https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub \
  && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.25-r0/glibc-2.25-r0.apk \
  && apk add glibc-2.25-r0.apk
