#!/bin/bash

cd frontend/
docker run --rm -v $(pwd):/app \
    -p 80:80 -p 81:81 \
    -e NODE_OPTIONS=--openssl-legacy-provider \
    --name study-nuxt -it node:17.5.0-slim \
    /bin/bash -c "cd /app/ && npm install && yarn dev --port 80 --hostname 0"
