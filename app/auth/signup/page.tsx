import SignupForm from "@/components/SignupForm";
import { Image, Link } from "@nextui-org/react";
import React from "react";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10">
      <SignupForm />
      <Image src="/login.png" alt="Login Form" width={370} height={370} />
    </div>
  );
};

export default SignupPage;
