'use strict';

const Kafka = require('no-kafka');

let consumer = new Kafka.SimpleConsumer({
  idleTimeout: 1000,
  clientId: 'sample-consumer',
  connectionString: process.env.KAFKA_URL.replace(/\+ssl/g,''),
  ssl: {
    cert: process.env.KAFKA_CLIENT_CERT || '.ssl/client.crt',
    key: process.env.KAFKA_CLIENT_CERT_KEY || '.ssl/client.key'
  }
});


let dataHandler = (messageSet, topic, partition) => {
  for(let m of messageSet){
    (m) => { console.log(topic, partition, m.offset, m.message.value.toString('utf8')); }
  }
};

consumer.init().then(() => {
  let topic = process.env.KAFKA_PREFIX + process.env.KAFKA_TOPIC;
  consumer.subscribe(topic, dataHandler);
});
