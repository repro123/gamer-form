import HexCheck from "@/assets/images/icon-hex-check.svg";
import { useWatch } from "react-hook-form";
import type { FormValues } from "@/lib/schema/RegisterSchema";
import { useEffect, useRef } from "react";

export default function SuccessPanel({ isActive }: { isActive: boolean }) {
  const callsign = useWatch<FormValues, "callsign">({ name: "callsign" });
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isActive) headingRef.current?.focus();
  }, [isActive]);

  return (
    <div className="flex flex-col gap-4" role="status" aria-live="polite" aria-atomic="true">
      <img src={HexCheck} alt="" className="size-28" />
      <h2 ref={headingRef} tabIndex={-1} className="text-neutral-100 preset-2">
        <span className="text-lime-500">//</span> handshake complete
      </h2>
      <p className="text-neutral-300 preset-4">
        Operator <span className="text-lime-500">{callsign}</span> provisioned. Your account is ready.
      </p>
      <a
        href="/login"
        className={`preset-5-bold border w-full p-2 text-neutral-950 bg-lime-500 cursor-pointer border-lime-500 hover:bg-lime-700 disabled:opacity-50 text-center`}
      >
        continue to log in
      </a>
    </div>
  );
}
