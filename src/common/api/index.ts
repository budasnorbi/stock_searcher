import { SearchResponse, StockDetails } from "@/types/api/api";

const BASE_URL = "https://www.alphavantage.co/query?";
const API_KEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY ?? "";

const composeURL = (params: { [key: string]: string | number }) => {
  const urlParams = new URLSearchParams();

  for (const key in params) {
    urlParams.append(key, params[key].toString());
  }

  urlParams.append("apikey", API_KEY);

  return BASE_URL + urlParams;
};

export const fetchStocksDetails = (
  name: string
): Promise<SearchResponse | null> => {
  const url = composeURL({
    function: "SYMBOL_SEARCH",
    keywords: name,
  });

  return fetch(url)
    .then((res) => res.json())
    .catch((error) => null);
};

export const fetchCachedStockDetail = (id: string) => {
  return fetch(`/api/cache?id=${id}`, { method: "GET" }).then((res) =>
    res.json()
  );
};

export const fetchCacheAllResult = (data: {
  keyword: string;
  data: StockDetails[];
}) => {
  return fetch(`/api/cache-all`, {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const fetchCachedByKeyword = (keyword: string) => {
  return fetch(`/api/cache-by-keyword?keyword=${keyword}`, {
    method: "GET",
  })
    .then(async (res) => {
      const json = await res.json();
      if (res.status === 400) {
        return null;
      }
      console.log("this is the cache");
      return json;
    })
    .catch(() => null);
};
