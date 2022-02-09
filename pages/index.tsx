import styles from './index.module.scss';

import { NextPage } from 'next';
import { Column } from 'components/util/Column';
import Link from 'next/link';
import { SystemLayout } from 'components/system/SystemLayout';

const HomePage: NextPage = () => {
  return (
    <SystemLayout>
      <Column style={{ padding: 20 }} gap={30}>
        <h1>FlexSSI prototype</h1>

        <div className={styles.mobileWarning}>
          Het lijkt erop dat je dit prototype op mobiel bekijkt. Het is de
          bedoeling dat je deze pagina op een computer opent, en de wallet app
          op je smartphone.
        </div>

        <h3>Voorbeeld flow 1: aanmelding met paspoort verificatie</h3>
        <ul>
          <li>
            <Link href="/system/issue_passport">
              <a>Stuur (voorbeeld) paspoort gegevens naar wallet</a>
            </Link>
          </li>

          <li>
            <Link href="/mankracht/aanmelding">
              <a>Aanmelding bij &quot;manKRACHT&quot; met paspoort gegevens</a>
            </Link>
          </li>
        </ul>

        <h3>
          Voorbeeld flow 2: overdracht fase gegevens tussen arbeidsbureau&apos;s
        </h3>
        <ul>
          <li>
            <Link href="/mankracht/werkhistorie">
              <a>Stuur fase gegevens van &quot;manKRACHT&quot; naar wallet</a>
            </Link>
          </li>

          <li>
            <Link href="/flexiforce/portaal">
              <a>Lees deze fase gegevens in bij &quot;FlexiForce&quot;</a>
            </Link>
          </li>
        </ul>

        <h3>
          Voorbeeld flow 3: overdracht &quot;soft skills&quot; tussen
          arbeidsbureau&apos;s
        </h3>
        <ul>
          <li>
            <Link href="/mankracht/werkhistorie">
              <a>Stuur skills van &quot;manKRACHT&quot; naar wallet</a>
            </Link>
          </li>

          <li>
            <Link href="/flexiforce/portaal">
              <a>Lees deze skills in bij &quot;FlexiForce&quot;</a>
            </Link>
          </li>
        </ul>
      </Column>
    </SystemLayout>
  );
};

export default HomePage;
