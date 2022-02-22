import { useState } from "react";
import { useMutation } from "react-query";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";

import { recoveryPassword } from "services";

export default function Recovery() {
  const [value, setValue] = useState("");

  const { mutate, isLoading } = useMutation((data: any) => {
    return recoveryPassword(data)
      .then((res) => {})
      .catch(() => {});
  });

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full px-16 py-16 bg-white rounded md:w-1/2 md:h-2/3">
        <i>
          <LogoIcon />
        </i>
        <h1 className="my-6 text-2xl">Recover</h1>

        <FormControl isRequired>
          <FormLabel htmlFor="email">Email Address</FormLabel>

          <Input
            size="md"
            id="email"
            name="email"
            type="email"
            className="!border-0 !bg-gray-100 !py-3 !h-auto"
            placeholder="example@gmail.com"
            onChange={(e) => setValue(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="primary"
          className="!w-full mt-2"
          onClick={() => value && mutate({ email: value })}
          isLoading={isLoading}
        >
          Reset Your Password
        </Button>
      </div>
    </main>
  );
}
