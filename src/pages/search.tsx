import { useState } from "react";
import {
  postCacheAll,
  getCachedByKeyword,
  getStocksDetails,
} from "@/common/api";
import { useQuery } from "react-query";
import { StockList } from "@/common/components/stocklist/StockView";
import { SearchInput } from "@/common/components/ui/SearchInput/SearchInput";
import { nanoid } from "nanoid";
import { StocksDetailsWidthId } from "@/types/api/stockDetails";

export default function SeatchPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchQuery = useQuery<StocksDetailsWidthId[]>(
    [`stock-${searchValue}`, searchValue],
    async () => {
      if (searchValue.length >= 2) {
        const cachedValues = await getCachedByKeyword(searchValue);

        if (cachedValues) {
          return cachedValues;
        }

        const stocksDetails = await getStocksDetails(searchValue);

        if (!stocksDetails || stocksDetails?.bestMatches.length === 0) {
          return [];
        }

        const stockDetailsWithId = stocksDetails?.bestMatches.map((stock) => {
          return {
            ...stock,
            id: nanoid(),
          };
        });

        await postCacheAll({
          data: stockDetailsWithId,
          keyword: searchValue,
        });

        return stockDetailsWithId;
      }
    },
    {
      staleTime: 10 * (60 * 1000),
    }
  );

  return (
    <div className="w-96 mx-auto">
      <h1 className="text-center text-2xl font-bold my-5">
        Search for stock details
      </h1>
      <SearchInput
        isLoading={searchQuery.isLoading}
        onChange={setSearchValue}
      />
      <div className="mt-2">
        {searchQuery.data && <StockList list={searchQuery.data} />}
      </div>
    </div>
  );
}
