import { RegisterOptions } from "react-hook-form";
import {
  InputProps as InputPropsChakra,
  CheckboxProps as CheckboxPropsChakra,
} from "@chakra-ui/react";

export interface InputProps extends InputPropsChakra {
  label?: string | React.ReactElement;
  name: string;
  rules?: RegisterOptions;
}

export interface CheckboxProps extends CheckboxPropsChakra {
  name: string;
  rules?: RegisterOptions;
}
