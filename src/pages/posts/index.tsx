import Head from 'next/head';
import styles from './styles.module.scss'
export default function Posts() {
  return (
  <>
    <Head>
      <title>Posts</title>
    </Head>
    <main className={styles.container}>
      {/* <div className={styles.posts}>
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
      </div> */}
    </main>
  </>
  );
}
