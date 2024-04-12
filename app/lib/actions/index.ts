"use server";
import { Prisma } from "../prisma/prisma";
import { createJobFormSchema } from "../forms/job";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleCreateJobFormSubmit = async (data: FormData) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not logged in");
  }

  const { company, position, description, notes, date, links } =
    createJobFormSchema.parse(data);

  const formattedDate = new Date(date).toISOString();

  const client = Prisma.getClient();

  await client.$transaction(async (tx) => {
    const job = await tx.jobApplication.create({
      data: {
        company,
        position,
        description,
        notes,
        userId,
      },
    });

    let appliedEventType = await tx.applicationEventType.findFirst({
      where: { name: "Applied" },
    });

    if (!appliedEventType) {
      appliedEventType = await tx.applicationEventType.create({
        data: {
          name: "Applied",
        },
      });
    }

    await tx.applicationEvent.create({
      data: {
        jobApplicationId: job.id,
        eventTypeId: appliedEventType.id,
        date: formattedDate,
      },
    });

    await tx.applicationLink.createMany({
      data: links.map((l) => ({ url: l.url, jobApplicationId: job.id })),
    });
  });

  revalidatePath("/jobs");
  redirect("/jobs");
};
