import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import * as prismic from '@prismicio/client'
import sm from "../../../sm.json"
import { RichText } from "prismic-dom";
import Head from "next/head";

import styles from './post.module.scss'
import { client } from "../../services/prismic";


interface PostProps {
  post:  {
    title: string
    slug: string
    content: string
    updated: string
  }

}


export default function Post({post}: PostProps){
    return (
       <>
        {/* <Head>
            <title>Ignews</title>
        </Head> */}
        <main className={styles.container}>
            <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updated}</time>
                <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.content}}></div>

            </article>
        </main>
       </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {

  const session = await getSession({req});
    const { slug }  = await params

if (!session?.activeSubscription) {
    return {
        redirect: {
            destination: '/',
            permanent: false
        }

    }
}
  
    const response = await client.getByUID('publication', String(slug), {
        

    })

    // const response = await client.buildQueryURL('https://ignewsmariobr.cdn.prismic.io/api/v2/documents/search?ref=YwjIJhYAACcASV5a&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22Yv_pIxYAACYAIf-H%22%29+%5D%5D', {})
    

    const post =  { 
      
        title: response.data.title,
        slug: slug,
        content: RichText.asHtml(response.data.content),
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