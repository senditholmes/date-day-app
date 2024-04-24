"use client";

import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButtons = () => {
  const { data: session } = useSession(); // USE SESSION HOOK CREATES JWT TOKEN
  return (
    <div className="flex flex-row gap-4">
      {session && session.user ? (
        <>
          <p>{`Sip it, ${session.user.firstName} ${session.user.lastName}`}</p>
          <Link href={"/api/auth/signout"}>Sign Out</Link>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>Log In</Button>

          <Button as={Link} href={"/auth/signup"}>
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
};

export default SignInButtons;
