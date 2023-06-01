import Header from "@/components/header";
import { MicrofrontendProvider } from "@/context/MicrofrontendContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MicrofrontendProvider>
        <Header />
        <Component {...pageProps} />
        <Toaster />
      </MicrofrontendProvider>
    </>
  );
}
