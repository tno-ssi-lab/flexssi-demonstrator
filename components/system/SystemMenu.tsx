import { PropsWithChildren } from 'react';
import styles from './SystemMenu.module.scss';
import Link from 'next/link';
import { Row } from 'components/util/Row';

export function SystemMenu(props: PropsWithChildren<{}>) {
  return (
    <div className={styles.main}>
      <Link href="/">
        <a>
          <Row centerY>
            <i className="fas fa-chevron-left"></i>

            <span>Terug naar overzicht</span>
          </Row>
        </a>
      </Link>
    </div>
  );
}
