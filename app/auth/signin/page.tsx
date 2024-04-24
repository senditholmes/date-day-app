import SigninForm from "@/components/SigninForm";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  return (
    <div className="flex flex-col items-center">
      <SigninForm />
      <Link href={"/auth/forgotPass"}> Forgot your password? </Link>
    </div>
  );
};

export default SigninPage;
