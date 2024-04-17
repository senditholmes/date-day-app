import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import SignInButtons from "./SignInButtons";

const HeaderNav = () => {
  return (
    <Navbar isBordered maxWidth="lg">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/cafes" aria-current="page">
            Cafes
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SignInButtons />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderNav;
