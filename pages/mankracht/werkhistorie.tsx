import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Button } from 'components/mankracht/Button';
import { LayoutManKracht } from 'components/mankracht/LayoutManKracht';
import { Column } from 'components/util/Column';
import { Row } from 'components/util/Row';
import { Spacer } from 'components/util/Spacer';
import { createSSIClient, ResponseStatus, SSIClient } from 'util/SSIClient';
import styles from './werkhistorie.module.scss';

const client = createSSIClient();

const WorkHistory: NextPage = () => {
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

  // Allow opening table row
  const [openRow, setOpenRow] = useState(0);
  const toggleRow = (i: number) => {
    if (i == openRow) {
      setOpenRow(0);
    } else {
      setOpenRow(i);
    }
  };

  return (
    <LayoutManKracht>
      <Row style={{ marginTop: 50 }}>
        <Column className={styles.left}>
          <img src="/img/saly.png" />
        </Column>

        <Spacer />

        <Column gap={20} style={{ maxWidth: 800 }}>
          <Row className={styles.stats} gap={50}>
            <Column className={styles.stat}>
              <label>Totaal</label>
              <span>1.120 uur</span>
              <Button outlined>Stuur naar mijn wallet</Button>
              <label className={styles.small}>
                Laatst gestuurd op ma. 3 mei 2021
              </label>
            </Column>

            <Column className={styles.stat}>
              <label>Huidige fase</label>
              <span>Fase B</span>
            </Column>

            <Column className={styles.stat}>
              <label>Aantal contracten</label>
              <span>2</span>
            </Column>
          </Row>

          <Row>
            <table className={styles.outer}>
              <thead>
                <tr>
                  <th></th>
                  <th className={styles.bold}>Contracten</th>
                  <th>Begindatum</th>
                  <th>Einddatum</th>
                  <th>Fase</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => toggleRow(1)}>
                  <td>
                    <i
                      className={`fas fa-caret-${
                        openRow == 1 ? 'down' : 'right'
                      }`}
                    ></i>
                  </td>
                  <td>Contract 1</td>
                  <td>23/11/2020</td>
                  <td>30/06/2021</td>
                  <td>A</td>
                </tr>

                {openRow == 1 &&
                  renderInner('Papierhandel van Scheursen', '10 uur per week')}

                <tr onClick={() => toggleRow(2)}>
                  <td>
                    <i
                      className={`fas fa-caret-${
                        openRow == 2 ? 'down' : 'right'
                      }`}
                    ></i>
                  </td>
                  <td>Contract 2 (lopende plaatsing)</td>
                  <td>01/07/2021</td>
                  <td>03/10/2021</td>
                  <td>B</td>
                </tr>

                {openRow == 2 &&
                  renderInner(
                    'WC Eend BV Kantoor Amsterdam',
                    '24 uur per week'
                  )}
              </tbody>
            </table>
          </Row>
        </Column>
      </Row>
    </LayoutManKracht>
  );
};

function renderInner(opdrachtgever: string, uren: string) {
  return (
    <tr>
      <td colSpan={6}>
        <table className={styles.inner}>
          <tbody>
            <tr>
              <th>Oproepkracht</th>
              <td>Nee</td>
            </tr>

            <tr>
              <th>Opdrachtgever</th>
              <td>{opdrachtgever}</td>
            </tr>

            <tr>
              <th>Plaatsingsuren</th>
              <td>{uren}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export default WorkHistory;
