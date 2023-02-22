import { fetchStockNames } from "@/common/api";
import { useDebounce } from "@/common/hooks/useDebounce";
import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { StockList } from "@/common/components/StockList/StockView";
import { SearchInput } from "@/common/components/ui/SearchInput/SearchInput";

export default function SeatchPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchQuery = useQuery(["stockNameMatches", searchValue], () => {
    if (searchValue.length >= 2) {
      return fetchStockNames(searchValue);
    }
  });

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
