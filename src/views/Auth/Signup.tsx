import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Checkbox } from "components/Inputs";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

// recoil
import authAtom from "store/auth";
import { useSetRecoilState } from "recoil";

import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";
import { ReactComponent as GoogleIcon } from "assets/icons/Social-Google.svg";
import { ReactComponent as FacebookIcon } from "assets/icons/Social-Facebook.svg";
import SignupImage from "assets/images/signup.png";

import { signupApi } from "services";

export default function Signup() {
  const methods = useForm();
  const setAuthState = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation((data: any) => {
    return signupApi(data)
      .then((res) => {
        setAuthState(res);
        toast.success("Signup was successful");
        setTimeout(() => window.location.reload(), 0);
      })
      .catch(() => {});
  });

  const onSubmit = (data: any) => mutate(data);

  return (
    <main className="">
      <div className="flex items-center">
        <div className="flex flex-col justify-center w-1/3 min-h-screen p-8 text-center bg-white">
          <i>
            <LogoIcon />
          </i>
          <h1 className="my-6 text-2xl">Sign Up</h1>

          <div className="flex gap-4">
            <Button leftIcon={<GoogleIcon />} className="grow !font-normal">
              Google
            </Button>
            <Button leftIcon={<FacebookIcon />} className="grow !font-normal">
              Facebook
            </Button>
          </div>

          <div className="flex items-center mt-6 mb-4">
            <h1 className="mr-3 border border-b-0 grow" />
            Or
            <h1 className="ml-3 border border-b-0 grow" />
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <Input
                label="First Name"
                name="first_name"
                rules={{ required: true }}
                placeholder="first name"
              />
              <Input
                label="Last Name"
                name="last_name"
                rules={{ required: true }}
                placeholder="last name"
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                rules={{ required: true }}
                placeholder="example@gmail.com"
              />
              <Input
                label="Password"
                name="password"
                type="password"
                rules={{ required: true }}
                placeholder="********"
              />

              <Checkbox
                name="agreed_terms"
                rules={{ required: true }}
                className="text-left"
              >
                By creating an account you agree to the{" "}
                <Link
                  to="/terms_of_use"
                  className="underline text-primary-500"
                  target="_blank"
                >
                  terms of use
                </Link>{" "}
                and our{" "}
                <Link
                  to="/privacy_policy"
                  className="underline text-primary-500"
                  target="_blank"
                >
                  privacy policy
                </Link>
                .
              </Checkbox>

              <Button
                colorScheme="primary"
                type="submit"
                className="!w-full mt-6"
                isLoading={isLoading}
                loadingText="Submitting"
              >
                Create account
              </Button>
            </form>
          </FormProvider>

          <div className="mt-6">
            <span>Already have an account? </span>
            <Link to="/login" className="text-primary-500">
              Log in
            </Link>
          </div>
        </div>
        <div className="w-2/3 p-4">
          <img src={SignupImage} className="mx-auto" />
        </div>
      </div>
    </main>
  );
}
