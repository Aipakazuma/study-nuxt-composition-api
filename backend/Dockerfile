FROM node:17.5.0-slim

RUN apt update -y && apt install -v curl unzip jq
RUN ./aws/install && /usr/local/bin/aws --version
RUN rm -rf aws awscliv2.zip