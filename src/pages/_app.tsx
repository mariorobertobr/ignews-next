import React from 'react';
import { Header } from '../components/Header';
import '../styles/global.scss';
import { SessionProvider } from "next-auth/react"
import { PrismicProvider } from '@prismicio/react'
import { client } from '../services/prismic';



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>  
    <PrismicProvider client={client}>
    <SessionProvider session={session}>
        <Header></Header>
       <Component {...pageProps} />
       </SessionProvider>
    </PrismicProvider>
    </>
  )
}

export default MyApp;
