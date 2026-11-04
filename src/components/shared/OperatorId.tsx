interface Props {
  className?: string;
}

function OperatorId({ className = "" }) {
  return (
    <>
      <p>operator id</p>
      <p className={className}>unassigned</p>
    </>
  );
}

export default OperatorId;
