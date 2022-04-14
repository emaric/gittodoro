import Head from 'next/head'
import { NextPage } from 'next/types'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gittodoro</title>
      </Head>

      <main className={styles.container}></main>
    </>
  )
}

export default Home
