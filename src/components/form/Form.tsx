import FormHeading from "@/components/form/FormHeading";
import FormInput from "@/components/form/FormInput";
import FormLabel from "@/components/form/FormLabel";

import type { InputType } from "@/lib/types/types";

import { useFormState, useFormContext, type SubmitHandler } from "react-hook-form";

import { type FormValues } from "@/lib/schema/RegisterSchema";
import FormError from "@/components/form/FormError";
import FormPasswordStrength from "@/components/form/FormPasswordStrength";
import FormInputTip from "@/components/form/FormInputTip";
import { useState } from "react";

import { createSalt, hashPassword } from "@/lib/auth/hash";
import { users } from "@/lib/store/auth";
import { checkDuplicateUser } from "@/lib/auth/user";

interface FormInputDataProps {
  label: string;
  type: InputType;
  placeholder: string;
  name: keyof FormValues;
  autoComplete?: string;
}

interface FormProps {
  className?: string;
  onRegistrationSuccess: () => void;
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

function Form({ className = "", onRegistrationSuccess }: FormProps) {
  const { register, handleSubmit, getFieldState, setError, clearErrors } = useFormContext<FormValues>();
  const [shake, setShake] = useState(false);

  const { errors, isSubmitting } = useFormState<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    clearErrors("root.submit");
    const { emailExists, callsignExists } = checkDuplicateUser(data.email, data.callsign);

    if (emailExists) {
      setError("email", {
        type: "manual",
        message: "An account with this email already exists.",
      });
    }

    if (callsignExists) {
      setError("callsign", {
        type: "manual",
        message: "This callsign is already taken.",
      });
    }

    if (emailExists || callsignExists) return;

    try {
      const salt = createSalt();
      const passwordHash = await hashPassword(data.password, salt);

      // Keep the simulated request visible long enough for the loading state to register.
      await new Promise((resolve) => setTimeout(resolve, 800));

      users.set((prev) => [...prev, { callsign: data.callsign, email: data.email, salt, passwordHash }]);
      onRegistrationSuccess();
    } catch {
      setError("root.submit", {
        type: "server",
        message: "We couldn't complete registration. Please try again.",
      });
    }
  };

  return (
    <>
      <form
      onSubmit={handleSubmit(onSubmit, () => setShake(true))}
      aria-busy={isSubmitting}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) setShake(false);
      }}
      className={`px-5 py-8 md:p-10 shadow-navy bg-neutral-900 border border-neutral-700 grid gap-6 relative mt-8 lg:mt-0 ${shake ? "motion-safe:animate-shake" : ""} ${className}`}
      noValidate
    >
      <FormHeading />

      {formInputsData.map((data) => {
        const error = errors[data.name]?.message;
        const isValid = getFieldState(data.name).isDirty && !getFieldState(data.name).invalid;
        const hintId = data.name === "callsign" || data.name === "password" ? `${data.name}-hint` : undefined;
        const describedBy = [hintId, error ? `${data.name}-error` : undefined].filter(Boolean).join(" ") || undefined;

        return (
          <div key={data.name} className="grid gap-2">
            <FormLabel labelText={data.label} htmlFor={data.name} />
            <FormInput
              id={data.name}
              type={data.type}
              placeholder={data.placeholder}
              aria-invalid={!!error}
              aria-describedby={describedBy}
              autoComplete={data.autoComplete}
              isValid={isValid}
              isSubmitting={isSubmitting}
              {...register(data.name, {
                ...(data.name === "password" && {
                  deps: "confirmPassword",
                }),
              })}
            />
            {data.name === "callsign" && <FormInputTip id="callsign-hint" tip="3–20 characters: letters, numbers, _or-" />}
            {data.name === "password" && <FormPasswordStrength />}
            {data.name === "password" && <FormInputTip id="password-hint" tip="At least 8 characters" />}
            {error && <FormError id={`${data.name}-error`} message={error} />}
          </div>
        );
      })}

      <div className="grid gap-2">
        <label className="preset-5 text-neutral-300 flex items-center gap-4">
          <input
            type="checkbox"
            disabled={isSubmitting}
            aria-invalid={!!errors.terms}
            aria-describedby={errors.terms ? "terms-error" : undefined}
            {...register("terms")}
            className={`size-4 appearance-none border bg-neutral-950 checked:bg-lime-500 checked:border-lime-500 checked:after:content-['âœ“'] checked:after:text-neutral-950 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-xs checked:after:font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 cursor-pointer ${errors.terms?.message ? "border-red-400" : "border-neutral-600"}`}
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
        {errors.terms?.message && <FormError id="terms-error" message={errors.terms.message} />}
      </div>

      {errors.root?.submit?.message && <FormError message={errors.root.submit.message} />}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`preset-5-bold border w-full p-2 ${isSubmitting ? "bg-neutral-950 text-lime-500 pointer-events-none" : "text-neutral-950 bg-lime-500 cursor-pointer border-lime-500 hover:bg-lime-700"} disabled:opacity-50`}
      >
        {isSubmitting ? "initializing_" : "initialize account"}
      </button>
      <p className="text-neutral-300 preset-5 text-center">
        Already an operator?{" "}
        <a href="/login" className="text-lime-500 hover:underline">
          Log In
        </a>
      </p>
      </form>
      <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isSubmitting ? "Creating your account. Please wait." : ""}
      </span>
    </>
  );
}

export default Form;
