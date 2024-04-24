"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

//TYPES
interface Props {
  callbackUrl?: string;
}

// FORM SCHEMA
const SignInFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string({
    required_error: "Please enter your password.",
  }),
});

// FORM TYPE
type SignInInputType = z.infer<typeof SignInFormSchema>;

const SigninForm = (props: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInputType>({
    resolver: zodResolver(SignInFormSchema),
  });

  const [isVisiblePassword, setVisiblePassword] = useState(false);

  const toggleVisible = () => {
    setVisiblePassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<SignInInputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });

    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("Welcome!");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 justify-center items-center"
    >
      <Input
        defaultValue=""
        label="email"
        {...register("email")}
        errorMessage={errors.email?.message}
      />

      <Input
        label="password"
        defaultValue=""
        type={isVisiblePassword ? "text" : "password"}
        {...register("password")}
        errorMessage={errors.password?.message}
        endContent={
          isVisiblePassword ? (
            <EyeSlashIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisible}
            />
          ) : (
            <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisible} />
          )
        }
      />
      <div className="flex justify-center items-center gap-2 pb-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          color="primary"
        >
          {isSubmitting ? "..." : "Log In"}
        </Button>

        <Button as={Link} href="/auth/signup">
          Not registered?
        </Button>
      </div>
    </form>
  );
};

export default SigninForm;
