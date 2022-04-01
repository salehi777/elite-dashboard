import { TooltipItem, TooltipModel } from "chart.js";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

let width: number, height: number, gradient: any;
function getGradient(ctx: any, chartArea: any) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    gradient.addColorStop(0, "#5BC4FF");
    gradient.addColorStop(1, "#FF5BEF");
  }

  return gradient;
}

type ReportsProps = {
  data: number[] | undefined;
};

export default function Reports({ data }: ReportsProps) {
  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-xl">
      <h4 className="mb-4 text-xl font-bold">Reports</h4>
      <div className="flex items-center grow">
        <Line
          data={{
            labels: [...new Array(10)].map((_, index) => `${index + 8}am`),
            datasets: [
              {
                label: "Commission",
                data,
                tension: 0.5,
                fill: true,
                backgroundColor: "#ff0000",

                borderWidth: 3,
                borderColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) return;
                  return getGradient(ctx, chartArea);
                },

                pointBackgroundColor: "white",
                pointBorderColor: "#AE8FF7",

                pointRadius: 4,
                pointHoverRadius: 4,

                pointBorderWidth: 2,
                pointHoverBorderWidth: 2,
              },
            ],
          }}
          options={{
            color: "#030229",
            responsive: true,
            interaction: {
              mode: "index",
              intersect: false,
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: '"Nunito", sans-serif',
                    size: 14,
                    weight: "500",
                  },
                  color: "#030229",
                },
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: "#E9F0F6",
                },
                min: 0,
                max: 10000,
                ticks: {
                  count: 6,
                  font: {
                    family: '"Nunito", sans-serif',
                    size: 14,
                    weight: "500",
                  },
                  color: "#030229",
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                position: "nearest",
                backgroundColor: "#030229",
                titleFont: {
                  family: '"Nunito", sans-serif',
                  size: 12,
                  weight: "400",
                },
                bodyFont: {
                  family: '"Nunito", sans-serif',
                  size: 16,
                  weight: "600",
                },
                titleAlign: "center",
                bodyAlign: "center",
                yAlign: "bottom",
                caretPadding: 8,
                padding: { bottom: 12, top: 12, left: 22, right: 22 },
                cornerRadius: 10,
                displayColors: false,
                callbacks: {
                  title: function () {
                    return "Sales";
                  },
                  label: function (
                    this: TooltipModel<"line">,
                    tooltipItem: TooltipItem<"line">
                  ) {
                    return Number(tooltipItem.raw).toLocaleString();
                  },
                },
              },
            },
          }}
          plugins={[
            {
              id: "custom_canvas_hover_line",
              beforeDraw: (chart: any) => {
                const ctx = chart.canvas.getContext("2d");
                const activePoint = chart.tooltip?._active?.[0];

                if (activePoint) {
                  const x = activePoint.element.x;
                  const y = activePoint.element.y;
                  const bottomY = chart.scales.y.bottom;

                  ctx.save();
                  ctx.beginPath();
                  ctx.setLineDash([2, 5]);
                  ctx.moveTo(x, y);
                  ctx.lineTo(x, bottomY);
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = "#605BFF";
                  ctx.stroke();
                  ctx.restore();
                }
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
