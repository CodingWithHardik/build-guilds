export const CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

export const TAG_REGEX = /<\/?[^>]+(>|$)/g;

export const MULTILINE_WHITESPACE_REGEX = /\s+/g;

export const PROTOCOL_DANGEROUS = /^(javascript|data|vbscript|file|ms-help|ms-its|mhtml|x-schema|about|chrome|chrome-extension|moz-extension|opera|res|widget):/i;

export const PROTOCOL_ALLOWED = new Set([
    "http:",
    "https:",
    "mailto:",
    "tel:",
]);