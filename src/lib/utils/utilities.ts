import type { FormValues } from "@/lib/schema/RegisterSchema";
import type { FieldError } from "react-hook-form";

export function getScore(pw: string): number {
  if (!pw) return 0;
  if (pw.length < 8) return 1; // too short caps at weak

  let score = 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const SHORT: Record<string, string> = {
  too_small: "too short",
  too_big: "too long",
  invalid_format: "malformed",
  custom: "required",
};

export function getStatus(
  name: keyof FormValues,
  state: { isSubmitSuccessful: boolean; isDirty: boolean; invalid: boolean; error?: FieldError },
) {
  const { isSubmitSuccessful, isDirty, invalid, error } = state;

  if (isSubmitSuccessful) return "locked";

  if (invalid && error) {
    if (name === "confirmPassword") {
      return "mismatch";
    }
    return SHORT[error.type] ?? "invalid";
  }

  return isDirty ? "ok" : "pending";
}
