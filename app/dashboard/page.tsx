import { LinkButton } from "../components/linkButton";

export default async function Page() {
  return (
    <>
      <div className="flex flex-row gap-2">
        <LinkButton href="/jobs/">Go to jobs list</LinkButton>
        <LinkButton href="/contacts/">Go to contacts list</LinkButton>
      </div>
    </>
  );
}
