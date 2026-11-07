import { chunk } from "stunk";
import { persist } from "stunk/middleware";

export type StoredUser = {
  callsign: string;
  email: string;
  salt: string;
  passwordHash: string;
};

export const users = persist(chunk<StoredUser[]>([]), { key: "users" });
