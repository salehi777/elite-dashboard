import { Avatar } from "components/Avatars";

import { ReactComponent as MessageIcon } from "assets/icons/Message.svg";
import { ReactComponent as CallIcon } from "assets/icons/Call.svg";
import { ReactComponent as LocationIcon } from "assets/icons/Location.svg";

type AnalyticsDetailProps = {
  record: any;
};

export default function AnalyticsDetail({ record }: AnalyticsDetailProps) {
  return (
    <div>
      <div className="flex flex-col items-center py-4">
        <Avatar
          src={`${process.env.REACT_APP_BASE_URL_FILES}/${record?.image}`}
          className="rounded-full w-[70px] h-[70px]"
          circle
          size="lg"
        />
        <div className="mt-4 text-2xl">
          {record?.first_name} {record?.last_name}
        </div>
        <div className="mt-2 text-gray-400">UI/UX Designer</div>
      </div>

      <hr className="my-6 border-gray-100" />

      <div className="">
        <div className="mt-4 text-xl">Contact Info</div>
        <div className="flex items-center mt-6 text-main-secondary">
          <i className="flex mr-2">
            <MessageIcon />
          </i>
          <span className="whitespace-pre-wrap max-w-[14rem]">
            {record?.email}
          </span>
        </div>
        <hr className="my-6 border-gray-100" />
        <div className="flex items-center mt-6 text-main-secondary">
          <i className="flex mr-2">
            <CallIcon />
          </i>
          <span>{record?.phoneNumber}</span>
        </div>
        <hr className="my-6 border-gray-100" />
        <div className="flex items-center mt-6 text-main-secondary">
          <i className="flex mr-2">
            <LocationIcon />
          </i>
          <span>2239 Hog Camp Road Schaumburg</span>
        </div>
        <hr className="my-6 border-gray-100" />
      </div>

      <div>
        <div className="mt-4 text-xl">Performance</div>
      </div>
    </div>
  );
}
