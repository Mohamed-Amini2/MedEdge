import session from "express-session";
import { RedisStore } from "connect-redis";
import { Redis_Client } from "../../redis/redis.js";

export const Session_Store: session.Store = Redis_Client
  ? new RedisStore({ client: Redis_Client, prefix: "sess:" })
  : new session.MemoryStore();

if (!Redis_Client) console.log("REDIS_URL not set: sessions are kept in memory");
