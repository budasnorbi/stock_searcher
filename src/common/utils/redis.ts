import { StockDetails } from "@/types/api/api";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL ?? "");

redis.on("connect", () => {
  console.log("Redis connected ");
});

redis.on("error", function (err) {
  console.log(err);
});

export const cacheValues = async (stocksDetails: {
  keyword: string;
  data: StockDetails[];
}) => {
  let redisMset = [];
  for (const item of stocksDetails.data) {
    const key = `${stocksDetails.keyword}-${item["1. symbol"]}-${item["2. name"]}`;
    redisMset.push(key, JSON.stringify(item));
  }

  await redis.mset(...redisMset);
  await redis.quit();
};

export const getCache = async () => {
  const keys = await redis.keys("*");
  const data = await redis.mget(keys);
  await redis.quit();
  return data;
};

export const getCachedValueByKey = async (key: string) => {
  const data = await redis.get(key);
  await redis.quit();

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const getCachedValueByKeyword = async (keyword: string) => {
  const keys = await redis.keys("*");
  const neededKeys = keys.filter((key) => key.includes(keyword));
  const data = await redis.mget(neededKeys).catch(() => null);

  if (!data) {
    return null;
  }

  return data;
};
