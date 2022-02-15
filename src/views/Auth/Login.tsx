import { useMemo } from "react";
import Table from "components/Table";
import { IColumn } from "components/Table/types";
import { getTodos } from "services";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Input from "components/Inputs/Input";
import { useForm, FormProvider } from "react-hook-form";

import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import LoginImage from "assets/images/login.png";

export default function Login() {
  const methods = useForm();
  console.log("methods", methods.formState.errors);

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex">
      <div className="flex flex-col w-1/2">
        <i>
          <LogoIcon />
        </i>
        <h1>Log in</h1>

        <div>
          <Button>Google</Button>
          <Button>Facebook</Button>
        </div>

        <div className="flex items-center">
          <h1 className="border grow border-b-0 mr-2" />
          Or
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <Input label="Email" name="email" rules={{ required: true }} />
            <Input
              label="Password"
              name="password"
              type="password"
              rules={{ required: true }}
            />

            <Button colorScheme="primary" type="submit">
              Login
            </Button>
          </form>
        </FormProvider>

        <div>
          <span>Don’t have account yet? </span>
          <Link to="/signup" className="text-primary-500">
            New Account
          </Link>
        </div>
      </div>
      <div className="w-1/2">
        <img src={LoginImage} />
      </div>
    </div>
  );
}
