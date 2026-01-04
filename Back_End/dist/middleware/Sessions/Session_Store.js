import { RedisStore } from "connect-redis";
import { Redis_Client } from "../../redis/redis.js";
export const Session_Store = new RedisStore({
    client: Redis_Client,
    prefix: "sess:",
});
