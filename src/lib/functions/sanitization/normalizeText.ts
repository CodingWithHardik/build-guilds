import { CONTROL_CHARS_REGEX } from "./regexCheck";

export function normalizeText(input: string): string {
    if (typeof input !== "string") return "";
    return input.normalize("NFKC").replace(CONTROL_CHARS_REGEX, "").trim();
}