import { getCachedValueByKey } from "@/common/utils/redis";
import { StockDetails } from "@/types/api/api";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const id = req.query.id;

    if (!id) {
      res.status(400).json({ error: "Id required" });
    }
    const data = await getCachedValueByKey(id);

    if (!data) {
      res.status(500).json({ error: "Internal Server error" });
    }
    return res.status(200).json(data);
  }
  res.status(200).json({ name: "John Doe" });
}
