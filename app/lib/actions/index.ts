"use server";
import { Prisma } from "../prisma/prisma";
import { createJobFormSchema, createEventFormSchema } from "../forms/job";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prismaClient = Prisma.getClient();

export const handleCreateJobFormSubmit = async (data: FormData) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not logged in");
  }

  const { company, position, description, notes, date, links } =
    createJobFormSchema.parse(data);

  const formattedDate = new Date(date).toISOString();

  await prismaClient.$transaction(async (tx) => {
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

export const deleteLink = async (data: FormData) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not logged in");
  }

  // TODO: handle errors using zod parsing rather than checking for each input here
  const linkId = data.get("linkId")?.toString();

  if (!linkId) {
    throw new Error("Missing linkId");
  }

  const jobId = data.get("jobId")?.toString();

  if (!jobId) {
    throw new Error("Missing Job ID");
  }

  await prismaClient.applicationLink.delete({
    where: {
      id: linkId,
    },
  });

  revalidatePath(`/jobs/${jobId}`);
};

export const addLink = async (data: FormData) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not logged in");
  }

  const url = data.get("url")?.toString();

  // TODO: handle errors using zod parsing rather than checking for each input here
  if (!url) {
    throw new Error("Missing URL");
  }

  const jobId = data.get("jobId")?.toString();

  if (!jobId) {
    throw new Error("Missing Job ID");
  }

  await prismaClient.applicationLink.create({
    data: {
      url,
      jobApplicationId: jobId,
    },
  });

  revalidatePath(`/jobs/${jobId}`);
};

export const deleteEvent = async (data: FormData) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not logged in");
  }

  // TODO: handle errors using zod parsing rather than checking for each input here
  const eventId = data.get("eventId")?.toString();

  if (!eventId) {
    throw new Error("Missing eventId");
  }

  const jobId = data.get("jobId")?.toString();

  if (!jobId) {
    throw new Error("Missing Job ID");
  }

  await prismaClient.applicationEvent.delete({
    where: {
      id: eventId,
    },
  });

  revalidatePath(`/jobs/${jobId}`);
};

export const addEvent = async (data: FormData) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not logged in");
  }

  const { eventTypeName, eventDate, jobId } = createEventFormSchema.parse(data);

  const formattedDate = new Date(eventDate).toISOString();

  await prismaClient.$transaction(async (tx) => {
    let eventType = await tx.applicationEventType.findFirst({
      where: {
        name: eventTypeName,
      },
    });

    if (!eventType) {
      eventType = await tx.applicationEventType.create({
        data: {
          name: eventTypeName,
        },
      });
    }

    await tx.applicationEvent.create({
      data: {
        jobApplicationId: jobId,
        eventTypeId: eventType.id,
        date: formattedDate,
      },
    });
  });

  revalidatePath(`/jobs/${jobId}`);
};
