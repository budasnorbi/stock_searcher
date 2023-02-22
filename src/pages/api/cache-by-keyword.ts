import { getCachedValueByKeyword } from "@/common/utils/redis";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ error: "Keyword needed" });
    }

    const data = await getCachedValueByKeyword(keyword);

    if (!data) {
      return res
        .status(400)
        .json({ error: "There is no cached value with this keyword" });
    }

    return res.status(200).json(data);
  }
}
