import { useQuery } from "react-query";
import Stat from "./Stat";
import { Skeleton } from "@chakra-ui/react";
import Reports from "./Reports";
import Analytics from "./Analytics";
import RecentOrders from "./RecentOrders";
import TopSelling from "./TopSelling";

import { ReactComponent as HeartIcon } from "assets/icons/Heart.svg";
import { ReactComponent as GameIcon } from "assets/icons/Game.svg";
import { ReactComponent as BagIcon } from "assets/icons/Bag.svg";
import { ReactComponent as WorkIcon } from "assets/icons/Work.svg";

import { getDashboard } from "services";

export default function Dashboard() {
  const { data, isLoading } = useQuery("dashboard", () => getDashboard());

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Dashboard</h1>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <Skeleton isLoaded={!isLoading}>
            <Stat
              count={data?.Save_Products}
              title="Save Products"
              color="blue"
              icon={<HeartIcon />}
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Stat
              count={data?.Stock_Products}
              title="Stock Products"
              color="yellow"
              icon={<GameIcon />}
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Stat
              count={data?.Sales_Products}
              title="Sales Products"
              color="salmon"
              icon={<BagIcon />}
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Stat
              count={data?.Job_Application}
              title="Job Application"
              color="dodgerBlue"
              icon={<WorkIcon />}
            />
          </Skeleton>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-3/5">
            <Skeleton isLoaded={!isLoading} className="h-full">
              <Reports data={data?.Reports} />
            </Skeleton>
          </div>
          <div className="lg:w-2/5">
            <Skeleton isLoaded={!isLoading} className="h-full">
              <Analytics data={data?.Analytics} />
            </Skeleton>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-3/5">
            <Skeleton isLoaded={!isLoading} className="h-full">
              <RecentOrders data={data?.orders} />
            </Skeleton>
          </div>
          <div className="lg:w-2/5">
            <Skeleton isLoaded={!isLoading} className="h-full">
              <TopSelling data={data?.products} />
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
