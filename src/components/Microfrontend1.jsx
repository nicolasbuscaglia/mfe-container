import { useMicrofrontendContext } from "@/context/MicrofrontendContext";
import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";

const CustomButton = dynamic(
  () =>
    import("mfeApp1/CustomButton").catch(
      () =>
        function showImportError() {
          return <p>Microfrontend is down.</p>;
        }
    ),
  {
    loading: () => <CircularProgress />,
    ssr: false,
  }
);

const Microfrontend1 = () => {
  const { emitter } = useMicrofrontendContext();
  return <CustomButton emitter={emitter} />;
};

export default Microfrontend1;
