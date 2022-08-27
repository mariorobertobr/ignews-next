import { GetServerSideProps, GetStaticProps } from "next"
import { getSession, useSession } from "next-auth/react";
import * as prismic from '@prismicio/client'
import sm from "./../../../../sm.json"
import { RichText } from "prismic-dom";
import Head from "next/head";

import styles from '../post.module.scss'
import { client } from "./../../../services/prismic";
import Link from "next/link";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";


interface PostProps {
  post:  {
    title: string
    slug: string
    content: string
    updated: string
  }

}


export default function PostPreview({post}: PostProps){

   const { data: session } = useSession();

    const router = useRouter()


    useEffect( () => {
        if (session?.activeSubscription){
            router.push(`/posts/${post.slug}`)
        }


    },[session])

    return (
       <>
        {/* <Head>
            <title>Ignews</title>
        </Head> */}
        <main className={styles.container}>
            <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updated}</time>
                <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{__html: post.content}}></div>

                <div className={styles.continueReading}>
                        Wanna Continue Reading?
                        <Link href="/home">
                        <a href="">Subscribe Now 🤑</a>
                        </Link>
                </div>
            </article>
        </main>
       </>
    )
}
export const getStaticPaths = () =>{
    return {
        paths: [],
        fallback: 'blocking'
    }

}



export const getStaticProps: GetStaticProps = async ({params}) => {

    const { slug }  = await params


  
    const response = await client.getByUID('publication', String(slug), {
        

    })
    const post =  { 
      
        title: response.data.title,
        slug: slug,
        content: RichText.asHtml(response.data.content.slice(0,2)),
        updated: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
            })
    }

    return {
         props: {
            post
        }
    }

}