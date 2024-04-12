import { CreateJobButton } from "@/app/components/jobs/createJobButton";
import { Prisma } from "../lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { sortBy } from "lodash";
import type {
  JobApplication,
  ApplicationEvent,
  ApplicationEventType,
} from "@prisma/client";
import { JobsTableRow } from "../types";
import { JobsTable } from "../components/jobs/jobsTable";

export default async function Page() {
  const { userId } = auth();

  if (!userId) {
    //redirect to error page
    throw new Error("User is not logged in");
  }

  const prismaClient = Prisma.getClient();

  const jobs = await prismaClient.jobApplication.findMany({
    where: {
      userId,
    },
    include: {
      events: {
        include: {
          eventType: true,
        },
      },
    },
  });

  const tableRows: JobsTableRow[] = jobs.map((j) => {
    const lastEvent = sortBy(j.events, (e) => e.date).reverse()[0];
    const appliedEvent = j.events.find((e) => e.eventType.name === "Applied");

    return {
      jobId: j.id,
      company: j.company,
      position: j.position,
      appliedDate: appliedEvent?.date.toISOString() || "",
      lastEvent: lastEvent.eventType.name,
      lastEventDate: lastEvent.date.toISOString(),
    };
  });

  return (
    <>
      <div className="flex flex-row justify-end">
        <CreateJobButton />
      </div>
      <div className="mt-6">
        <JobsTable rows={tableRows} />
      </div>
    </>
  );
}
