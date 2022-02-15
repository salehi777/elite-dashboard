import Stat from "./Stat";
import Reports from "./Reports";

import { ReactComponent as HeartIcon } from "assets/icons/Heart.svg";
import { ReactComponent as GameIcon } from "assets/icons/Game.svg";
import { ReactComponent as BagIcon } from "assets/icons/Bag.svg";
import { ReactComponent as WorkIcon } from "assets/icons/Work.svg";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Stat
            count={178}
            title="Save Products"
            color="blue"
            icon={<HeartIcon />}
          />
          <Stat
            count={20}
            title="Stock Products"
            color="yellow"
            icon={<GameIcon />}
          />
          <Stat
            count={190}
            title="Sales Products"
            color="salmon"
            icon={<BagIcon />}
          />
          <Stat
            count={12}
            title="Job Application"
            color="dodgerBlue"
            icon={<WorkIcon />}
          />
        </div>

        <div className="flex">
          <div className="w-3/5">
            <Reports />
          </div>
        </div>
      </div>
    </div>
  );
}
