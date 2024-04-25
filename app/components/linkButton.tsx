"use client";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export const LinkButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactElement | string;
}) => {
  return (
    <Button as={Link} href={href} color="default" className="shadow-md">
      {children}
    </Button>
  );
};
