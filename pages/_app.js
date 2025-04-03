import "@/styles/globals.css";
import Layuot from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layuot>
      <Component {...pageProps} />;
    </Layuot>
  )
}
