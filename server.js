var util = require('util');
var twitter = require('ntwitter');

// process.on('uncaughtException', function(e) {
//   console.debug(e);
// });

var twit = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var fs = require('fs');
var app = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));
}).listen(process.env.PORT || 5000);

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
  socket.on('msg', function(data) {
    console.log('* connected ' + data);
    io.sockets.emit('msg', data);
  })
});

twit.stream('statuses/sample', function(stream) {
  stream.on('data', function (data) {
    if(data.lang === 'ja') {
      io.sockets.emit('msg', data);
      if(process.env.DRAIN_TWEETS === '1') {
        console.log(data);
      }
    }
  })
});
