import React from "react";
import  Head  from 'next/head';
import styles from './home.module.scss'
import { SubscribeButton } from "../components/SubscribeButton";
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";

interface HomeProps{
  product: {
      priceId: string;
      amount: number;
  }
}


export default function Home({product}: HomeProps) {
  return (
    <>
    <Head>
      <title>Inicio | Ig.news</title>
    </Head>
     <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>✌️ Hey, Welcome</span>
          <h1>News about the <span>React </span>world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="girl coding" />
     </main>
    </>
  )
}
export const getStaticProps:GetStaticProps = async ()=>{
  const price = await stripe.prices.retrieve('price_1LXzdnGJtC4iI5MkAlBzZIJg', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  }).format(price.unit_amount / 100),
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24hrs
  }
}