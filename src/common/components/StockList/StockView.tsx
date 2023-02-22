import { StocksDetailsWidthId } from "@/types/api/stockDetails";
import Link from "next/link";
import { FC } from "react";

interface Props {
  list: StocksDetailsWidthId[];
}

export const StockList: FC<Props> = ({ list }) => {
  return (
    <div>
      {list.length === 0 ? (
        <span className="block text-center">
          There are no results with the given keyword
        </span>
      ) : (
        list.map((stock) => {
          return (
            <Link
              key={stock["id"]}
              href={{
                pathname: `/detail/${stock["id"]}`,
              }}
            >
              <div className="mb-2 py-2 flex justify-between border-b-2 border-b-zinc-100 hover:text-sky-800">
                <span className="text-left font-bold">
                  {stock["1. symbol"]}
                </span>
                <span className="text-right">{stock["2. name"]}</span>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};
