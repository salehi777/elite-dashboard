import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Input } from "components/Inputs";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

// redux
import { useDispatch } from "react-redux";
import { login } from "store/authSlice";

import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { ReactComponent as GoogleIcon } from "assets/icons/Social-Google.svg";
import { ReactComponent as FacebookIcon } from "assets/icons/Social-Facebook.svg";
import LoginImage from "assets/images/login.png";

import { signinApi } from "services";

export default function Login() {
  const methods = useForm();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation((data: any) => {
    return signinApi(data)
      .then((res) => {
        dispatch(login(res));
        toast.success("Login was successful");
      })
      .catch(() => {});
  });

  const onSubmit = (data: any) => mutate(data);

  return (
    <main>
      <div className="flex items-center">
        <div className="flex flex-col justify-center w-1/3 min-h-screen p-8 text-center bg-white">
          <i>
            <LogoIcon />
          </i>
          <h1 className="my-12 text-2xl">Log in</h1>

          <div className="flex gap-4">
            <Button leftIcon={<GoogleIcon />} className="grow !font-normal">
              Google
            </Button>
            <Button leftIcon={<FacebookIcon />} className="grow !font-normal">
              Facebook
            </Button>
          </div>

          <div className="flex items-center mt-12 mb-10">
            <h1 className="mr-3 border border-b-0 grow" />
            Or
            <h1 className="ml-3 border border-b-0 grow" />
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <Input
                label="Email Address"
                name="email"
                type="email"
                rules={{ required: true }}
                placeholder="admin@mail.com"
              />
              <Input
                label="Password"
                name="password"
                type="password"
                rules={{ required: true }}
                placeholder="1234"
              />

              <div className="flex justify-end mt-3">
                <Link to="/recovery" className="text-primary-500">
                  Reset Password?
                </Link>
              </div>

              <Button
                colorScheme="primary"
                type="submit"
                className="!w-full mt-6"
                isLoading={isLoading}
                loadingText="Submitting"
              >
                Login
              </Button>
            </form>
          </FormProvider>

          <div className="mt-6">
            <span>Don't have account yet? </span>
            <Link to="/signup" className="text-primary-500">
              New Account
            </Link>
          </div>
        </div>
        <div className="w-2/3 p-4">
          <img src={LoginImage} className="mx-auto" alt="Login" />
        </div>
      </div>
    </main>
  );
}
