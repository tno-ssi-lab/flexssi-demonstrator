import styles from './LayoutManKracht.module.scss';

import { ReactNode } from 'react';
import { Row } from '../util/Row';
import { Spacer } from '../util/Spacer';
import { Column } from '../util/Column';
import Head from 'next/head';
import { SystemMenu } from 'components/system/SystemMenu';

export function LayoutManKracht(props: { children: ReactNode }) {
  return (
    <Column className={styles.main} centerX>
      <Head>
        <title>manKRACHT</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      <SystemMenu />

      <div className={styles.container}>
        <Row centerY className={styles.topBar}>
          <img src="/img/manKRACHT.svg" />

          <Spacer />

          <Row className={styles.nav} gap={20}>
            <a className={styles.navActive}>Mijn profiel</a>

            <a>Vacatures</a>

            <a>Contact</a>

            <a>Help</a>
          </Row>

          <Spacer />

          <Row className={styles.userInfo}>
            <Column>
              <div className={styles.name}>Ahmed Mehadi</div>
              <a>Logout</a>
            </Column>

            <img src="/img/ahmed.jpg" />
          </Row>
        </Row>

        <div className="body">{props.children}</div>
      </div>
    </Column>
  );
}
