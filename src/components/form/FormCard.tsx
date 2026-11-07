import { useState } from "react";
import Form from "@/components/form/Form";
import FormCornerBorders from "@/components/form/FormCornerBorders";

import SuccessPanel from "@/components/shared/SuccessPanel";

function FormCard() {
  const [registrationSucceeded, setRegistrationSucceeded] = useState(false);

  return (
    <div className="perspective-distant relative">
      <div
        className={`grid transform-3d transition-transform duration-700 motion-reduce:transition-none ${
          registrationSucceeded ? "rotate-y-180" : ""
        }`}
      >
        {/* front: the form */}
        <div className="col-start-1 row-start-1 backface-hidden" inert={registrationSucceeded}>
          <Form onRegistrationSuccess={() => setRegistrationSucceeded(true)} />
        </div>

        {/* back: success */}
        <div
          className="col-start-1 row-start-1 backface-hidden rotate-y-180 grid place-content-center gap-4 border border-neutral-700 bg-neutral-900 p-10"
          inert={!registrationSucceeded}
        >
          <SuccessPanel />
        </div>
      </div>

      <FormCornerBorders />
    </div>
  );
}

export default FormCard;
