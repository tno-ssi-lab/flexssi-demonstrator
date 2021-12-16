import styles from './SystemLayout.module.scss';

import { ReactNode } from 'react';
import Head from 'next/head';

export function SystemLayout(props: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>flexSSI prototype</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>{props.children}</main>
    </>
  );
}
