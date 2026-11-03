import { z } from "zod";

const registerSchema = z
  .object({
    callsign: z.string().min(3, "callsign is too short").max(20, "callsign is too long"),
    email: z.email(),
    password: z
      .string()
      .min(8, "password must be at least 8 characters")
      .regex(/[A-Z]/, "include at least one uppercase letter")
      .regex(/[a-z]/, "include at least one lowercase letter")
      .regex(/[0-9]/, "include at least one number"),
    confirmPassword: z.string().min(1, "please confirm your password"),
    terms: z.boolean().refine((v) => v === true, {
      message: "accept the terms to continue",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof registerSchema>;
export { registerSchema };
