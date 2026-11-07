interface Props {
  tip: string;
  id: string;
}

export default function FormInputTip({ id, tip }: Props) {
  return <p id={id} className="preset-7 text-neutral-400">{tip}</p>;
}
