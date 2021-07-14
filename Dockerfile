FROM debian:jessie

WORKDIR /one-network-integration-ui

COPY package.json .
COPY package-yarn.json .
COPY config.json .
COPY src/ ./src/
COPY build/messages/ ./messages/
