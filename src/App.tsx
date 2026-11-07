import Form from "@/components/form/Form";
import DesktopView from "@/components/views/DesktopView";
import MobileView from "@/components/views/MobileView";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type FormValues } from "@/lib/schema/RegisterSchema";
import FormCard from "@/components/form/FormCard";

function App() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      callsign: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <main className="w-full mx-auto max-w-360 p-4 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">
        <MobileView />
        <DesktopView />

        {/* <Form /> */}
        <FormCard />
      </main>
    </FormProvider>
  );
}

export default App;
