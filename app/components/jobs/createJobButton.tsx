"use client";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export const CreateJobButton = () => {
  return (
    <Button as={Link} href="/jobs/create" color="default" className="shadow-md">
      Record a job application
    </Button>
  );
};
