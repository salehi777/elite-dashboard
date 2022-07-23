import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  Checkbox as CheckboxChakra,
} from "@chakra-ui/react";

import { CheckboxProps } from "./types";

export default function Checkbox({ name, rules, ...props }: CheckboxProps) {
  const { control, formState } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl isInvalid={!!formState.errors[name]}>
          <CheckboxChakra
            isInvalid={!!formState.errors[name]}
            name={name}
            onChange={(e) => {
              field.onChange(e.target.checked);
            }}
            {...props}
          />

          <FormErrorMessage>
            {String(formState.errors[name]?.message) ||
              "Please check out the filed"}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
