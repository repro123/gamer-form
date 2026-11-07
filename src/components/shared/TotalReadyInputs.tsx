import { useFormState } from "react-hook-form";
import type { FormValues } from "@/lib/schema/RegisterSchema";

const FIELDS: (keyof FormValues)[] = ["callsign", "email", "password", "confirmPassword", "terms"];

function TotalReadyInputs() {
  const { errors, dirtyFields, isSubmitSuccessful } = useFormState<FormValues>();

  const ready = FIELDS.filter((field) => dirtyFields[field] && !errors[field]).length;

  const allReady = ready === FIELDS.length;

  return (
    <>
      {isSubmitSuccessful ? (
        <p className="preset-6 text-lime-500">provisioned</p>
      ) : (
        <p className={`preset-6 ${allReady ? "text-lime-500" : "text-neutral-400"}`}>
          {ready}/{FIELDS.length} ready
        </p>
      )}
    </>
  );
}

export default TotalReadyInputs;
