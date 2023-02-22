import { StockDetails, StocksDetailsWidthId } from "@/types/api/api";
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
  data: StocksDetailsWidthId[];
}) => {
  let redisMset = [];
  for (const item of stocksDetails.data) {
    redisMset.push(`${stocksDetails.keyword}-${item.id}`, JSON.stringify(item));
  }

  await redis.mset(...redisMset);
};

export const getCache = async () => {
  const keys = await redis.keys("*");
  console.log(1, keys);
  if (keys.length === 0) {
    return null;
  }
  const data = await redis.mget(keys);
  return data;
};

export const getCachedValueById = async (id: string) => {
  const keys = await redis.keys("*");
  const neededKeys = keys.filter((key) => key.includes(id));
  if (neededKeys.length === 0) {
    return null;
  }
  const [data] = await redis.mget(neededKeys);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const getCachedValuesByKeyword = async (keyword: string) => {
  const keys = await redis.keys("*");
  const neededKeys = keys.filter((key) => key.includes(keyword));

  if (neededKeys.length === 0) {
    return null;
  }

  const data = await redis.mget(neededKeys);

  if (!data) {
    return null;
  }

  const parsedData = data.map((stock) => JSON.parse(stock as string));

  return parsedData;
};
