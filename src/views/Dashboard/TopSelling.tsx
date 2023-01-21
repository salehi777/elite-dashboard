import { Avatar } from "components/Avatars";

import { ReactComponent as StarIcon } from "assets/icons/Star.svg";
import { ReactComponent as Star2Icon } from "assets/icons/Star-2.svg";

type TopSellingProps = {
  data: any[] | undefined;
};

export default function TopSelling({ data }: TopSellingProps) {
  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-xl">
      <h4 className="mb-4 text-xl font-bold">Top Selling Products</h4>

      <div className="flex flex-col gap-4 justify-evenly grow">
        {data?.map((item) => (
          <div className="flex items-center">
            <Avatar
              src={`${item.image}`}
              size="xl"
              className="mr-4"
            />
            <div className="flex flex-col gap-2">
              <span>{item.name}</span>
              <span>
                {[...new Array(item.rate)].map(() => (
                  <StarIcon />
                ))}
                {[...new Array(5 - item.rate)].map(() => (
                  <Star2Icon />
                ))}
              </span>
              <span>${item.price?.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
