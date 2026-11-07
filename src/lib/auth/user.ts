import { users } from "@/lib/store/auth";

export function checkDuplicateUser(email: string, callsign: string) {
  const registeredUsers = users.get();

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedCallsign = callsign.trim().toLowerCase();

  return {
    emailExists: registeredUsers.some((user) => user.email.trim().toLowerCase() === normalizedEmail),

    callsignExists: registeredUsers.some((user) => user.callsign.trim().toLowerCase() === normalizedCallsign),
  };
}
