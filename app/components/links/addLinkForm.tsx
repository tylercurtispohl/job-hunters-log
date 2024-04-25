"use client";

import { addLink } from "@/app/lib/actions";
import { addLinkFormSchema } from "@/app/lib/forms/job";
import { PlusIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

export interface AddLinkFormValues {
  jobId: string;
  url: string;
}

export const AddLinkForm = ({ jobId }: { jobId: string }) => {
  const {
    control,
    formState: { isValid },
    reset,
  } = useForm<AddLinkFormValues>({
    defaultValues: {
      jobId,
      url: "",
    },
    resolver: zodResolver(addLinkFormSchema),
  });

  return (
    <form
      action={async (formData) => {
        await addLink(formData);
        reset();
      }}
    >
      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="url"
          render={({ field: { onChange, onBlur, value, name } }) => (
            <Input
              type="text"
              variant="underlined"
              label="URL"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              name={name}
            />
          )}
        />

        <Controller
          control={control}
          name="jobId"
          render={({ field: { value, name } }) => (
            <input type="hidden" value={value} name={name} />
          )}
        />
        <div>
          <Button
            type="submit"
            variant="solid"
            className="bg-success-700 text-gray-100"
            size="md"
            isDisabled={!isValid}
          >
            <PlusIcon className="h-5 w-5" />
            Add Link
          </Button>
        </div>
      </div>
    </form>
  );
};
