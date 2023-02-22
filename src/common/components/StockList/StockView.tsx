import { StockDetails, StocksDetailsWidthId } from "@/types/api/api";
import Link from "next/link";
import { FC } from "react";

interface Props {
  list: StocksDetailsWidthId[];
}

export const StockList: FC<Props> = ({ list }) => {
  return (
    <div>
      {list.map((stock) => {
        return (
          <Link
            key={stock["id"]}
            href={{
              pathname: `/detail/${stock["id"]}`,
            }}
          >
            <div className="py-2 flex justify-between border-b-2 border-b-zinc-800">
              <span className="text-left">{stock["1. symbol"]}</span>
              <span className="text-right">{stock["2. name"]}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
