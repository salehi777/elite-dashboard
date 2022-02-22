import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "components/Table/Table";
import { IColumn, ISelectableItem } from "components/Table/types";
import Menu from "components/Menu";
import ViewId from "components/Views/ViewId";
import AlertDelete from "components/Alert/AlertDelete";
import { toast } from "react-toastify";
import moment from "moment";
import InvoiceStatus from "components/Status/InvoiceStatus";
import { Spinner, Button } from "@chakra-ui/react";

import { ReactComponent as StarIcon } from "assets/icons/Star.svg";
import { ReactComponent as Star2Icon } from "assets/icons/Star-2.svg";
import { ReactComponent as EditIcon } from "assets/icons/Edit.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/Delete.svg";
import { ReactComponent as Delete2Icon } from "assets/icons/Delete-2.svg";
import { ReactComponent as PlusIcon } from "assets/icons/Plus.svg";
import { ReactComponent as Calendar2Icon } from "assets/icons/Calendar-2.svg";
import { ReactComponent as Message2Icon } from "assets/icons/Message-2.svg";

import { getInvoices, toggleInvoice, deleteInvoice } from "services";

export default function Invoice() {
  const navigate = useNavigate();

  const [selectableItem, setSelectableItem] = useState<ISelectableItem>({
    all: false,
    empty: true,
    records: [],
  });

  const [reload, setReload] = useState(false);
  const [toggleLoading, setToggleLoading] = useState("");

  const [itemToChange, setItemToChange] = useState<any>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const columns = useMemo<IColumn[]>(
    () => [
      {
        key: "Invoice Id",
        title: "Invoice Id",
        sortKey: "_id",
        render: (record) => <ViewId _id={record._id} />,
      },
      {
        key: "Name",
        title: "Name",
        sortKey: "name",
        render: (record) => (
          <div>
            {record.first_name} {record.last_name}
          </div>
        ),
      },
      {
        key: "Email",
        title: "Email",
        sortKey: "email",
        render: (record) => (
          <div className="flex items-center">
            <Message2Icon className="mr-2" />
            <span>{record.email}</span>
          </div>
        ),
      },
      {
        key: "Date",
        title: "Date",
        sortKey: "createdAt",
        render: (record) => (
          <div className="flex items-center">
            <Calendar2Icon className="mr-2" />
            <span>{moment(record.createdAt).format("DD MMM, YYYY")}</span>
          </div>
        ),
      },
      {
        key: "Status",
        title: "Status",
        sortKey: "status",
        render: (record) => <InvoiceStatus status={record.status} />,
      },
      {
        key: "fav",
        title: "",
        render: (record) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              setToggleLoading(record._id);
              toggleInvoice(record._id)
                .then(() => {
                  setReload((prev) => !prev);
                  setToggleLoading("");
                })
                .catch(() => setToggleLoading(""));
            }}
          >
            {toggleLoading === record._id ? (
              <Spinner />
            ) : record.fav ? (
              <StarIcon />
            ) : (
              <Star2Icon />
            )}
          </div>
        ),
      },
      {
        key: "Actions",
        title: (
          <Delete2Icon
            className="cursor-pointer"
            onClick={() => {
              if (selectableItem.records.length === 0) {
                toast.warn("Plase Select at least one row");
              } else {
                const ids = selectableItem.records.map((item) => item._id);
                console.log("ids", ids);
              }
            }}
          />
        ),
        render: (record) => (
          <Menu
            options={[
              {
                icon: <EditIcon />,
                title: "Edit",
                onClick: () => navigate(`/invoice/edit/${record._id}`),
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
    [selectableItem, toggleLoading]
  );

  const selectable = {
    onChange: (s: ISelectableItem) => {
      setSelectableItem(s);
    },
  };

  const handleDelete = async (item: any) => {
    await deleteInvoice(item?._id)
      .then(() => {
        toast.success("Invoice deleted successfully");
        setReload((prev) => !prev);
        setIsDeleteOpen(false);
      })
      .catch(() => {});
  };

  const buttons = [
    <Link key="1" to="/invoice/add" className="flex">
      <Button colorScheme="primary" className="!py-2">
        <PlusIcon />
        &nbsp; Add New
      </Button>
    </Link>,
  ];

  return (
    <div>
      <AlertDelete
        title="Delete Invoice"
        itemToRemove={itemToChange}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDelete}
      />

      <h1 className="mb-8 text-2xl font-bold">Invoice List</h1>

      <Table
        name="invoices"
        api={getInvoices}
        columns={columns}
        gridTemplateColumns="85px 1fr 1fr 1fr 1fr 50px 50px"
        mobileColumnsKey={["Name", "Status", "Actions"]}
        mobileGridTemplateColumns="1fr 1fr 50px"
        selectable={selectable}
        reload={reload}
        showSearch={true}
        buttons={buttons}
      />
    </div>
  );
}
