import {  useWatch } from "react-hook-form";
import { type FormValues } from "@/lib/schema/RegisterSchema";
import { LEVELS } from "@/lib/data/password-levels";
import { getScore } from "@/lib/utils/utilities";

function FormPasswordStrength() {

  const password = useWatch<FormValues, "password">({
    name: "password",
  });

  const score = getScore(password);
  const { label, color, textColor } = LEVELS[score];

  return (
    <div className="grid gap-2 relative">
      <div className="grid grid-cols-4 gap-2" aria-hidden>
        {[1, 2, 3, 4].map((bar) => (
          <span key={bar} className={`h-1 ${bar <= score ? color : "bg-neutral-700"}`} />
        ))}
      </div>
      {label && (
        <p aria-live="polite" className={`preset-7 min-h-5 uppercase absolute right-0 top-full pt-3.5 ${textColor}`}>
          {label}
        </p>
      )}
    </div>
  );
}

export default FormPasswordStrength;
