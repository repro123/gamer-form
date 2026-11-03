import Alert from "@/assets/images/icon-alert.svg";

interface FormErrorProps {
  message: string;
  id?: string;
}

function FormError({ message, id }: FormErrorProps) {
  return (
    <p className="flex items-center gap-2 preset-7 text-red-400" aria-live="polite" id={id}>
      <img src={Alert} alt="" className="size-4" /> <span className="mt-1.25">{message}</span>
    </p>
  );
}

export default FormError;
