import Logo from "@/components/shared/Logo";
import MainHeading from "@/components/shared/MainHeading";
import OperatorId from "@/components/shared/OperatorId";
import TotalReadyInputs from "@/components/shared/TotalReadyInputs";

function MobileView() {
  return (
    <div className="lg:hidden">
      <header className="flex items-center justify-between">
        <Logo />

        <TotalReadyInputs />
      </header>

      <div className="py-4">
        <MainHeading />

        <div className="mt-6 preset-6 text-neutral-400 pt-4 border-t border-t-neutral-600 flex items-center justify-between">
          <OperatorId />
        </div>
      </div>
    </div>
  );
}

export default MobileView;
