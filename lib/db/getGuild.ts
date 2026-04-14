import { getRedis } from "../redis";

export default async function getGuild(slug: string) {
    const redis = getRedis();
    const getRedisGuild = await redis.get(`guild:${slug}`);
    if (getRedisGuild?.length) return JSON.parse(getRedisGuild);
    
}