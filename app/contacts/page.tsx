import { LinkButton } from "../components/linkButton";

export default function Page() {
  return (
    <>
      <div className="flex flex-row justify-end">
        <LinkButton href="/contacts/create">Create a contact</LinkButton>
      </div>
      <div className="mt-6">Contact List</div>
    </>
  );
}
