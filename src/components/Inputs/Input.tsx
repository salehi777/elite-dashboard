import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as InputChakra,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { InputProps } from "./types";

import { ReactComponent as HideIcon } from "assets/icons/Hide.svg";

export default function Input({
  label,
  name,
  type = "text",
  rules,
  isDisabled,
  ...props
}: InputProps) {
  const { control, formState } = useFormContext();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl
          isInvalid={formState.errors[name]}
          isRequired={Boolean(rules?.required)}
          isDisabled={isDisabled}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>

          <InputGroup size="md">
            <InputChakra
              id={name}
              name={name}
              type={show ? "text" : type}
              className="!border-0 !bg-gray-100 !py-3 !h-auto"
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              {...props}
            />
            {type === "password" && (
              <InputRightElement width="4.5rem">
                <i onClick={handleClick} className="flex mt-2 cursor-pointer">
                  {show ? "Hide" : <HideIcon />}
                </i>
              </InputRightElement>
            )}
          </InputGroup>

          <FormErrorMessage>
            {formState.errors[name]?.message || "Please fill out the field"}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
