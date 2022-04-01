import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { IconButton, Button } from "@chakra-ui/react";
import { Input } from "components/Inputs";

import { ReactComponent as DeleteIcon } from "assets/icons/Delete.svg";
import { ReactComponent as PlusIcon } from "assets/icons/Plus.svg";

import { createInvoice, updateInvoice } from "services";

type InvoiceFormProps = {
  invoiceData?: any | undefined;
};

export default function InvoiceForm({ invoiceData }: InvoiceFormProps) {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: invoiceData || {
      items: [{ name: "", rate: "", quantity: "", amount: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "items",
  });

  const { mutate, isLoading } = useMutation((data: any) => {
    if (invoiceData) {
      return updateInvoice(invoiceData?._id, data)
        .then((res) => {
          toast.success("Invoice updated successful");
          navigate("/invoice");
        })
        .catch(() => {});
    } else {
      return createInvoice(data)
        .then((res) => {
          toast.success("Invoice created successful");
          navigate("/invoice");
        })
        .catch(() => {});
    }
  });

  const onSubmit = (data: any) => mutate(data);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          className="w-full px-4 py-6 bg-white rounded-xl lg:w-7/12"
        >
          <h1 className="mb-8 text-2xl font-bold">
            {invoiceData ? "Edit Invoice" : "Create New Invoice"}
          </h1>

          {/* <Uploader /> */}

          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 lg:w-1/2">
              <Input
                label="First Name"
                name="first_name"
                rules={{ required: true }}
              />
            </div>
            <div className="w-full px-2 lg:w-1/2">
              <Input
                label="Last Name"
                name="last_name"
                rules={{ required: true }}
              />
            </div>
            <div className="w-full px-2 lg:w-1/2">
              <Input label="Email" name="email" rules={{ required: true }} />
            </div>
            <div className="w-full px-2 lg:w-1/2">
              <Input
                label="Address"
                name="address"
                rules={{ required: true }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="text-xl">Product Description</div>

            <IconButton
              aria-label="add invoice"
              colorScheme="primary"
              icon={<PlusIcon />}
              onClick={() =>
                append({ name: "", rate: "", quantity: "", amount: "" })
              }
            />
          </div>

          <ul className="mt-4">
            <li
              className="grid gap-2 mb-2"
              style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 50px" }}
            >
              <div>Product Name</div>
              <div>Rate</div>
              <div>QTY</div>
              <div>Amount</div>
            </li>
            {fields.map((item, index) => (
              <li
                key={item.id}
                className="grid gap-2 mb-2"
                style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 50px" }}
              >
                <Input
                  name={`items.${index}.name`}
                  className="mb-0"
                  rules={{ required: true }}
                />
                <Input
                  name={`items.${index}.rate`}
                  className="mb-0"
                  rules={{ required: true }}
                  type="number"
                />
                <Input
                  name={`items.${index}.quantity`}
                  className="mb-0"
                  rules={{ required: true }}
                  type="number"
                />
                <Input
                  name={`items.${index}.amount`}
                  className="mb-0"
                  rules={{ required: true }}
                  type="number"
                />

                {fields.length > 1 ? (
                  <IconButton
                    aria-label="add invoice"
                    className="!bg-red-200 !p-2"
                    icon={<DeleteIcon />}
                    onClick={() => remove(index)}
                  />
                ) : (
                  <span />
                )}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 mt-12 lg:flex-row">
            <Button className="grow">Send Invoice</Button>
            <Button
              colorScheme="primary"
              className="grow"
              type="submit"
              isLoading={isLoading}
            >
              {invoiceData ? "Update" : "Create"} Invoice
            </Button>
          </div>
        </form>
      </FormProvider>

      <div className="w-full px-4 py-6 bg-white rounded-xl lg:w-5/12">
        <div className="mb-8 text-2xl font-bold">Preview</div>
      </div>
    </div>
  );
}
