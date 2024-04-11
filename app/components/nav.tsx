"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { SignInButton, UserButton, currentUser, useUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export const Nav = () => {
  const { isSignedIn } = useUser();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      maxWidth="xl"
      classNames={{
        base: ["bg-green-900"],
        menu: ["bg-green-800"],
        toggleIcon: ["text-gray-100"],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <Link
            color="foreground"
            href="/"
            className="font-semibold text-inherit text-gray-100"
          >
            {`Job Hunter's Log`}
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {/* <NavbarContent
        className="hidden sm:flex gap-4"
        justify="end"
      ></NavbarContent> */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link color="foreground" href="/dashboard" className=" text-gray-100">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem className="lg:flex">
          {/* <Link href="#">Login</Link> */}

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton afterSignInUrl="/dashboard" />
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="foreground" href="/dashboard" className=" text-gray-100">
            Dashboard
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
