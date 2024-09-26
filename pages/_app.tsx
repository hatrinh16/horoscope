import "@mantine/core/styles.css";
import "./globals.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { AppProvider } from "../components/AppContext";
import "./style.css";
import { GoogleAnalytics } from '@next/third-parties/google'


export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <AppProvider>
        <Head>
          <title>Daily Horoscope | DailyAstro</title>
          <meta name="google-site-verification" content="Z7Xj1mON6jtmxhfHYq1IjUEfdly8pa49_OLX_yFl0QA" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <meta
            name="description"
            content="Discover your daily horoscope and get insights into your future with DailyAstro. Stay informed with personalized astrological readings and celestial guidance tailored to your zodiac sign."
           />
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </AppProvider>
    </MantineProvider>
  );
}
