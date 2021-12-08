import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Button } from 'components/mankracht/Button';
import { LayoutManKracht } from 'components/mankracht/LayoutManKracht';
import { Column } from 'components/util/Column';
import Portal from 'components/util/Portal';
import { Row } from 'components/util/Row';
import { Spacer } from 'components/util/Spacer';
import { createSSIClient, ResponseStatus, SSIClient } from 'util/SSIClient';
import styles from './aanmelding.module.scss';

const client = createSSIClient();

const Home: NextPage = () => {
  function issue() {
    const url = client.issueUrl(
      'SsiTest2',
      { firstName: 'Bert', lastName: 'Heuvel' },
      '12345'
    );
    console.log(url);
  }

  function verify() {
    const url = client.verifyUrl('SsiTest2', '12348');
    document.location = url;
  }

  // Check if we got JWT token from eassi callback
  const [ssiData, setSsiData] = useState({
    success: false,
    firstName: '',
    lastName: '',
  });
  useEffect(() => {
    const token = new URL(document.location.toString()).searchParams.get(
      'token'
    );
    if (!token) return;

    const response = client.parseVerifyResponse(token);

    if (response.status == ResponseStatus.success) {
      setSsiData({ ...ssiData, ...response.data, success: true });
    }
  }, [ssiData]);

  return (
    <LayoutManKracht>
      <Row style={{ marginTop: 50 }}>
        <Column>
          <img src="/img/scooter.png" />
        </Column>

        <Spacer />

        <Column gap={20} style={{ maxWidth: 500 }}>
          {ssiData.success == false && (
            <>
              <h1>Je aanmelding is bijna compleet</h1>

              <p style={{ opacity: 0.6 }}>
                Voordat je op vacatures kunt reageren hebben we nog wat
                informatie van je nodig.
              </p>
            </>
          )}

          <img src="/img/progress_2.svg" />

          <h3 style={{ textAlign: 'center' }}>Controle identiteit</h3>

          {ssiData.success == false && (
            <>
              <Row className={styles.step} gap={20}>
                <p>
                  Bevestig je identiteit heel simpel via één van de wallet apps
                  op je mobiele telefoon.
                </p>

                <Button onClick={verify}>Controleer identiteit</Button>
              </Row>

              <Row className={styles.step} gap={20}>
                <p>
                  Heb je geen wallet app? Kom dan langs bij een van onze
                  vestigingen.
                </p>

                <Button outlined disabled>
                  Maak afspraak
                </Button>
              </Row>
            </>
          )}

          {ssiData.success == true && (
            <>
              <Row className={styles.step} gap={20}>
                <p>
                  Bedankt {ssiData.firstName}, we hebben je identiteits-gegevens
                  succesvol ontvangen.
                </p>

                <Row className={styles.success} centerY>
                  <img src="/img/success_check.svg" />
                  <span>Controle geslaagd</span>
                </Row>
              </Row>

              <Row>
                <table className={styles.table}>
                  <tbody>
                    <tr>
                      <th>Voornaam</th>
                      <td>{ssiData.firstName}</td>
                    </tr>
                    <tr>
                      <th>Achternaam</th>
                      <td>{ssiData.lastName}</td>
                    </tr>
                  </tbody>
                </table>
              </Row>

              <Row className={styles.step} gap={20} centerX>
                <Button disabled>
                  <span>Volgende stap</span>
                  <i className="fas fa-chevron-right"></i>
                </Button>
              </Row>
            </>
          )}
        </Column>
      </Row>
    </LayoutManKracht>
  );
};

export default Home;
