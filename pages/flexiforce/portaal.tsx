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
  function retrievePhase() {
    const url = client.verifyUrl(
      'ssi_phase_info_v1',
      Date.now() + '',
      createCallbackUrl()
    );
    document.location = url;
  }

  const skillCredType = 'flexssi_skills_v2';
  function retrieveSkills() {
    const url = client.verifyUrl(
      skillCredType,
      Date.now() + '',
      createCallbackUrl()
    );
    document.location = url;
  }

  // Check if we got JWT token from eassi callback
  const [phaseData, setPhaseData] = useState({
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
  const [skillsData, setSkillsData] = useState({
    success: false,
    response: {},
  });

  useEffect(() => {
    const token = new URL(document.location.toString()).searchParams.get(
      'token'
    );
    if (!token) return;

    const response = client.parseVerifyResponse(token);

    if (response.status == ResponseStatus.success) {
      if (response.type == 'ssi_phase_info_v1') {
        setPhaseData((s) => ({
          ...s,
          response: response.data as any,
          success: true,
        }));
      }

      if (response.type == skillCredType) {
        setSkillsData((s) => ({
          ...s,
          response: response.data as any,
          success: true,
        }));
      }
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

        {phaseData.success == false && (
          <Column>
            <h5>Fase</h5>

            <div className={styles.sub}>Nog geen fasegegevens</div>

            <a href="#" onClick={retrievePhase}>
              Fasegegevens importeren
            </a>
          </Column>
        )}

        {phaseData.success == true && (
          <Column>
            <h5>Fase</h5>

            <table>
              <tbody>
                {phaseInfoKeys.map((row) => (
                  <tr key={row.key}>
                    <th>{row.label}</th>
                    <td>{phaseData.response[row.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <a href="#" onClick={retrievePhase}>
              Opnieuw importeren
            </a>
          </Column>
        )}

        {skillsData.success == false && (
          <Column>
            <h5>Skills</h5>

            <div className={styles.sub}>Nog geen skills</div>

            <a href="#" onClick={retrieveSkills}>
              Skills importeren
            </a>
          </Column>
        )}

        {skillsData.success == true && (
          <Column>
            <h5>Skills</h5>

            {Object.entries(skillsData.response).map(([key, value]) => (
              <p key={key}>
                <i
                  className={'fas fa-' + (isTrue(value) ? 'check' : 'times')}
                ></i>{' '}
                {key}
              </p>
            ))}

            <a href="#" onClick={retrieveSkills}>
              Opnieuw importeren
            </a>
          </Column>
        )}
      </Column>
    </LayoutFlexiForce>
  );
};

function isTrue(value: any): boolean {
  return value === 'true' || value === 'ja' || value === '1' || value === true;
}

export default HomePage;
