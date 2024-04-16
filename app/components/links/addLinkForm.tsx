"use client";

import { addLink } from "@/app/lib/actions";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@nextui-org/react";
import { useRef } from "react";

export const AddLinkForm = ({ jobId }: { jobId: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addLink(formData);
        formRef.current?.reset();
      }}
    >
      <div className="flex flex-col gap-2">
        <Input type="text" name="url" variant="underlined" label="URL" />
        <input type="hidden" name="jobId" value={jobId} />
        <div>
          <Button
            type="submit"
            variant="solid"
            className="bg-success-700 text-gray-100"
            size="md"
          >
            <PlusIcon className="h-5 w-5" />
            Add Link
          </Button>
        </div>
      </div>
    </form>
  );
};
