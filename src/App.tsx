import Form from "@/components/form/Form";
import DesktopView from "@/components/views/DesktopView";
import MobileView from "@/components/views/MobileView";

function App() {
  return (
    <main className="w-full mx-auto max-w-360 p-4 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">
      <MobileView />
      <DesktopView />

      <Form />
    </main>
  );
}

export default App;
