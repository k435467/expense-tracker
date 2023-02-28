import '@/styles/globals.css'
import Head from "next/head";
import type { AppProps } from "next/app";
import { AuthUserProvider } from "@/components/Auth";
import { Layout } from "@/components/Layout";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthUserProvider>
        <Head>
          <title>Expense Tracker</title>
          <meta name="description" content="A expense tracker web app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthUserProvider>
    </Provider>
  );
}
