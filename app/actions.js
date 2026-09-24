"use server";

import { findAcknowledgementByName } from "@/lib/acknowledgements.server";

export async function resolveName(name) {
  const entry = findAcknowledgementByName(name);
  if (!entry) return { status: "not-found" };
  return { status: "found", id: entry.id };
}
