import { CreateJobButton } from "@/app/components/jobs/createJobButton";
import { Prisma } from "../lib/prisma/prisma";
import { auth } from "@clerk/nextjs";

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
      events: true,
      links: true,
    },
  });

  return (
    <>
      <CreateJobButton />
      <pre>{JSON.stringify(jobs, null, 2)}</pre>
    </>
  );
}
