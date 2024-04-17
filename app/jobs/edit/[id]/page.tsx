import { EditJobForm } from "@/app/components/jobs/editJobForm";
import { Prisma } from "@/app/lib/prisma/prisma";

const prismaClient = Prisma.getClient();

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const job = await prismaClient.jobApplication.findFirst({
    where: {
      id,
    },
  });

  if (!job) {
    // TODO: redirect to error or not found page
    throw new Error("Could not find job");
  }

  return (
    <>
      <EditJobForm
        initialValues={{
          id: job.id,
          company: job.company,
          position: job.position,
          description: job.description ?? "",
          notes: job.notes ?? "",
        }}
      />
    </>
  );
}
