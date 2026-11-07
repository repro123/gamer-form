import { useWatch } from "react-hook-form";
import { type FormValues } from "@/lib/schema/RegisterSchema";

interface Props {
  className?: string;
}

function OperatorId({ className = "" }: Props) {
  const callsign = useWatch<FormValues, "callsign">({
    name: "callsign",
  });

  return (
    <>
      <p>operator id</p>
      <p
        className={`normal-case ${callsign ? "text-neutral-100" : "text-neutral-400"} ${className}`}
        aria-live="polite"
      >
        {callsign ? callsign : "unassigned"}
      </p>
    </>
  );
}

export default OperatorId;
