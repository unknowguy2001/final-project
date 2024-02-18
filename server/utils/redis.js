const { createClient } = require("redis");

const connectRedis = async () => {
  const redisClient = await createClient({
    url: process.env.REDIS_URL,
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
  return redisClient;
};

module.exports = { connectRedis };
