import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ClientIPTracker from "../components/analytics/ClientIPTracker";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClientIPTracker />
      <Component {...pageProps} />
    </>
  );
}
