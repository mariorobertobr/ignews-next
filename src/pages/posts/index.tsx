import { GetStaticProps } from 'next';
import Head from 'next/head';
// import { getPrismicClient } from '../../services/prismic';
import * as prismic from '@prismicio/client'
import { PrismicRichText, useFirstPrismicDocument } from '@prismicio/react'
import styles from './styles.module.scss'
import sm from "../../../sm.json"
import { useEffect } from 'react';
import { RichText} from 'prismic-dom'
import Link from 'next/link';
type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}


interface PostProps {
  posts: Post[]
}



export default function Posts({posts}: PostProps) {

    const [document ] = useFirstPrismicDocument()
  

  return (
  <>
  
    <Head>
      <title>Posts</title>
    </Head>
    <main className={styles.container}>
      <div className={styles.posts}>
        {
          posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
            <a key={post.slug} >
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
             </a>
           </Link>
          ))
        }
       </div>
    </main>
  </>
  )
}


export const getStaticProps: GetStaticProps = async () =>  {
 const client = prismic.createClient(
  sm.apiEndpoint
 );

 const response = await client.getAllByType('publication', {
  pageSize: 100
 });

 
 const posts = response.map(post => {
  return {
    slug: post.uid,
    title: post.data.title,
    excerpt: post.data.content.find(content=> content.type === 'paragraph')?.text ?? '',
    
    // excerpt: post.data.content.text,
     
    updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

 })
 return {
 
  props: {
    posts
  },
  revalidate: 60 * 60 * 1

 }

}