import type { NextPage } from 'next';
import { Button } from '../components/mankracht/Button';
import { LayoutManKracht } from '../components/mankracht/LayoutManKracht';
import { Column } from '../components/util/Column';
import { Row } from '../components/util/Row';
import { Spacer } from '../components/util/Spacer';
import styles from './index.module.scss';

const Home: NextPage = () => {
  return (
    <LayoutManKracht>
      <Row style={{ marginTop: 50 }}>
        <Column>
          <img src="img/scooter.png" />
        </Column>

        <Spacer />

        <Column gap={20} style={{ maxWidth: 500 }}>
          <h1>Je aanmelding is bijna compleet</h1>

          <p style={{ opacity: 0.6 }}>
            Voordat je op vacatures kunt reageren hebben we nog wat informatie
            van je nodig.
          </p>

          <img src="img/progress_2.svg" />

          <h3 style={{ textAlign: 'center' }}>Controle identiteit</h3>

          <Row className={styles.step} gap={20}>
            <p>
              Bevestig je identiteit heel simpel via één van de wallet apps op
              je mobiele telefoon.
            </p>

            <Button>Controleer identiteit</Button>
          </Row>

          <Row className={styles.step} gap={20}>
            <p>
              Heb je geen wallet app? Kom dan langs bij een van onze
              vestigingen.
            </p>

            <Button outlined>Maak afspraak</Button>
          </Row>
        </Column>
      </Row>
    </LayoutManKracht>
  );
};

export default Home;
