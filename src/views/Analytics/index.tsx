import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import Table from "components/Table/Table";
import { useMutation } from "react-query";
import { IColumn } from "components/Table/types";
import Menu from "components/Menu";
import AlertDelete from "components/Alert/AlertDelete";
import { toast } from "react-toastify";
import moment from "moment";
import GenderStatus from "components/Status/GenderStatus";
import { Spinner, Button, IconButton } from "@chakra-ui/react";
import { Input } from "components/Inputs";

import { ReactComponent as EditIcon } from "assets/icons/Edit.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/Delete.svg";
import { ReactComponent as PlusIcon } from "assets/icons/Plus.svg";
import { ReactComponent as CloseIcon } from "assets/icons/Close.svg";

import {
  getAnalyticss,
  deleteAnalytics,
  createAnalytics,
  updateAnalytics,
} from "services";
import Uploader from "components/Uploader";

export default function Analytics() {
  const navigate = useNavigate();

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
        render: (record) => <div>{record.phoneNumber}</div>,
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
                onClick: () => navigate(`/analytics/edit/${record._id}`),
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

  // form
  const methods = useForm();

  // const { mutate, isLoading } = useMutation((data: any) => {
  //   if (invoiceData) {
  //     return updateInvoice(invoiceData?._id, data)
  //       .then((res) => {
  //         toast.success("Invoice updated successful");
  //         navigate("/invoice");
  //       })
  //       .catch(() => {});
  //   } else {
  //     return createInvoice(data)
  //       .then((res) => {
  //         toast.success("Invoice created successful");
  //         navigate("/invoice");
  //       })
  //       .catch(() => {});
  //   }
  // });

  const onSubmit = (data: any) => console.log("data", data);

  const buttons = [
    <Button colorScheme="primary" className="!py-3">
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
            reload={reload}
            buttons={buttons}
          />
        </div>

        {/* <div className="h-screen px-4 py-6 overflow-y-auto bg-white lg:ml-8 lg:-m-8 lg:w-72">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <h1 className="flex justify-between mb-8 text-xl font-bold">
                <span>Add Customer</span>
                <IconButton
                  aria-label="close form"
                  className="!rounded-full !bg-red-200"
                  icon={<CloseIcon color="red" />}
                />
              </h1>

              <Uploader />

              <div className="flex flex-wrap mt-2 -mx-2">
                <div className="w-full px-2">
                  <Input
                    label="First Name"
                    name="first_name"
                    rules={{ required: true }}
                  />
                </div>
                <div className="w-full px-2">
                  <Input
                    label="Last Name"
                    name="last_name"
                    rules={{ required: true }}
                  />
                </div>
                <div className="w-full px-2">
                  <Input
                    label="Email"
                    name="email"
                    rules={{ required: true }}
                  />
                </div>
                <div className="w-full px-2">
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    rules={{ required: true }}
                  />
                </div>
              </div>

              <Button
                colorScheme="primary"
                className="!w-full mt-6"
                type="submit"
                // isLoading={isLoading}
              >
                Add Customer
              </Button>
            </form>
          </FormProvider>
        </div> */}
      </div>
    </>
  );
}
