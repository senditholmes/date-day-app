"use client";

import { useSession } from "next-auth/react";
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
          <Link href={"/api/auth/signin"}>Log In</Link>
          <Link href={"/auth/signup"}>Create An Account </Link>
        </>
      )}
    </div>
  );
};

export default SignInButtons;
