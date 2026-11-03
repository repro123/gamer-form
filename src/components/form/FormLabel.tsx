import { ChevronRight } from "lucide-react";

interface LabelProps {
  labelText: string;
  htmlFor: string;
}

function FormLabel({ labelText, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="preset-6 text-neutral-300 flex items-center gap-2">
      <ChevronRight className="text-lime-500 size-4" /> <span>{labelText}</span>
    </label>
  );
}

export default FormLabel;
