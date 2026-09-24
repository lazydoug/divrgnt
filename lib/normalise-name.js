const PUNCTUATION = /['’".,!?]/g;
const WHITESPACE = /\s+/g;

export function normaliseName(input) {
  return input
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(PUNCTUATION, "")
    .replace(WHITESPACE, " ")
    .trim();
}
