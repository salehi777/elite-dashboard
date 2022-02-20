import { Dispatch, SetStateAction, useMemo, useState } from "react";
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
import Uploader from "components/Uploader";

import { ReactComponent as CloseIcon } from "assets/icons/Close.svg";

import { createAnalytics, updateAnalytics } from "services";

type AnalyticsDetailProps = {
  record: any;
};

export default function AnalyticsDetail({ record }: AnalyticsDetailProps) {
  return <div>detail</div>;
}
