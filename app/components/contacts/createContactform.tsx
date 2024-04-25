"use client";

import { createContact } from "@/app/lib/actions";
import { createContactFormSchema } from "@/app/lib/forms/contacts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";

export interface FormValues {
  name: string;
  company: string;
  email: string;
  phoneNumber: string;
  nextFollowUpDate: string;
  notes: string;
  contactType: string;
}

export const CreateContactForm = ({
  contactTypes,
}: {
  contactTypes: { id: string; name: string }[];
}) => {
  const {
    control,
    register,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(createContactFormSchema),
  });

  return (
    <div className="bg-white w-full rounded-2xl shadow-lg shadow-gray-800 p-6">
      <form action={createContact}>
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-xl text-gray-900 font-medium">Info</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Input
                    type="text"
                    label="Name"
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
                name="company"
                render={({ field: { onChange, onBlur, value, name } }) => (
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
                name="email"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Input
                    type="text"
                    label="Email"
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
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Input
                    type="text"
                    label="Phone Number"
                    size="md"
                    variant="underlined"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                  />
                )}
              />
              <Autocomplete
                allowsCustomValue
                label="Select an contact type"
                variant="underlined"
                defaultItems={contactTypes.map((t) => ({
                  label: t.name,
                  value: t.id,
                }))}
                {...register("contactType")}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Controller
                control={control}
                name="nextFollowUpDate"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Input
                    type="date"
                    label="Next followup date"
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
                name="notes"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <Textarea
                    label="Notes"
                    variant="underlined"
                    classNames={{
                      base: ["col-span-1 lg:col-span-2"],
                    }}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end gap-2">
            <Button
              variant="light"
              size="lg"
              color="default"
              as={Link}
              href="/contacts"
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
              Create Contact
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
