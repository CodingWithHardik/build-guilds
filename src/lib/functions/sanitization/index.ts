import { normalizeText } from "./normalizeText"
import { MULTILINE_WHITESPACE_REGEX, PROTOCOL_ALLOWED, PROTOCOL_DANGEROUS, TAG_REGEX } from "./regexCheck";
 
export function sanitizeInput(text: string, options?: { maxLength?: number; preserveNewLines?: boolean; lowercase?: boolean }): string {
    const { maxLength = 1000, preserveNewLines = false, lowercase = false } = options || {};
    let value = normalizeText(text)
    let filterValue = value.replace(TAG_REGEX, "").replace(/&[#A-Za-z0-9]+;/g, "")
    if (!preserveNewLines) filterValue = filterValue.replace(MULTILINE_WHITESPACE_REGEX, " ");
    if (lowercase) filterValue = filterValue.toLowerCase();
    const finalValue = filterValue.slice(0, maxLength);
    return finalValue.trim();
}

export function sanitizeHref(input: string, options?: { fallback?: string; onlyEndWithHref?: boolean; allowedDomain?: string }): string {
    const { fallback = "#", onlyEndWithHref = true, allowedDomain } = options || {};
    const value = normalizeText(input);
    if (!value || value.length === 0) return fallback;
    if (onlyEndWithHref && value.startsWith("#")) return value;
    if (onlyEndWithHref) return fallback;
    if (PROTOCOL_DANGEROUS.test(value)) return fallback;
    console.log("Value after protocol check:", value);
    try {
        const url = new URL(value);
        if (!PROTOCOL_ALLOWED.has(url.protocol)) return fallback;
        if (url.protocol === "http:" || url.protocol === "https:") {
            if (allowedDomain && url.hostname.toLowerCase() !== allowedDomain.toLowerCase()) return fallback;
            const cleanURL = `${url.protocol.toLowerCase()}//${url.host.toLowerCase()}${url.pathname.toLowerCase()}${url.search.toLowerCase()}${url.hash.toLowerCase()}`;
            return cleanURL;
        } else {
            const cleanURL = `${url.protocol.toLowerCase()}${url.pathname.toLowerCase()}`
            return cleanURL;
        }
    } catch {
        return fallback;
    }
}

export function sanitizeMailto(email: string, fallback: string = "mailto:hardikgupta2232@gmail.com"): string {
    const value = normalizeText(email).toLowerCase();
    const EMAIL_REGEX = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(\.[a-z0-9-]+)+$/i;
    if (!EMAIL_REGEX.test(value)) return fallback;
    return sanitizeHref(`mailto:${value}`, { fallback, onlyEndWithHref: false });
}