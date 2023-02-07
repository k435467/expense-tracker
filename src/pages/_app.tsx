import '@/styles/globals.css'
import Head from "next/head";
import type { AppProps } from "next/app";
import { AuthUserProvider } from "@/components/Auth";
import { Layout } from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
