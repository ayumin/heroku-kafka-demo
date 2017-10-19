'use strict';

const Util = require('util');
const Twitter = require('ntwitter');
const Kafka = require('no-kafka');


let twit = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const fs = require('fs');

let app = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));
}).listen(process.env.PORT || 5000);

let io = require('socket.io').listen(app);

io.sockets.on('connection', (socket) => {
  socket.on('msg', (data) => { io.sockets.emit('msg', data) });
});

let producer = new Kafka.Producer({
  connectionString: process.env.KAFKA_URL,
  ssl: {
    cert: process.env.KAFKA_CLIENT_CERT || '.ssl/client.crt',
    key: process.env.KAFKA_CLIENT_CERT_KEY || '.ssl/client.key'
  }
});

producer.init();

twit.stream('statuses/sample', (stream) => {
  stream.on('data', (data) => {
    switch(data.lang) {
      case 'en':
      case 'ja':
        io.sockets.emit('msg', data);
        producer.send(
          {
            topic: process.env.KAFKA_PREFIX + process.env.KAFKA_TOPIC,
            partition: 0,
            message: {
              value: data.text
            }
          }
        );
        if(process.env.DRAIN_TWEETS === '1') {
          console.log(data);
        }
      default:
        ;
    }
  })
});
