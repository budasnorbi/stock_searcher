import { getCache } from "@/common/api";

import { TextBox } from "@/common/components/ui/TextBox/TextBox";
import { StocksDetailsWidthId } from "@/types/api/api";
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
    <div className="grid gap-4 grid-cols-5 grid-rows-3 p-4">
      <TextBox
        title="symbol"
        text={stockDetails.data["1. symbol"]}
        gridPositions={{
          column: { start: 0, end: 1 },
          row: { start: 0, end: 1 },
        }}
      />

      <TextBox
        title="name"
        text={stockDetails.data["2. name"]}
        gridPositions={{
          column: { start: 1, end: 2 },
          row: { start: 0, end: 1 },
        }}
      />

      <TextBox
        title="type"
        text={stockDetails.data["3. type"]}
        gridPositions={{
          column: { start: 2, end: 3 },
          row: { start: 0, end: 1 },
        }}
      />

      <TextBox
        title="region"
        text={stockDetails.data["4. region"]}
        gridPositions={{
          column: { start: 3, end: 4 },
          row: { start: 0, end: 1 },
        }}
      />

      <TextBox
        title="market open"
        text={stockDetails.data["5. marketOpen"]}
        gridPositions={{
          column: { start: 4, end: 5 },
          row: { start: 0, end: 1 },
        }}
      />

      <TextBox
        title="market close"
        text={stockDetails.data["6. marketClose"]}
        gridPositions={{
          column: { start: 0, end: 1 },
          row: { start: 1, end: 2 },
        }}
      />

      <TextBox
        title="timezone"
        text={stockDetails.data["7. timezone"]}
        gridPositions={{
          column: { start: 1, end: 2 },
          row: { start: 1, end: 2 },
        }}
      />

      <TextBox
        title="timezone"
        text={stockDetails.data["8. currency"]}
        gridPositions={{
          column: { start: 2, end: 3 },
          row: { start: 1, end: 2 },
        }}
      />

      <TextBox
        title="match score"
        text={stockDetails.data["9. matchScore"]}
        gridPositions={{
          column: { start: 3, end: 4 },
          row: { start: 1, end: 2 },
        }}
      />
    </div>
  );
};

export default StockDetailPage;
