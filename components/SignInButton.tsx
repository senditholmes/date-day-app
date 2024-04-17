"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-row">
      {session && session.user ? (
        <>
          <p>{session.user.email}</p>
          <Link href={"/api/auth/signout"}>Sign Out</Link>
        </>
      ) : (
        <Link href={"/api/auth/signin"}>Log In</Link>
      )}
    </div>
  );
};

export default SignInButton;
