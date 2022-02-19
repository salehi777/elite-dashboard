import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "components/Table/Table";
import { IColumn, ISelectableItem } from "components/Table/types";
import Menu from "components/Menu";
import AlertDelete from "components/Alert/AlertDelete";
import { toast } from "react-toastify";
import moment from "moment";
import GenderStatus from "components/Status/GenderStatus";
import { Spinner, Button } from "@chakra-ui/react";

import { ReactComponent as EditIcon } from "assets/icons/Edit.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/Delete.svg";
import { ReactComponent as PlusIcon } from "assets/icons/Plus.svg";

import { getInvoices, deleteInvoice } from "services";

export default function Analytics() {
  const navigate = useNavigate();

  const [selectableItem, setSelectableItem] = useState<ISelectableItem>({
    all: false,
    empty: true,
    records: [],
  });

  const [reload, setReload] = useState(false);

  const [itemToChange, setItemToChange] = useState<any>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const columns = useMemo<IColumn[]>(
    () => [
      {
        key: "name",
        title: "Name",
        sortKey: "name",
        render: (record) => (
          <div>
            {record.first_name} {record.last_name}
          </div>
        ),
      },
      {
        key: "email",
        title: "Email",
        sortKey: "email",
        render: (record) => <div>{record.email}</div>,
      },
      {
        key: "phone_number",
        title: "Phone Number",
        sortKey: "createdAt",
        render: (record) => (
          <div>{moment(record.createdAt).format("YYYY-MM-DD")}</div>
        ),
      },
      {
        key: "Gender",
        title: "Gender",
        sortKey: "status",
        render: (record) => <GenderStatus gender={record.gender} />,
      },
      {
        key: "actions",
        title: "",
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
    [selectableItem]
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
    <Link to="/invoice/add" className="flex">
      <Button colorScheme="primary" className="!py-3">
        <PlusIcon />
        &nbsp; Add Customer
      </Button>
    </Link>,
  ];

  return (
    <>
      <AlertDelete
        title="Delete Invoice"
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
            api={getInvoices}
            columns={columns}
            gridTemplateColumns="1fr 1fr 1fr 1fr 50px"
            reload={reload}
            buttons={buttons}
          />
        </div>
        <div className="bg-white lg:ml-8 lg:-m-8 lg:w-72">info</div>
      </div>
    </>
  );
}
