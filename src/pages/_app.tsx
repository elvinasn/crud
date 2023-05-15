import { store } from "@/store";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div>
        <Toaster position="bottom-left" />
      </div>
      <Component {...pageProps} />
    </Provider>
  );
}
