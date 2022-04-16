import Head from 'next/head'
import { NextPage } from 'next/types'

import styles from '../styles/Home.module.css'

import { MainClock } from '@/components/clock/MainClock'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gittodoro</title>
      </Head>

      <div className={styles.container}>
        <main>
          <h1 className={styles.title}>git<span>todo</span>ro</h1>
          <section>
            <MainClock />
          </section>
        </main>
        <footer>
          <span>Copyright © 2022</span> <a href="https://github.com/emaric/gittodoro.git">@emaric/gittorodo</a>
        </footer>
      </div>
    </>
  )
}

export default Home
