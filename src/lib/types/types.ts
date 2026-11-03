import type { ComponentProps } from "react";

export type InputType = "text" | "email" | "password";

export type FormInputProps = Omit<ComponentProps<"input">, "type"> & {
  id: string;
  type: InputType;
  isValid: boolean;
};
