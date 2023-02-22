import { useState } from "react";
import {
  fetchCacheAllResult,
  fetchCachedByKeyword,
  fetchStocksDetails,
} from "@/common/api";
import { useQuery } from "react-query";
import { StockList } from "@/common/components/StockList/StockView";
import { SearchInput } from "@/common/components/ui/SearchInput/SearchInput";

export default function SeatchPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchQuery = useQuery(
    [`stock-${searchValue}`, searchValue],
    async () => {
      if (searchValue.length >= 2) {
        // Check if its already in the cache
        const cachedValues = await fetchCachedByKeyword(searchValue);
        if (cachedValues) {
          return cachedValues;
        }

        const stockDetails = await fetchStocksDetails(searchValue);
        if (stockDetails) {
          await fetchCacheAllResult({
            data: stockDetails.bestMatches,
            keyword: searchValue,
          });
          return stockDetails;
        }
      }
    },
    {
      staleTime: 10 * (60 * 1000),
    }
  );
  console.log(searchQuery?.data?.bestMatches);
  return (
    <div className="w-96 mx-auto">
      <h1 className="text-center text-2xl font-bold">
        Search for stock details
      </h1>
      <SearchInput
        isLoading={searchQuery.isLoading}
        onChange={setSearchValue}
      />
      <div className="mt-2">
        {searchQuery?.data?.bestMatches && (
          <StockList list={searchQuery.data.bestMatches} />
        )}
      </div>
    </div>
  );
}
