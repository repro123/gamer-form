import type { FormInputProps } from "@/lib/types/types";

import Eye from "@/assets/images/icon-eye.svg";
import EyeOff from "@/assets/images/icon-eye-off.svg";
import Tick from "@/assets/images/icon-tick-20.svg";
import { useState } from "react";

function FormInput({ id, type, placeholder, autoComplete, isValid, isSubmitting, onBlur, ...rest }: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  function handleTogglePassword() {
    setShowPassword((e) => !e);
  }

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  };

  const isPasswordInput = type === "password";
  const inputType = !isPasswordInput ? type : showPassword ? "text" : "password";

  return (
    <div className="relative">
      <input
        {...rest}
        type={inputType}
        className={`bg-neutral-950 border h-12 w-full block text-neutral-100 preset-4 px-4 border-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:border-lime-500 focus-visible:outline-lime-500 aria-invalid:border-red-400 aria-invalid:focus-visible:border-red-400 aria-invalid:focus-visible:outline-red-400 autofill:shadow-[inset_0_0_0_1000px_var(--color-neutral-950)] autofill:[-webkit-text-fill-color:var(--color-neutral-100)] ${isPasswordInput ? "pr-24" : "pr-14"}`}
        id={id}
        disabled={isSubmitting}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onKeyDown={handleKeyEvent}
        onKeyUp={handleKeyEvent}
        onBlur={(e) => {
          setCapsLockOn(false);
          onBlur?.(e); // keep RHF's blur (validation, touched)
        }}
      />

      {isValid && (
        <img
          src={Tick}
          alt=""
          aria-hidden
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${isPasswordInput ? "right-14" : "right-4"}`}
        />
      )}

      {isPasswordInput && (
        <button
          aria-label={showPassword ? "hide password" : "show password"}
          className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer z-1 h-full px-4 hover:bg-neutral-600"
          onClick={handleTogglePassword}
          type="button"
        >
          <img src={showPassword ? EyeOff : Eye} alt="" />
        </button>
      )}

      {isPasswordInput && capsLockOn && (
        <p role="status" className="preset-7 mt-2 text-amber-400">
          Caps Lock is on
        </p>
      )}
    </div>
  );
}

export default FormInput;
