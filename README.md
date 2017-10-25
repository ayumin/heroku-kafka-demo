# Apache Kafka on Heroku Demo

![](https://github.com/ayumin/heroku-kafka-demo/raw/master/images/slide.png)

## Pre-warming Apache Kafka on Heroku

Create placeholder app on Heroku and create new Kafka with following commands.

```
$ heroku create kafka-placeholder
$ heroku addons:create heroku-kafka:basic-0
```

### Create topic in Kafka.

Open Apache Kafka on Heroku Dashboard.

```
$ heroku addons:open heroku-kafka --app kafka-placeholder
```

Then, add new topic.

## Deploy App to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Click Heroku Button,
 Or run following commands:

```
$ git clone https://github.com/ayumin/heroku-kafka-demo.git
$ cd heroku-kafka-demo
$ heroku create
$ git push heroku master
```

### Set Twitter App keys

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

### Connect to Apache Kafka on Heroku

Attache pre-warmed Kafka to App by following command.
```
$ heroku addons --app kafka-placeholder

Add-on                                     Plan     Price       State  
------------------------------------------ -------- ----------- -------
heroku-kafka (kafka-flexible-71947)        basic-0  $100/month  created

$ heroku addons:attach kafka-flexible-71947
```

Then set topic name to config var `KAFKA_TOPIC`.

### Run in local

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

