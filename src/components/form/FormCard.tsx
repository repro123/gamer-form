import { useFormState, useWatch } from "react-hook-form";
import type { FormValues } from "@/lib/schema/RegisterSchema";
import Form from "@/components/form/Form";
import FormCornerBorders from "@/components/form/FormCornerBorders";

import SuccessPanel from "@/components/shared/SuccessPanel";

function FormCard() {
  const { isSubmitSuccessful } = useFormState<FormValues>();

  return (
    <div className="perspective-distant relative">
      <div
        className={`grid transform-3d transition-transform duration-700 motion-reduce:transition-none ${
          isSubmitSuccessful ? "rotate-y-180" : ""
        }`}
      >
        {/* front: the form */}
        <div className="col-start-1 row-start-1 backface-hidden" inert={isSubmitSuccessful}>
          <Form />
        </div>

        {/* back: success */}
        <div
          className="col-start-1 row-start-1 backface-hidden rotate-y-180 grid place-content-center gap-4 border border-neutral-700 bg-neutral-900 p-10"
          inert={!isSubmitSuccessful}
        >
          <SuccessPanel />
        </div>
      </div>

      <FormCornerBorders />
    </div>
  );
}

export default FormCard;
