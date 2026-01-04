import "dotenv/config";
import { createClient } from "redis";
const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL)
    throw new Error("REDIS_URL is missing");
export const Redis_Client = createClient({ url: REDIS_URL });
Redis_Client.on("error", (err) => console.error("Redis error:", err));
Redis_Client.on("connect", () => console.log("Redis connecting..."));
Redis_Client.on("ready", () => console.log("Redis ready"));
export async function Connect_Redis() {
    if (!Redis_Client.isOpen)
        await Redis_Client.connect();
}
