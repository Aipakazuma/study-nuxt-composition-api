# study-nuxt-composition-api

composition-api を学ぶ

## run

```bash
$ bash bin/run.sh
```

## 使ってるもの

- https://vue-swipe-modal.vercel.app/
  - これ本体はなぜか yarn でインストールできんかったので、github からコピペ

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
  - なんかできないっぽい
  - 先んじて読み込むようにしてみる
    - v-show で切り替える
    - [1, 2, 3, 4, 5, 6] とあった場合、[[1, 2, 3], 4, 5, 6] の[]を先にブラウザに表示、2,3 は v-show=false にしておく
    - 何か命令したら、[1, [2, 3, 4], 5, 6]とスライドする
    - 設計について
      - VideoList/ui.vue (表示するところ？)
      - VideoList/logic.vue (composition-api/store,handler)
      - 余計なこと考えずとりあえず composition api に書き換えてみた
    - データの入れ替えについて
      - これまではデータを前から取り出し、後ろに戻すってことをやっていた
      - 指定した値の分データを取り出したいが、その分戻すことになるので、おそらくパフォーマンスが悪い
        - 要素番号を管理するだけに切り替える
        - state.targetIndexes で保持しておく
        - next()が実施されるたびに、state.targetIndexes を変更する
    - ループさせると v-k=???でキャッシュが効くが、基本再表示になるのでよくない
      - 横並びにして 10 ずつ動画を並べ枠を移動する（昔やったスライダー的な）で流すと良いかも
      - 左・右スワイプで入れ替え
    - スワイプして別の動画に移動したタイミングで前の動画を止めたい（ずっと再生し続けている）
      - iframe だと XSS になるらしく困っている
    - 左右にもスワイプできないかな
      - https://mathiasbynens.github.io/css-dbg-stories/css-scroll-snap.html
      - すばらしい！
    - iframeを使ったログ残しや自動化がむずすぎる
        - クロスドメインなのでもうだめ
        - youtubeはパラメータつけたらいけるっぽい
        - 表示されてるかか検知→view数にするとか企んだけどよくわからない
        - 真ん中タップしたらいけるんじゃないかとか思ったけど、そんなのできないっぽい
- UI 部品について
  - 左メニューボタン（左上）
    - 使い方ページ表示
    - お問い合わせ
  - Like ボタン(右下)
  - Like 数（独自スコア）、視聴数（iframe の再生が押された回数）（左下）
- PWA 用の準備
  - ブラウザからインストールしてくれ画面の用意
  - PWA アイコンの用意
