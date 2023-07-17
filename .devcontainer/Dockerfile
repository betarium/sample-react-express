FROM alpine:3.16

RUN adduser --disabled-password vscode

RUN apk add bash
RUN apk add openssh
RUN apk add git

## see https://pkgs.alpinelinux.org/package/v3.16/main/x86_64/nodejs
RUN apk add nodejs=16.20.1-r0

RUN apk add npm

RUN npm install -g pnpm

RUN npm install -g typescript@4.7.4

WORKDIR /workspace

USER vscode

