import { useMemo } from "react";
import Table from "components/Table/Table";
import { IColumn } from "components/Table/types";
import ViewId from "components/Views/ViewId";
import { Avatar } from "components/Avatars";

type RecentOrdersProps = {
  data: any[] | undefined;
};

export default function RecentOrders({ data }: RecentOrdersProps) {
  const columns = useMemo<IColumn[]>(
    () => [
      {
        key: "Tracking no",
        title: "Tracking no",
        render: (record) => <ViewId _id={record._id} />,
      },
      {
        key: "Product Name",
        title: "Product Name",
        render: (record) => (
          <div className="flex items-center gap-2">
            <Avatar
              src={`${process.env.REACT_APP_BASE_URL_FILES}/${record.product?.image}`}
            />
            <span>{record.product?.name}</span>
          </div>
        ),
      },
      {
        key: "Price",
        title: "Price",
        render: (record) => (
          <div>${record.product?.price?.toLocaleString()}</div>
        ),
      },
      {
        key: "Total Order",
        title: "Total Order",
        render: (record) => (
          <div className="text-[#26C0E2] bg-[#26C0E21a] rounded-lg py-2 px-6 font-bold">
            {record.total_order}
          </div>
        ),
      },
      {
        key: "Total Amount",
        title: "Total Amount",
        render: (record) => <div>${record.total_amount?.toLocaleString()}</div>,
      },
    ],
    []
  );

  return (
    <div className="h-full p-6 bg-white rounded-xl">
      <h4 className="mb-4 text-xl font-bold">Recent Orders</h4>

      <Table
        name="invoices"
        dataSource={{ items: data || [] }}
        columns={columns}
        gridTemplateColumns="85px 1fr 1fr 1fr 1fr"
        mobileColumnsKey={["Tracking no", "Price"]}
        mobileGridTemplateColumns="1fr 1fr"
        hidePagination
      />
    </div>
  );
}
