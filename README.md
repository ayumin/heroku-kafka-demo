# Apache Kafka on Heroku Demo

## Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Click Heroku Button,
 Or run following commands:

```
$ git clone https://github.com/ayumin/heroku-kafka-demo.git
$ cd heroku-kafka-demo
$ heroku create
$ git push heroku master
```

## Set Twitter App keys

Set some key strings which is provided from Twitter [application management console](https://apps.twitter.com/).

1. Create new App
2. Click "Keys and Access Tokens" Tab
3. Save Consumer Key (API Key) and Consumer Secret (API Secret)
4. Create Access Tokens
5. Save Access Token and Access Token Secret
6. Set these keys and tokens on Heroku's config by following commands:

```
$ heroku config:set CONSUMER_KEY=<fill in your Consumer Key>
$ heroku config:set CONSUMER_SECRET=<fill in your Consumer Secret>
$ heroku config:set ACCESS_TOKEN=<fill in your Access Token>
$ heroku config:set ACCESS_TOKEN_SECRET=<fill in your Access Token Secret>
```

## Run local

Clone this repo into your local, then create `.env` like bellow:

```
CONSUMER_KEY='...'
CONSUMER_SECRET='...'
ACCESS_TOKEN='...'
ACCESS_TOKEN_SECRET='...'
```

Then run following commands:

```
$ npm install
$ heroku local
```

