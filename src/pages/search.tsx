import { fetchStockNames } from "@/common/api";
import { useDebounce } from "@/common/hooks/useDebounce";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";

export default function SeatchPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 200);

  const searchQuery = useQuery(
    ["stockNameMatches", debouncedSearchValue],
    () => {
      if (debouncedSearchValue.length >= 2) {
        return fetchStockNames(debouncedSearchValue);
      }
    }
  );

  const searchValueOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchValue(value);
    },
    []
  );

  return (
    <div className="w-96 mx-auto">
      <h1 className="text-center text-2xl font-bold">
        Search for stock details
      </h1>
      <div className="relative ">
        <input
          type="text"
          className="block w-full bg-gray-900 outline-none text-white rounded-3xl px-4 py-3"
          value={searchValue}
          onChange={searchValueOnChange}
          placeholder="Search for Stock with it's symbol or name"
        />
        <div className="absolute top-2/4 right-0 -translate-y-2/4">
          {searchQuery.isLoading && (
            <svg
              className="text-white animate-spin h-6 w-6 mr-3"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
      </div>
      <div className="mt-2">
        {searchQuery?.data?.bestMatches?.map((stock) => {
          return (
            <Link
              key={stock["1. symbol"]}
              href={`/detail/${stock["1. symbol"]}`}
            >
              <div className="py-2 flex justify-between border-b-2 border-b-zinc-800">
                <span className="text-left">{stock["1. symbol"]}</span>
                <span className="text-right">{stock["2. name"]}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
