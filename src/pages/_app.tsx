import React from 'react';
import { Header } from '../components/Header';
import '../styles/global.scss';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>  
    <SessionProvider session={session}>
        <Header></Header>
       <Component {...pageProps} />;
       </SessionProvider>
    </>
  )
}

export default MyApp;
