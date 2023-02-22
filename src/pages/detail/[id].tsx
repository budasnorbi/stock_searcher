import { getCache } from "@/common/api";
import { DailyStockChart } from "@/common/components/charts/DailyStockChart";

import { TextBox } from "@/common/components/ui/TextBox/TextBox";
import { StocksDetailsWidthId } from "@/types/api/stockDetails";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const StockDetailPage = () => {
  const router = useRouter();

  const stockDetails = useQuery<StocksDetailsWidthId>(
    [`stock-detail-${router.query.id}`, router.query.id],
    async () => {
      if (router.query.id) {
        return getCache(router.query.id as string);
      }
      return undefined;
    },
    {
      staleTime: 10 * (60 * 1000),
    }
  );

  if (!stockDetails.data) {
    return <div className="w-full h-full">Loading...</div>;
  }

  return (
    <div className="h-screen w-screen grid gap-4 grid-cols-3 grid-rows-4 p-4">
      <TextBox
        title="symbol"
        text={stockDetails.data["1. symbol"]}
        style={{
          gridRowStart: 0,
          gridRowEnd: 1,
          gridColumnStart: 0,
          gridColumnEnd: 1,
        }}
      />

      <TextBox
        title="name"
        text={stockDetails.data["2. name"]}
        style={{
          gridRowStart: 0,
          gridRowEnd: 1,
          gridColumnStart: 1,
          gridColumnEnd: 2,
        }}
      />

      <TextBox
        title="type"
        text={stockDetails.data["3. type"]}
        style={{
          gridRowStart: 0,
          gridRowEnd: 1,
          gridColumnStart: 2,
          gridColumnEnd: 3,
        }}
      />

      <TextBox
        title="region"
        text={stockDetails.data["4. region"]}
        style={{
          gridRowStart: 0,
          gridRowEnd: 1,
          gridColumnStart: 3,
          gridColumnEnd: 4,
        }}
      />

      <TextBox
        title="market open"
        text={stockDetails.data["5. marketOpen"]}
        style={{
          gridRowStart: 1,
          gridRowEnd: 2,
          gridColumnStart: 0,
          gridColumnEnd: 1,
        }}
      />

      <TextBox
        title="market close"
        text={stockDetails.data["6. marketClose"]}
        style={{
          gridRowStart: 1,
          gridRowEnd: 2,
          gridColumnStart: 1,
          gridColumnEnd: 2,
        }}
      />

      <TextBox
        title="timezone"
        text={stockDetails.data["7. timezone"]}
        style={{
          gridRowStart: 1,
          gridRowEnd: 2,
          gridColumnStart: 2,
          gridColumnEnd: 3,
        }}
      />

      <TextBox
        title="timezone"
        text={stockDetails.data["8. currency"]}
        style={{
          gridRowStart: 1,
          gridRowEnd: 2,
          gridColumnStart: 3,
          gridColumnEnd: 4,
        }}
      />

      <TextBox
        title="match score"
        text={stockDetails.data["9. matchScore"]}
        style={{
          gridRowStart: 2,
          gridRowEnd: 3,
          gridColumnStart: 0,
          gridColumnEnd: 1,
        }}
      />

      {/* <DailyStockChart /> */}
    </div>
  );
};

export default StockDetailPage;
