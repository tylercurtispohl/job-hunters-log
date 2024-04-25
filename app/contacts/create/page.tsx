import { CreateContactForm } from "@/app/components/contacts/createContactform";
import { Prisma } from "@/app/lib/prisma/prisma";

const prismaClient = Prisma.getClient();

export default async function Page() {
  const contactTypes = await prismaClient.contactType.findMany();
  const contactTypeOptions = contactTypes.map((t) => ({
    id: t.id,
    name: t.name,
  }));

  return (
    <>
      <CreateContactForm contactTypes={contactTypeOptions} />
    </>
  );
}
