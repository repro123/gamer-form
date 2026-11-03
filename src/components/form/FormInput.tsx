import type { FormInputProps } from "@/lib/types/types";

import Eye from "@/assets/images/icon-eye.svg";
import EyeOff from "@/assets/images/icon-eye-off.svg";
import Tick from "@/assets/images/icon-tick-20.svg";
import { useState } from "react";

function FormInput({ id, type, placeholder, autoComplete, isValid, ...rest }: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword() {
    setShowPassword((e) => !e);
  }

  const isPasswordInput = type === "password";
  const inputType = !isPasswordInput ? type : showPassword ? "text" : "password";

  return (
    <div className="relative">
      <input
        type={inputType}
        className={`bg-neutral-950 border h-12 w-full block text-neutral-100 preset-4 px-4 focus-visible:outline-offset-2 ${isPasswordInput ? "pr-24" : "pr-14"} ${!isValid ? "border-red-400 focus-visible:outline focus-visible:outline-red-400" : "border-neutral-600 focus-visible:border-lime-500 focus-visible:outline focus-visible:outline-lime-500"}`}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...rest}
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
    </div>
  );
}

export default FormInput;
