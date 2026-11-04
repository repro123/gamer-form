import FormHeading from "@/components/form/FormHeading";
import FormInput from "@/components/form/FormInput";
import FormLabel from "@/components/form/FormLabel";

import type { InputType } from "@/lib/types/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { registerSchema, type FormValues } from "@/lib/schema/RegisterSchema";
import FormError from "@/components/form/FormError";
import FormPasswordStrength from "@/components/form/FormPasswordStrength";
import FormInputTip from "@/components/form/FormInputTip";
import FormCornerBorders from "@/components/form/FormCornerBorders";
import { useEffect } from "react";

interface FormInputDataProps {
  label: string;
  type: InputType;
  placeholder: string;
  name: keyof FormValues;
  autoComplete?: string;
}

interface FormProps {
  className?: string;
}

const formInputsData: FormInputDataProps[] = [
  { label: "callsign", type: "text", placeholder: "e.g Vortex_07", name: "callsign", autoComplete: "username" },
  { label: "email", type: "email", placeholder: "you@example.com", name: "email", autoComplete: "email" },
  {
    label: "password",
    type: "password",
    placeholder: "Enter password",
    name: "password",
    autoComplete: "new-password",
  },
  {
    label: "confirm password",
    type: "password",
    placeholder: "Confirm password",
    name: "confirmPassword",
    autoComplete: "new-password",
  },
];

function Form({ className = "" }: FormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getFieldState,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      callsign: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`px-5 py-8 md:p-10 shadow-navy bg-neutral-900 border border-neutral-700 grid gap-6 relative mt-8 lg:mt-0 ${className}`}
      noValidate
    >
      <FormHeading />

      {formInputsData.map((data) => {
        const error = errors[data.name]?.message;
        const isValid = getFieldState(data.name).isDirty && !getFieldState(data.name).invalid;

        return (
          <div key={data.name} className="grid gap-2">
            <FormLabel labelText={data.label} htmlFor={data.name} />
            <FormInput
              id={data.name}
              type={data.type}
              placeholder={data.placeholder}
              aria-invalid={!!error}
              aria-describedby={error ? `${data.name}-error` : undefined}
              autoComplete={data.autoComplete}
              isValid={isValid}
              {...register(data.name, {
                ...(data.name === "password" && {
                  deps: "confirmPassword",
                }),
              })}
            />
            {!error && data.name === "callsign" && <FormInputTip tip="3–20 characters: letters, numbers, _ or -" />}
            {data.name === "password" && <FormPasswordStrength password={password} />}
            {!error && data.name === "password" && <FormInputTip tip="At least 8 characters" />}
            {error && <FormError id={`${data.name}-error`} message={error} />}
          </div>
        );
      })}

      <div className="grid gap-2">
        <label className="preset-5 text-neutral-300 flex items-center gap-4">
          <input
            type="checkbox"
            {...register("terms")}
            className={`size-4 appearance-none border bg-neutral-950 checked:bg-lime-500 checked:border-lime-500 checked:after:content-['✓'] checked:after:text-neutral-950 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs checked:after:font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 cursor-pointer ${errors.terms?.message ? "border-red-400" : "border-neutral-600"}`}
          />

          <span>
            I agree to the{" "}
            <a href="#" className="text-lime-500 capitalize hover:underline">
              terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-lime-500 capitalize hover:underline">
              privacy policy
            </a>
          </span>
        </label>
        {errors.terms?.message && <FormError message={errors.terms.message} />}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`preset-5-bold border w-full p-2 ${isSubmitting ? "bg-neutral-950 text-lime-500 pointer-events-none" : "text-neutral-950 bg-lime-500 cursor-pointer border-lime-500 hover:bg-lime-700"} disabled:opacity-50`}
      >
        {isSubmitting ? "initializing_" : "initialize account"}
      </button>

      <p className="text-neutral-300 preset-5 text-center">
        Already an operator?{" "}
        <a href="#" className="text-lime-500 hover:underline">
          Log In
        </a>
      </p>

      <FormCornerBorders />
    </form>
  );
}

export default Form;
