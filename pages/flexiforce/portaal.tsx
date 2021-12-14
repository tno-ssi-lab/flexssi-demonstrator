import styles from './portaal.module.scss';

import { NextPage } from 'next';
import { Column } from 'components/util/Column';
import { LayoutFlexiForce } from 'components/flexiforce/LayoutFlexiForce';
import {
  createCallbackUrl,
  createSSIClient,
  ResponseStatus,
} from 'util/SSIClient';
import { useEffect, useState } from 'react';
import { phaseInfoKeys } from 'model/PhaseInfo';

const client = createSSIClient();

const HomePage: NextPage = () => {
  function verify() {
    const url = client.verifyUrl(
      'ssi_phase_info_v1',
      Date.now() + '',
      createCallbackUrl()
    );
    document.location = url;
  }

  // Check if we got JWT token from eassi callback
  const [ssiData, setSsiData] = useState({
    success: false,
    response: {
      currentPhase: '',
      weekNumber: '',
      numberContracts: '',
      weeklyHours: '',
      totalHours: '',
      currentIsOnCallWorker: '',
      currentEmployer: '',
      currentWeeklyHours: '',
    },
  });
  useEffect(() => {
    const token = new URL(document.location.toString()).searchParams.get(
      'token'
    );
    if (!token) return;

    const response = client.parseVerifyResponse(token);

    if (response.status == ResponseStatus.success) {
      setSsiData((s) => ({
        ...s,
        response: response.data as any,
        success: true,
      }));
    }
  }, []);

  return (
    <LayoutFlexiForce>
      <Column gap={30} className={styles.content}>
        <Column gap={0}>
          <h1>Mijn FlexiForce portaal</h1>

          <h4 className={styles.sub}>
            Je gegevens zoals ze bij ons bekend zijn
          </h4>
        </Column>

        <Column>
          <h5>Persoonsgegevens</h5>

          <table>
            <tbody>
              <tr>
                <th>Voornaam</th>
                <td>Ahmed</td>
              </tr>

              <tr>
                <th>Achternaam</th>
                <td>Mehadi</td>
              </tr>

              <tr>
                <th>Geboortedatum</th>
                <td>11 dec. 1985</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>a.mehadi@gmail.com</td>
              </tr>

              <tr>
                <th>Telefoon</th>
                <td>06 457 23 823</td>
              </tr>
            </tbody>
          </table>
        </Column>

        {ssiData.success == false && (
          <Column>
            <h5>Fase</h5>

            <div className={styles.sub}>Nog geen fasegegevens</div>

            <a href="#" onClick={verify}>
              Fasegegevens importeren
            </a>
          </Column>
        )}

        {ssiData.success == true && (
          <Column>
            <h5>Fase</h5>

            <table>
              <tbody>
                {phaseInfoKeys.map((row) => (
                  <tr key={row.key}>
                    <th>{row.label}</th>
                    <td>{ssiData.response[row.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <a href="#" onClick={verify}>
              Opnieuw importeren
            </a>
          </Column>
        )}
      </Column>
    </LayoutFlexiForce>
  );
};

export default HomePage;
