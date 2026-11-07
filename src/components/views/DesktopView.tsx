import InputStatus from "@/components/shared/InputStatus";
import Logo from "@/components/shared/Logo";
import MainHeading from "@/components/shared/MainHeading";
import OperatorId from "@/components/shared/OperatorId";
import TotalReadyInputs from "@/components/shared/TotalReadyInputs";

export default function DesktopView() {
  return (
    <div className="hidden lg:block">
      <header className="flex">
        <Logo />
      </header>

      <div className="py-4 mt-8">
        <MainHeading />

        <div className="mt-16 border-t pt-6 border-t-neutral-600 preset-6">
          <div className="text-neutral-400 flex items-start justify-between">
            <div className="flex flex-col">
              <OperatorId className="preset-2" />
            </div>

            <TotalReadyInputs />
          </div>

          <InputStatus />
        </div>
      </div>
    </div>
  );
}
