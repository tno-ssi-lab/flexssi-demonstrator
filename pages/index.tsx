import styles from './index.module.scss';

import { NextPage } from 'next';
import { Column } from 'components/util/Column';
import Link from 'next/link';
import { SystemLayout } from 'components/system/SystemLayout';

const HomePage: NextPage = () => {
  return (
    <SystemLayout>
      <Column style={{ padding: 20 }} gap={30}>
        <h1>SSI prototype</h1>

        <h3>Voorbeeld flow 1: aanmelding met paspoort verificatie</h3>
        <ul>
          <li>
            <Link href="/system/issue_passport">
              <a>Stuur (voorbeeld) paspoort gegevens naar wallet</a>
            </Link>
          </li>

          <li>
            <Link href="/mankracht/aanmelding">
              <a>Aanmelding bij "manKRACHT" met paspoort gegevens</a>
            </Link>
          </li>
        </ul>

        <h3>
          Voorbeeld flow 2: overdracht fase gegevens tussen arbeidsbureau's
        </h3>
        <ul>
          <li>Stuur fase gegevens van "manKRACHT" naar wallet</li>
          <li>Lees deze fase gegevens in bij "FlexiForce"</li>
        </ul>
      </Column>
    </SystemLayout>
  );
};

export default HomePage;
