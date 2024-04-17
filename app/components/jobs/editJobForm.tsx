"use client";
import { Button, Input, Link, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { editJob } from "@/app/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { editJobFormSchema } from "@/app/lib/forms/job";
import { useEffect } from "react";

export interface EditJobFormValues {
  id: string;
  company: string;
  position: string;
  description?: string;
  notes?: string;
}

export const EditJobForm = ({
  initialValues,
}: {
  initialValues: EditJobFormValues;
}) => {
  console.log(initialValues);
  const {
    control,
    register,
    formState: { isValid },
  } = useForm<EditJobFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(editJobFormSchema),
  });

  //   useEffect(() => {
  //     reset(initialValues);
  //   });

  return (
    <div className="bg-white w-full rounded-2xl shadow-lg shadow-gray-800 p-6">
      <form action={editJob}>
        <div className="flex flex-col gap-2">
          <input type="hidden" {...register("id")} />
          <h1 className="text-xl text-gray-900 font-medium">Info</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, onBlur, value, ref, name } }) => (
                <Input
                  type="text"
                  label="Company"
                  size="md"
                  variant="underlined"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                />
              )}
            />
            <Controller
              control={control}
              name="position"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <Input
                  type="text"
                  label="Position"
                  size="md"
                  variant="underlined"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Textarea
                label="Description"
                variant="underlined"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
              />
            )}
          />

          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, onBlur, value, name } }) => (
              <Textarea
                label="Notes"
                variant="underlined"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
              />
            )}
          />
          <div className="flex flex-row justify-end gap-2">
            <Button
              variant="light"
              size="lg"
              color="default"
              as={Link}
              href={`/jobs/${initialValues.id}`}
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
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
