const redis = require('redis');

let client = null;

const createClient = () => {
  client = redis.createClient({
    url: process.env.REDIS_URL,
  });

  client.on('error', (err) => {
    console.log('Error ' + err);
  });

  client.on('connect', () => {
    console.log('Redis client connected');
  });

  client.connect();

  return client;
};

const getClient = () => {
  if (!client) {
    createClient();
  }
  return client;
};

module.exports = { getClient };
