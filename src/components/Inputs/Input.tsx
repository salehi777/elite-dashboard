import { useState } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import {
  Input as InputChakra,
  InputProps as InputPropsChakra,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

interface InputProps extends InputPropsChakra {
  label?: string | React.ReactElement;
  name: string;
  rules?: { required?: boolean | string | { value: boolean; message: string } };
}

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
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              {...props}
            />
            {type === "password" && (
              <InputRightElement width="4.5rem">
                <i onClick={handleClick}>{show ? "Hide" : "Show"}</i>
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
