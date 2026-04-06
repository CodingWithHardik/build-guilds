import { Redis } from "ioredis"

let redisserver: Redis | null = null;

export function getRedis() {
    if (!redisserver) {
        redisserver = new Redis({
            username: process.env.REDIS_USERNAME || "admin",
            password: process.env.REDIS_PASSWORD || "password",
            host: process.env.REDIS_HOST || "localhost",
            port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
        });
    }
    return redisserver;
}
