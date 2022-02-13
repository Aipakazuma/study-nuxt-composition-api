# study-nuxt-composition-api

composition-api を学ぶ

```bash
$ docker run --rm -v $(pwd):/app -p 80:80 --name study-nuxt -it node:17.5.0-slim /bin/bash

# dockerコンテナ内で作業
$ cd /app
$ yarn create nuxt-app frontend

# 省略...

create-nuxt-app v4.0.0
✨  Generating Nuxt.js project in frontend
? Project name: frontend
? Programming language: JavaScript
? Package manager: Yarn
? UI framework: Element
? Nuxt.js modules: Axios - Promise based HTTP client, Progressive Web App (PWA)
? Linting tools: Prettier
? Testing framework: None
? Rendering mode: Single Page App
? Deployment target: Server (Node.js hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Continuous integration: None
? Version control system: Git

# 省略...

# create完了後、起動してみる
$ cd frontend/
$ yarn dev

# 省略...
node:internal/crypto/hash:67
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
# 省略...

# 過去にぶち当たったやつ
# https://www.aipacommander.com/entry/2022/01/01/233201
$ export NODE_OPTIONS=--openssl-legacy-provider
# あと80:80でバインドしているので、80ポートで起動するようにoption追加
$ yarn dev --port 80

# なぜかコンテナへアクセスできなかったので、hostnameを0にして再度実行
$ yarn dev --port 80 --hostname 0
```
