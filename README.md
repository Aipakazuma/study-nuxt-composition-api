# study-nuxt-composition-api

composition-api を学ぶ

## install

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

## composition api を学ぶ

doc: https://composition-api.nuxtjs.org/getting-started/introduction

```bash
$ yarn add @nuxtjs/composition-api
```

### 学びその 1

component を作って呼び出してみる.

### 学びその 2

まだ全然わかっていないので、なんか作ってみる.

→ その上で composition api に書き換えて理解するでどうじゃろうか？

#### 作るもの

- Youtube の動画を先に読み込みして体験良い PWA
- 上下左右にフリックして動画を切り替える
  - 一旦は動画が表示されたら読み込みして表示する仕組みを考えている
- 動画それぞれにいいねボタンとお気に入りボタンがついている
  - お気に入りボタンを押したら LocalStorage にお気に入り動画の link が保存される
  - いいねは store へカウントしておく
  - いいねやお気に入りしたら解除できるボタンへ変更する
- 左メニュー押したらお気に入り一覧が表示される

- /pages/index.vue
  - メインページ
- /store/videos.js
  - 動画を取得する
- /components/LoadVideo.vue
- /components/Menu.vue
- /components/LikeButton.vue
- /components/FavoriteButton.vue

#### 試し中

- iframe の preload
