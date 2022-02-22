import React from "react";
import { Doughnut } from "react-chartjs-2";

type AnalyticsProps = {
  data:
    | {
        Sale: number;
        Distribute: number;
        Return: number;
      }
    | undefined;
};

export default React.memo(function Analytics({ data }: AnalyticsProps) {
  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-xl">
      <h4 className="mb-4 text-xl font-bold">Analytics</h4>

      <div className="relative flex items-center grow">
        <div className="absolute flex flex-col text-center -translate-x-1/2 -translate-y-2/3 left-1/2">
          <span className="text-2xl font-extrabold">
            {Number(data?.Sale) +
              Number(data?.Distribute) +
              Number(data?.Return)}
            %
          </span>
          <span className="text-sm">Transactions</span>
        </div>

        <Doughnut
          className="mx-auto xl:!w-[305px] xl:!h-[305px] lg:!w-[250px] lg:!h-[250px]"
          data={{
            labels: ["Sale", "Distribute", "Return"],
            datasets: [
              {
                label: "# of Votes",
                data: [data?.Sale, data?.Sale, data?.Sale],
                backgroundColor: ["#5B93FF", "#FFD66B", "#FF8F6B"],
                borderWidth: 0,
                borderRadius: 40,
              },
            ],
          }}
          options={{
            circumference:
              ((Number(data?.Sale) +
                Number(data?.Distribute) +
                Number(data?.Return)) *
                360) /
              100,
            cutout: "80%",
            radius: "95%",
            spacing: -30,

            color: "#030229",
            responsive: true,
            events: [],
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  boxWidth: 15,
                  boxHeight: 15,
                  font: {
                    family: '"Nunito", sans-serif',
                    size: 16,
                    weight: "600",
                  },
                  padding: 20,
                  usePointStyle: true,
                  pointStyle: "rectRounded",
                },
              },
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
});
