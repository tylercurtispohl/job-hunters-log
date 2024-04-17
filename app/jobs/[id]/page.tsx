import { AddEventForm } from "@/app/components/events/addEventForm";
import { EventTable } from "@/app/components/events/eventTable";
import { AddLinkForm } from "@/app/components/links/addLinkForm";
import { LinkTable } from "@/app/components/links/linkTable";
import { Prisma } from "@/app/lib/prisma/prisma";
import { EventTableRow, LinkTableRow } from "@/app/types";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Button, Link } from "@nextui-org/react";
import { sortBy } from "lodash";

const prismaClient = Prisma.getClient();

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const job = await prismaClient.jobApplication.findFirst({
    where: {
      id,
    },
    include: {
      events: {
        include: {
          eventType: true,
        },
      },
      links: true,
    },
  });

  const eventTypes = await prismaClient.applicationEventType.findMany();

  // TODO: if job is not found redirect to not found page

  const eventRows: EventTableRow[] = sortBy(
    job?.events.map((e) => ({
      id: e.id,
      name: e.eventType.name,
      date: e.date.toISOString(),
    })) ?? [],
    (e) => e.date
  );

  const linkRows: LinkTableRow[] =
    job?.links.map((l) => ({
      id: l.id,
      url: l.url,
    })) ?? [];

  return (
    <div className="bg-white w-full rounded-2xl shadow-lg shadow-gray-800 p-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl text-gray-900 font-medium">Info</h1>
          <Button as={Link} href={`/jobs/edit/${job?.id}`} variant="light">
            <PencilSquareIcon className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
          <div>
            <p className="text-small text-foreground-500">Company</p>
            <p className="text-gray-900">{job?.company}</p>
          </div>
          <div>
            <p className="text-small text-foreground-500">Position</p>
            <p className="text-gray-900">{job?.position}</p>
          </div>
        </div>
        <div>
          <p className="text-small text-foreground-500">Description</p>
          <p className="text-gray-900">{job?.description}</p>
        </div>
        <div>
          <p className="text-small text-foreground-500">Notes</p>
          <p className="text-gray-900">{job?.notes}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <h1 className="text-xl text-gray-900 font-medium">Events</h1>
        <EventTable jobId={id} rows={eventRows} />
        <AddEventForm jobId={id} eventTypes={eventTypes} />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <h1 className="text-xl text-gray-900 font-medium">Links</h1>
        <LinkTable jobId={id} rows={linkRows} />
        <div>
          <AddLinkForm jobId={id} />
        </div>
      </div>
    </div>
  );
}
