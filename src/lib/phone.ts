import { parsePhoneNumberFromString } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

/** Pays européens (UE, EEE, Royaume-Uni, Suisse, micro-États et Balkans). */
const EUROPEAN_COUNTRIES = new Set<CountryCode>([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "CH",
  "GB",
  "AL",
  "BA",
  "ME",
  "MK",
  "RS",
  "XK",
  "UA",
  "MD",
  "AD",
  "MC",
  "SM",
  "VA",
]);

export function isEuropeanPhoneNumber(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const international = parsePhoneNumberFromString(trimmed);
  const parsed =
    international ?? parsePhoneNumberFromString(trimmed, "FR");

  if (!parsed || !parsed.isValid() || !parsed.country) return false;
  return EUROPEAN_COUNTRIES.has(parsed.country);
}
