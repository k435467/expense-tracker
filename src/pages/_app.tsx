import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useFirebaseAuth } from "@/hooks/firebase";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useFirebaseAuth();

  console.log("dbg user: ", user);

  return <Component {...pageProps} />
}
