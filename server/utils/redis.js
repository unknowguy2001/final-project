const { createClient } = require("redis");

const connectRedis = async () => {
  const redisClient = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
  return redisClient;
};

module.exports = { connectRedis };
