"use client";

import { Button, Input, Link, Textarea } from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useForm, useFieldArray } from "react-hook-form";
import { handleCreateJobFormSubmit } from "@/app/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJobFormSchema } from "@/app/lib/forms/job";

export interface FormValues {
  company: string;
  position: string;
  description?: string;
  notes?: string;
  date: string;
  links: { url: string }[];
}

export const CreateJobForm = () => {
  const {
    control,
    register,
    formState: { isValid, isDirty, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createJobFormSchema),
  });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({ control, name: "links" });

  return (
    <div className="bg-white w-full rounded-2xl shadow-lg shadow-gray-800 p-6">
      <form action={handleCreateJobFormSubmit}>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-gray-900 font-medium">Info</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
            <Input
              type="text"
              label="Company"
              size="md"
              variant="underlined"
              {...register("company")}
            />
            <Input
              type="text"
              label="Position"
              size="md"
              variant="underlined"
              {...register("position")}
            />
          </div>
          <Textarea
            label="Description"
            variant="underlined"
            {...register("description")}
          />
          <Textarea label="Notes" variant="underlined" {...register("notes")} />
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
            <Input
              type="date"
              label="Applied Date"
              variant="underlined"
              {...register("date")}
            />
          </div>
          <h1 className="text-xl text-gray-900 font-medium mt-6">Links</h1>
          <div className="flex flex-col gap-2">
            {linkFields.map((linkField, index) => (
              <Input
                key={linkField.id}
                type="text"
                label={`Link ${index + 1} URL`}
                variant="underlined"
                endContent={
                  <Button
                    variant="light"
                    color="danger"
                    onPress={() => {
                      removeLink(index);
                    }}
                  >
                    <TrashIcon className="text-red-700 h-4 w-4" />
                  </Button>
                }
                {...register(`links.${index}.url`)}
              />
            ))}
            <div>
              <Button
                variant="light"
                size="md"
                fullWidth={false}
                startContent={<PlusIcon className="h-4 w-4" />}
                onPress={() => {
                  appendLink({ url: "" });
                }}
              >
                Add a link
              </Button>
            </div>
            <div className="flex flex-row justify-end gap-2">
              <Button
                variant="light"
                size="lg"
                color="default"
                as={Link}
                href="/jobs"
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                className="bg-success-700 text-gray-100"
                size="lg"
                type="submit"
                // color="default"
                isDisabled={!isValid}
              >
                Create Job
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
