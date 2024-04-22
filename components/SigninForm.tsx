import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

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

  return (
    <form className="flex flex-col gap-2">
      <Input
        label="email"
        {...register("email")}
        errorMessage={errors.email?.message}
      />

      <Input
        label="password"
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
      <div className="flex justify-center items-center">
        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          {isSubmitting ? "..." : "Log In"}
        </Button>

        <Button as={Link}>Sign Up</Button>
      </div>
    </form>
  );
};

export default SigninForm;
