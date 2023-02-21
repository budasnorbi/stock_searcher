import { SearchResponse } from "@/types/api/api";

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

export const fetchStockNames = (
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
