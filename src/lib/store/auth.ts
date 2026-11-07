import { chunk } from "stunk";

export type StoredUser = {
  callsign: string;
  email: string;
  salt: string;
  passwordHash: string;
};

export const users = chunk<StoredUser[]>([]);
