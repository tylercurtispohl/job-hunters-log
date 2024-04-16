import { EventTable } from "@/app/components/events/eventTable";
import { AddLinkForm } from "@/app/components/links/addLinkForm";
import { LinkTable } from "@/app/components/links/linkTable";
import { Prisma } from "@/app/lib/prisma/prisma";
import { EventTableRow, LinkTableRow } from "@/app/types";
import { Link } from "@nextui-org/react";

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

  // TODO: if job is not found redirect to not found page

  const eventRows: EventTableRow[] =
    job?.events.map((e) => ({
      id: e.id,
      name: e.eventType.name,
      date: e.date.toISOString(),
    })) ?? [];

  const linkRows: LinkTableRow[] =
    job?.links.map((l) => ({
      id: l.id,
      url: l.url,
    })) ?? [];

  return (
    <div className="bg-white w-full rounded-2xl shadow-lg shadow-gray-800 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl text-gray-900 font-medium">Info</h1>
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
        <EventTable rows={eventRows} />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <h1 className="text-xl text-gray-900 font-medium">Links</h1>
        <LinkTable jobId={id} rows={linkRows} />
        <div>
          <AddLinkForm jobId={id} />
        </div>
      </div>
      {/* <pre>{JSON.stringify(job, null, 2)}</pre> */}
    </div>
  );
}
