FROM node:9-alpine

# procps for better "ps aux"
# bash - because this image have only sh

RUN apk add --update alpine-sdk && \
    apk add --no-cache bash && \
    apk add --no-cache procps && \
    yarn

