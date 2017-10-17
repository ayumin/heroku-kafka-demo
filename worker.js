'use strict'
var Kafka = require('no-kafka');

var consumer = new Kafka.SimpleConsumer({
  idleTimeout: 1000,
  clientId: 'sample-consumer',
  connectionString: process.env.KAFKA_URL.replace(/\+ssl/g,''),
  ssl: {
    cert: process.env.KAFKA_CLIENT_CERT || '.ssl/client.crt',
    key: process.env.KAFKA_CLIENT_CERT_KEY || '.ssl/client.key'
  }
});

console.log("Kafka consumer has been started");

var dataHandler = function (messageSet, topic, partition) {
  messageSet.forEach(function (m) {
    console.log(topic, partition, m.offset, m.message.value.toString('utf8'));
  });
};

return consumer.init().then(function() {
  var topic = process.env.KAFKA_PREFIX + process.env.KAFKA_TOPIC
  consumer.subscribe(topic, dataHandler);
});
