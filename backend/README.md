# backend


## init

```
$ docker build -t backend:latest .
$ docker run --rm -v $(pwd):/app -it backend:latest /bin/bash
# cd /app
# npm install -g serverless
# serverless -v
Framework Core: 3.14.0
Plugin: 6.2.1
SDK: 4.3.2

# serverless login
Logging into the Serverless Dashboard via the browser
If your browser does not open automatically, please open this URL:
hogehoge

✔ You are now logged into the Serverless Dashboard

# sls create -t aws-nodejs-typescript -p backend-prj
# cd backend-prj/
# npm install
```