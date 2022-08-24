FROM alpine:3.16

RUN adduser --disabled-password vscode

RUN apk add bash

RUN apk add nodejs=16.16.0-r0
RUN apk add npm

RUN npm install -g pnpm

RUN npm install -g typescript@4.7.4

WORKDIR /workspace

USER vscode

