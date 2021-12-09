import styles from './LayoutFlexiForce.module.scss';

import { ReactNode } from 'react';
import { Row } from '../util/Row';
import { Spacer } from '../util/Spacer';
import { Column } from '../util/Column';
import Head from 'next/head';
import { SystemMenu } from 'components/system/SystemMenu';

export function LayoutFlexiForce(props: { children: ReactNode }) {
  return (
    <Column className={styles.main} gap={0}>
      <Head>
        <title>FlexiForce</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      <SystemMenu />

      <div className={styles.container}>
        <Column className={styles.menu}>
          <img src="/img/FlexiForce.svg" />

          <Column className={styles.nav} gap={0}>
            <a>
              <i className="fas fa-seedling"></i>
              <span>Mijn portaal</span>
            </a>

            <a className={styles.inactive}>
              <i className="fas fa-pen-alt"></i>
              <span>Vacatures</span>
            </a>

            <a className={styles.inactive}>
              <i className="fas fa-paper-plane"></i>
              <span>Berichten</span>
            </a>

            <a className={styles.inactive}>
              <i className="fas fa-exchange-alt"></i>
              <span>Contact</span>
            </a>

            <a className={styles.inactive}>
              <i className="fas fa-user"></i>
              <span>Help</span>
            </a>
          </Column>

          <Spacer />
        </Column>

        <div className={styles.body}>{props.children}</div>
      </div>
    </Column>
  );
}
