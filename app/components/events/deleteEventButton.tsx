"use client";

import { deleteEvent } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";

export const DeleteEventButton = ({
  eventId,
  jobId,
}: {
  eventId: string;
  jobId: string;
}) => {
  return (
    <form action={deleteEvent}>
      <input type="hidden" value={eventId} name="eventId" />
      <input type="hidden" value={jobId} name="jobId" />
      <Button color="danger" variant="light" type="submit">
        <TrashIcon className="h-5 w-5" />
      </Button>
    </form>
  );
};
