import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

interface ChartProps {
  coinId: string;
  // isDark: boolean;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
const ApexChartContainer = styled.div`
  color: black;
`
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ApexChartContainer>
        {isLoading ? (
          "Loading Chart..."
        ) : (
          <ApexChart
            type="line"
            series={[
              {
                name: "PriceTab",
                data: data?.map((price) => parseFloat(price.close)) ?? [],
              },
            ]}
            options={{
              chart: {
                height: 500,
                width: 500,
                background: "transparent",
              },
              grid: { show: false },
              theme: {
                mode: isDark?"dark":"light",
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false},
                axisTicks: { show: false},
                labels: { 
                  show: false
                },
   
                type:"datetime" ,
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
          />
        )}
      </ApexChartContainer>
    </>
  );
}
export default Chart;
