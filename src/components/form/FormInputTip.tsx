interface Props {
  tip: string;
}

export default function FormInputTip({ tip }: Props) {
  return <p className="preset-7 text-neutral-400">{tip}</p>;
}
