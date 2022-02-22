import { useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";
import Table from "components/Table/Table";
import { IColumn } from "components/Table/types";
import Menu from "components/Menu";
import AlertDelete from "components/Alert/AlertDelete";
import { toast } from "react-toastify";
import GenderStatus from "components/Status/GenderStatus";
import { Avatar } from "components/Avatars";
import AnalyticsForm from "./AnalyticsForm";
import AnalyticsDetail from "./AnalyticsDetail";

import { ReactComponent as EditIcon } from "assets/icons/Edit.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/Delete.svg";
import { ReactComponent as PlusIcon } from "assets/icons/Plus.svg";

import { getAnalyticss, deleteAnalytics } from "services";

export default function Analytics() {
  const [reload, setReload] = useState(false);

  const [itemToChange, setItemToChange] = useState<any>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [rightSide, setRightSide] = useState<{ type: string; record?: any }>({
    type: "",
  });

  const columns = useMemo<IColumn[]>(
    () => [
      {
        key: "Name",
        title: "Name",
        sortKey: "name",
        render: (record) => (
          <div className="flex items-center">
            <Avatar
              src={`${process.env.REACT_APP_BASE_URL_FILES}/${record.image}`}
              className="mr-1"
            />
            <span>
              {record.first_name} {record.last_name}
            </span>
          </div>
        ),
      },
      {
        key: "Email",
        title: "Email",
        sortKey: "email",
        render: (record) => <div>{record.email}</div>,
      },
      {
        key: "Phone Number",
        title: "Phone Number",
        sortKey: "createdAt",
        render: (record) => <div>{record.phoneNumber}</div>,
      },
      {
        key: "Gender",
        title: "Gender",
        sortKey: "status",
        render: (record) => <GenderStatus gender={record.gender} />,
      },
      {
        key: "Actions",
        title: "",
        render: (record) => (
          <Menu
            options={[
              {
                icon: <EditIcon />,
                title: "Edit",
                onClick: (e: any) => {
                  e.stopPropagation();
                  setRightSide({ type: "edit", record });
                },
                color: "#5B93FF",
                bgcolor: "#5B93FF1a",
              },
              {
                icon: <DeleteIcon />,
                title: "Delete",
                onClick: () => {
                  setIsDeleteOpen(true);
                  setItemToChange(record);
                },
                color: "#E71D36",
                bgcolor: "#E71D361a",
              },
            ]}
          />
        ),
      },
    ],
    []
  );

  const handleDelete = async (item: any) => {
    await deleteAnalytics(item?._id)
      .then(() => {
        toast.success("Customer deleted successfully");
        setReload((prev) => !prev);
        setIsDeleteOpen(false);
      })
      .catch(() => {});
  };

  const buttons = [
    <Button
      key="1"
      colorScheme="primary"
      className="!py-3"
      onClick={() => setRightSide({ type: "add" })}
    >
      <PlusIcon />
      &nbsp; Add Customer
    </Button>,
  ];

  return (
    <>
      <AlertDelete
        title="Delete Customer"
        itemToRemove={itemToChange}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDelete}
      />
      <div className="flex flex-col h-full lg:flex-row">
        <div className="lg:grow">
          <h1 className="mb-8 text-2xl font-bold">Customer List</h1>

          <Table
            name="invoices"
            api={getAnalyticss}
            columns={columns}
            gridTemplateColumns="1fr 1fr 1fr 100px 50px"
            mobileColumnsKey={["Name", "Email", "Actions"]}
            mobileGridTemplateColumns="1fr 1fr 50px"
            reload={reload}
            buttons={buttons}
            onRowClick={(record: any) =>
              setRightSide({ type: "detail", record })
            }
          />
        </div>

        {rightSide.type && (
          <div className="h-screen px-4 py-6 overflow-y-auto bg-white lg:ml-8 lg:-m-8 lg:w-72">
            {rightSide.type === "detail" ? (
              <AnalyticsDetail record={rightSide.record} />
            ) : (
              <AnalyticsForm
                key={rightSide.type + rightSide.record?._id}
                setReload={setReload}
                onClose={() => setRightSide({ type: "", record: null })}
                record={rightSide.record}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
