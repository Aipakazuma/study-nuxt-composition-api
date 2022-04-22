# study-nuxt-composition-api

composition-api を学ぶ

## 準備

`.env` ファイルを作成する

```bash
$ touch .env
```

```
AWS_ACCESS_KEY_ID=''  # Serverless Frameworkのデプロイ等のコマンド実行に必要
AWS_SECRET_ACCESS_KEY=''  # Serverless Frameworkのデプロイ等のコマンド実行に必要
API_KEY=''  # API Gatewayのapi keyの値を設定する
```

## run

```bash
$ docker compose up
```

## 使ってるもの

- https://vue-swipe-modal.vercel.app/
  - これ本体はなぜか yarn でインストールできんかったので、github からコピペ
