"use client";

import { deleteLink } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";

export const DeleteLinkButton = ({
  linkId,
  jobId,
}: {
  linkId: string;
  jobId: string;
}) => {
  return (
    <form action={deleteLink}>
      <input type="hidden" value={linkId} name="linkId" />
      <input type="hidden" value={jobId} name="jobId" />
      <Button color="danger" variant="light" type="submit">
        <TrashIcon className="h-5 w-5" />
      </Button>
    </form>
  );
};
