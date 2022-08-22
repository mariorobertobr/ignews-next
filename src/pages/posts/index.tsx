import { GetStaticProps } from 'next';
import Head from 'next/head';
// import { getPrismicClient } from '../../services/prismic';
import * as prismic from '@prismicio/client'
import { PrismicRichText, useFirstPrismicDocument } from '@prismicio/react'
import styles from './styles.module.scss'
import sm from "../../../sm.json"
import { useEffect } from 'react';
import { RichText} from 'prismic-dom'
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
  {
    console.log(document)
  }
    <Head>
      <title>Posts</title>
    </Head>
    <main className={styles.container}>
      <div className={styles.posts}>
        <a href='#'>
          <time>19 de agosto de 2022</time>
          <strong>Prisma Uma nova maneira de ver o mundo?</strong>
          <p>venha conhecer sobre as melhores ferramentas já ouviu falar de prisma? com ele é possível fazer tudo</p>
        </a>
      </div>
      <div className={styles.posts}>
        <a href='#'>
          <time>19 de agosto de 2022</time>
          <strong>Prisma Uma nova maneira de ver o mundo?</strong>
          <p>venha conhecer sobre as melhores ferramentas já ouviu falar de prisma? com ele é possível fazer tudo</p>
        </a>
      </div>
      {/* {document && (
        <PrismicRichText field={document.data.title} />
      )} */}
{/* 
        <ul>
      {response.results.map((document) => (
    <li key={document.id}>{document.data.example_key_text}</li>
  ))}
</ul> */}

    </main>
  </>
  );
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
    title: RichText.asText(post.data.title),
    excerpt: post.data.content.find(content=> content.type === 'paragraph')?.text ?? '',
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