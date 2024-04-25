"use client";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export const JobListLinkButton = () => {
  return (
    <Button as={Link} href="/jobs/" color="default">
      Go to jobs list
    </Button>
  );
};
