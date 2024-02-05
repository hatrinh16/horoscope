import "@mantine/core/styles.css";
import "./globals.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { AppProvider } from "../components/AppContext";

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <AppProvider>
        <Head>
          <title>Daily Horoscope</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="http://www.w3.org/2000/svg" />
        </Head>
        <Component {...pageProps} />
      </AppProvider>
    </MantineProvider>
  );
}
