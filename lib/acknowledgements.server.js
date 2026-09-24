import { normaliseName } from "./normalise-name";

// Replace with the real archive. Aliases are normalised (lowercase, trimmed,
// punctuation stripped) forms of every name/nickname that should resolve here.
const ACKNOWLEDGEMENTS = [
  {
    id: "x7k2m9",
    displayName: "Alex",
    aliases: ["alex", "alexander"],
    message:
      "You showed up in the small moments no one was watching. This door was always going to open for you.",
  },
];

export function findAcknowledgementByName(rawName) {
  const normalised = normaliseName(rawName);
  if (!normalised) return null;

  const entry = ACKNOWLEDGEMENTS.find((candidate) =>
    candidate.aliases.includes(normalised)
  );

  return entry ? { id: entry.id } : null;
}

export function getAcknowledgementById(id) {
  const entry = ACKNOWLEDGEMENTS.find((candidate) => candidate.id === id);
  return entry ? { displayName: entry.displayName, message: entry.message } : null;
}
