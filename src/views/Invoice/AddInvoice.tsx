import { useMemo, useState } from "react";
import Table from "components/Table/Table";
import { IColumn, ISelectableItem } from "components/Table/types";
import Menu from "components/Menu";
import ViewId from "components/Views/ViewId";
import AlertDelete from "components/Alert/AlertDelete";
import { toast } from "react-toastify";
import moment from "moment";
import InvoiceStatus from "components/Status/InvoiceStatus";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { ReactComponent as StarIcon } from "assets/icons/Star.svg";
import { ReactComponent as Star2Icon } from "assets/icons/Star-2.svg";
import { ReactComponent as EditIcon } from "assets/icons/Edit.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/Delete.svg";
import { ReactComponent as Delete2Icon } from "assets/icons/Delete-2.svg";

import { getInvoices, toggleInvoice, deleteInvoice } from "services";

export default function AddInvoice() {
  return <div>Add invoice</div>;
}
