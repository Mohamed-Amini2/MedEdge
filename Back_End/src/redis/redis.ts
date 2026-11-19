import "dotenv/config";
import { createClient, type RedisClientType } from "redis";

const REDIS_URL = process.env.REDIS_URL;

export const Redis_Client: RedisClientType | null = REDIS_URL
  ? createClient({ url: REDIS_URL })
  : null;

if (Redis_Client) {
  Redis_Client.on("error", (err) => console.error("Redis error:", err));
  Redis_Client.on("ready", () => console.log("Redis ready"));
}

export async function Connect_Redis(): Promise<void> {
  if (Redis_Client && !Redis_Client.isOpen) await Redis_Client.connect();
}
