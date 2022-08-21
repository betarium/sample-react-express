FROM alpine:3.16

RUN adduser --disabled-password vscode

RUN apk add bash

RUN apk add nodejs=16.16.0-r0
RUN apk add npm

RUN npm install -g pnpm

ENV PNPM_HOME=/var/pnpm

ENV PATH=$PATH:$PNPM_HOME

RUN pnpm install -g typescript@4.7

WORKDIR /workspace

USER vscode

