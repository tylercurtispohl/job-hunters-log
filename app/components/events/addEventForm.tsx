"use client";

import { addEvent } from "@/app/lib/actions";
import { createEventFormSchema } from "@/app/lib/forms/job";
import { PlusIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export interface AddEventFormValues {
  jobId: string;
  eventTypeName: string;
  eventDate: string;
}

export const AddEventForm = ({
  jobId,
  eventTypes,
}: {
  jobId: string;
  eventTypes: { id: string; name: string }[];
}) => {
  const {
    register,
    formState: { isValid },
  } = useForm<AddEventFormValues>({
    resolver: zodResolver(createEventFormSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addEvent(formData);
        formRef.current?.reset();
      }}
    >
      <div className="flex flex-col gap-2">
        <input type="hidden" value={jobId} {...register("jobId")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Autocomplete
            allowsCustomValue
            label="Select an event type"
            variant="underlined"
            defaultItems={eventTypes.map((t) => ({
              label: t.name,
              value: t.id,
            }))}
            {...register("eventTypeName")}
          >
            {(item) => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            type="date"
            label="Event Date"
            variant="underlined"
            {...register("eventDate")}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="solid"
            className="bg-success-700 text-gray-100"
            size="md"
            isDisabled={!isValid}
          >
            <PlusIcon className="h-5 w-5" />
            Add Event
          </Button>
        </div>
      </div>
    </form>
  );
};
