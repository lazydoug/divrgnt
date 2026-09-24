import { notFound } from "next/navigation";
import { getAcknowledgementById } from "@/lib/acknowledgements.server";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function ForPage(props) {
  const { id } = await props.params;
  const entry = getAcknowledgementById(id);
  if (!entry) notFound();

  return (
    <main className="for-page">
      <p className="for-kicker">This one is for you,</p>
      <h1 className="for-name">{entry.displayName}</h1>
      <p className="for-message">{entry.message}</p>
    </main>
  );
}
