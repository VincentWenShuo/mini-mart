import {createClient} from "redis";
import dotenv from "dotenv";

dotenv.config();
// redis
const redisUsername = process.env.REDIS_USERNAME || "";
const redisPassword = process.env.REDIS_PASSWORD || "";
const redisHost = process.env.REDIS_HOST || "";
const redisPort = process.env.REDIS_PORT || "";
// const redisChannel = process.env.REDIS_CHANNEL || "";

// configs
const redisUrl = `redis://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}`;

const redisClient = createClient({ url: redisUrl });
redisClient.connect();

// redis status logger
redisClient.on("error", (err) => {
    console.log("Redis error", err)
});
redisClient.on("connect", () => {
    console.log("\n Connected to Redis \n")
});

redisClient.on("ready", () => {
    console.log("Redis is ready");
});

export const set = async (key, message) => {
    if( redisClient.isReady ){
        return await redisClient.set(key, message);
    }
};

export const get = async (key) => {
    if( redisClient.isReady ) {
        return await redisClient.get(key);
    }
};

export default {
    set,
    get
};