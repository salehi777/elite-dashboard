import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import InvoiceForm from "./InvoiceForm";

import { getInvoice } from "services";

export default function EditInvoice() {
  const { _id } = useParams();

  const { data, isLoading } = useQuery(["view-invoice", _id], () =>
    getInvoice(_id)
  );

  return isLoading ? (
    <div className="h-full">
      <Skeleton className="mb-2 h-1/4" />
      <Skeleton className="mb-2 h-1/4" />
      <Skeleton className="mb-2 h-1/4" />
    </div>
  ) : (
    <InvoiceForm invoiceData={data} />
  );
}
