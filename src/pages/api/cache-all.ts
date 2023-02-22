import { cacheValues, getCache } from "@/common/utils/redis";
import { StocksDetailsWidthId } from "@/types/api/stockDetails";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const json = JSON.parse(req.body) as {
      keyword: string;
      data: StocksDetailsWidthId[];
    };
    await cacheValues(json);
    return res.status(200).json({ status: "OK" });
  }

  if (req.method === "GET") {
    const data = await getCache();
    return res.status(200).json(data);
  }
  res.status(200).json({ name: "John Doe" });
}
