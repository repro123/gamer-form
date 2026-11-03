const LEVELS = [
  { label: "", color: "", textColor: "" },
  { label: "weak", color: "bg-red-400", textColor: "text-red-400" },
  { label: "fair", color: "bg-amber-400", textColor: "text-amber-400" },
  { label: "good", color: "bg-yellow-400", textColor: "text-yellow-400" },
  { label: "strong", color: "bg-lime-500", textColor: "text-lime-500" },
];

function getScore(pw: string) {
  if (!pw) return 0;
  if (pw.length < 8) return 1; // too short caps at weak

  let score = 1;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

function FormPasswordStrength({ password }: { password: string }) {
  const score = getScore(password);
  const { label, color, textColor } = LEVELS[score];

  return (
    <div className="grid gap-2 relative">
      <div className="grid grid-cols-4 gap-2" aria-hidden>
        {[1, 2, 3, 4].map((bar) => (
          <span key={bar} className={`h-1 ${bar <= score ? color : "bg-neutral-700"}`} />
        ))}
      </div>
      {label && (
        <p aria-live="polite" className={`preset-7 min-h-5 uppercase absolute right-0 top-full pt-3.5 ${textColor}`}>
          {label}
        </p>
      )}
    </div>
  );
}

export default FormPasswordStrength;
