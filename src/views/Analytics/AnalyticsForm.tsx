import { Dispatch, SetStateAction, useState } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Input } from "components/Inputs";
import Uploader from "components/Uploader";

import { ReactComponent as CloseIcon } from "assets/icons/Close.svg";

import { createAnalytics, updateAnalytics } from "services";

type AnalyticsFormProps = {
  setReload: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  record?: any;
};

export default function AnalyticsForm({
  setReload,
  onClose,
  record,
}: AnalyticsFormProps) {
  const methods = useForm({ defaultValues: record });
  const [image, setImage] = useState();

  const { mutate, isLoading } = useMutation((data: any) => {
    const body = {
      ...data,
      image,
      gender: "male",
    };

    if (record) {
      return updateAnalytics(record?._id, body)
        .then((res) => {
          toast.success("Customer updated successful");
          setReload((prev) => !prev);
        })
        .catch(() => {});
    } else {
      return createAnalytics(body)
        .then((res) => {
          toast.success("Customer created successful");
          setReload((prev) => !prev);
        })
        .catch(() => {});
    }
  });

  const onSubmit = (data: any) => mutate(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <h1 className="flex justify-between mb-8 text-xl font-bold">
          <span>{record ? "Update" : "Add"} Customer</span>
          <IconButton
            aria-label="close form"
            className="!rounded-full !bg-red-200"
            icon={<CloseIcon color="red" />}
            onClick={onClose}
          />
        </h1>

        <Uploader
          setFilename={(res) => setImage(res.filename)}
          defaultValue={record?.image}
        />

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
            <Input label="Email" name="email" rules={{ required: true }} />
          </div>
          <div className="w-full px-2">
            <Input
              label="Phone Number"
              name="phoneNumber"
              rules={{ required: true }}
              type="number"
            />
          </div>
        </div>

        <Button
          colorScheme="primary"
          className="!w-full mt-6"
          type="submit"
          isLoading={isLoading}
        >
          {record ? "Update" : "Add"} Customer
        </Button>
      </form>
    </FormProvider>
  );
}
