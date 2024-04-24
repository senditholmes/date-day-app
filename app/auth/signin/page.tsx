import SigninForm from "@/components/SigninForm";
import Link from "next/link";
import React from "react";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });
  return (
    <div className="flex flex-col gap-2 items-center">
      <SigninForm />
      <Link href={"/auth/forgotPass"} className=" p-1">
        {" "}
        Forgot your password?{" "}
      </Link>
    </div>
  );
};

export default SigninPage;
