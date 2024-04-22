import SigninForm from "@/components/SigninForm";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  return;
  <>
    <SigninForm />
    <Link href={"/auth/forgotPass"}> Forgot your password? </Link>
  </>;
};

export default SigninPage;
