import { getDailyChartDataBySmbol } from "@/common/api";
import {
  DailyVolumesChartData,
  DailyVolumesResponse,
} from "@/types/api/dailyVolumes";
import { FC } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

interface Props {
  //dailyData: DailyVolumesResponse;
}

export const DailyStockChart: FC<Props> = ({}) => {
  const symbol = "IBM";
  const chartQuery = useQuery<DailyVolumesChartData[]>(
    [`daily-chart-data`],
    async () => {
      const dailyStockVolumeResponse = await getDailyChartDataBySmbol(symbol);

      if (!dailyStockVolumeResponse) {
        return [];
      }

      const dailyVolumesChartData: DailyVolumesChartData[] = Object.entries(
        dailyStockVolumeResponse["Time Series (Daily)"]
      ).reduce((accumlator: DailyVolumesChartData[], currentValue) => {
        accumlator.push({ date: currentValue[0], ...currentValue[1] });
        return accumlator;
      }, []);

      console.log(dailyVolumesChartData);
      return dailyVolumesChartData;
    },
    {
      staleTime: 10 * (60 * 1000),
    }
  );

  return (
    <>
      {chartQuery.data && (
        <div
          className="w-full"
          style={{
            border: "solid 2px red",
          }}
        >
          <ResponsiveContainer>
            <AreaChart data={chartQuery.data}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="#2451B7"
                    stopOpacity={0.4}
                  ></stop>
                  <stop
                    offset="75%"
                    stopColor="#2451B7"
                    stopOpacity={0.05}
                  ></stop>
                </linearGradient>
              </defs>
              <Area dataKey="opens" stroke="#2451B7" fill="url(#color)" />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickFormatter={(date: string) => {
                  const _date = new Date(date).getTime();
                  return `${format(_date, "yyyy.MM.dd")}`;
                }}
                stroke="rgba(255,255,255,0.75)"
              />

              <YAxis
                dataKey="opens"
                axisLine={false}
                tickLine={false}
                stroke="rgba(255,255,255,0.75)"
                tickFormatter={(price: number) => `${price}M`}
              />

              <Tooltip content={<CustomTooltip />} />

              <CartesianGrid opacity={0.1} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload) {
    console.log(payload);
    return <div className="tooltip">asd</div>;
  }
  return null;
}
