import { useFormContext, useFormState } from "react-hook-form";
import type { FormValues } from "@/lib/schema/RegisterSchema";
import { getStatus } from "@/lib/utils/utilities";

const inputStatusLabel: { name: keyof FormValues; label?: string }[] = [
  { name: "callsign" },
  { name: "email" },
  { name: "password" },
  { name: "confirmPassword", label: "confirm" },
  { name: "terms" },
];

function InputStatus() {
  const { getFieldState } = useFormContext<FormValues>();
  const formState = useFormState<FormValues>();
  const { isSubmitSuccessful } = formState;

  return (
    <div className="text-neutral-300 mt-8 space-y-4">
      {inputStatusLabel.map((item) => {
        const { isDirty, invalid, error } = getFieldState(item.name, formState);
        const status = getStatus(item.name, { isSubmitSuccessful, isDirty, invalid, error });
        const color =
          status === "ok" || status === "locked"
            ? "text-lime-500"
            : status === "pending"
              ? "text-neutral-400"
              : "text-red-400";

        return (
          <div key={item.name} className="w-full flex gap-2 items-center">
            <p className="shrink-0">{item.label ?? item.name}</p>
            <div className="flex-1 border-b border-b-neutral-600 border-dotted" />
            <p className={`shrink-0 whitespace-nowrap ${color}`}>{status}</p>
          </div>
        );
      })}
    </div>
  );
}

export default InputStatus;
