import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Button } from 'components/mankracht/Button';
import { LayoutManKracht } from 'components/mankracht/LayoutManKracht';
import { Column } from 'components/util/Column';
import { Row } from 'components/util/Row';
import { Spacer } from 'components/util/Spacer';
import {
  createCallbackUrl,
  createSSIClient,
  ResponseStatus,
} from 'util/SSIClient';
import styles from './aanmelding.module.scss';
import {
  disclosurePassportKeys,
  passportCredType,
  passportKeys,
} from 'model/Passport';

const client = createSSIClient();

const Home: NextPage = () => {
  function verify() {
    const url = client.verifyUrl(
      passportCredType,
      Date.now() + '',
      createCallbackUrl(),
      disclosurePassportKeys.map((r) => r.key)
    );
    document.location = url;
  }

  // Check if we got JWT token from eassi callback
  const [ssiData, setSsiData] = useState({
    success: false,
    response: {
      nationality: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      birthPlace: '',
      gender: '',
      length: '',
      bsn: '',
      documentNumber: '',
      documentDateOfIssue: '',
      documentValidUntil: '',
    },
  });
  useEffect(() => {
    const token = new URL(document.location.toString()).searchParams.get(
      'token'
    );
    if (!token) return;

    const response = client.parseVerifyResponse(token);

    // Special handling for IRMA (based on slightly different credential pbdf.nijmegen.personalData)
    // "initials": "",
    // "firstnames": "",
    // "prefix": "",
    // "familyname": "",
    // "fullname": "",
    // "gender": "",
    // "nationality": "", (Ja/Nee. Dutch nationality?)
    // "surname": "",
    // "dateofbirth": "",
    // "cityofbirth": "",
    // "countryofbirth": "",
    // "over12": "",
    // "over16": "",
    // "over18": "",
    // "over21": "",
    // "over65": "",
    // "bsn": "",
    // "digidlevel": ""
    if (
      response.status == ResponseStatus.success &&
      response.connector == 'irma'
    ) {
      setSsiData((s) => ({
        ...s,
        response: {
          nationality: response.data.nationality == 'Ja' ? 'Nederlandse' : '-',
          firstName: response.data.firstnames as string,
          lastName: response.data.familyname as string,
          birthDate: response.data.dateofbirth as string,
          birthPlace: response.data.cityofbirth as string,
          gender: response.data.gender as string,
          length: '-',
          bsn: response.data.bsn as string,
          documentNumber: '-',
          documentDateOfIssue: '-',
          documentValidUntil: '-',
        },
        success: true,
      }));

      return;
    }

    if (response.status == ResponseStatus.success) {
      setSsiData((s) => ({
        ...s,
        response: response.data as any,
        success: true,
      }));
    }
  }, []);

  return (
    <LayoutManKracht hideUserInfo>
      <Row style={{ marginTop: 50, marginBottom: 50 }}>
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

          {ssiData.success == false && (
            <>
              <h3 style={{ textAlign: 'center' }}>Controle identiteit</h3>

              <Column gap={30}>
                <Row className={styles.step} gap={20} centerY>
                  <Column gap={5}>
                    <p>
                      Bevestig heel simpel via één van de wallet apps op je
                      mobiele telefoon.
                    </p>
                    <p>
                      We vragen alleen de gegevens op die nodig zijn om je
                      identiteit te bevestigen.
                    </p>
                  </Column>

                  <Button tabIndex={0} onTrigger={verify}>
                    Controleer identiteit
                  </Button>
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
              </Column>
            </>
          )}

          {ssiData.success == true && (
            <>
              <Row className={styles.success} centerY>
                <img src="/img/success_check.svg" />
                <span>Controle identiteit geslaagd</span>
              </Row>

              <p>
                Bedankt {ssiData.response.firstName}, we hebben je
                identiteitsgegevens succesvol ontvangen.
              </p>

              <Row>
                <table className={styles.table}>
                  <tbody>
                    {disclosurePassportKeys.map((row) => (
                      <tr key={row.key}>
                        <th>{row.label}</th>
                        <td>{ssiData.response[row.key]}</td>
                      </tr>
                    ))}
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
