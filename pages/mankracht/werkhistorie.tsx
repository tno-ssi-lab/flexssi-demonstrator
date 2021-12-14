import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Button } from 'components/mankracht/Button';
import { LayoutManKracht } from 'components/mankracht/LayoutManKracht';
import { Column } from 'components/util/Column';
import { Row } from 'components/util/Row';
import { Spacer } from 'components/util/Spacer';
import { createCallbackUrl, createSSIClient } from 'util/SSIClient';
import styles from './werkhistorie.module.scss';
import { format as dateFormat } from 'date-fns';

const client = createSSIClient();
const lastIssuedKey = 'phase_info_last_issued';

const WorkHistory: NextPage = () => {
  // Last issued at
  const [lastIssuedAt, setLastIssuedAt] = useState(
    new Date('2021-01-01').getTime()
  );
  useEffect(() => {
    const url = new URL(document.location.toString());
    const lsValue = localStorage.getItem(lastIssuedKey);

    if (url.searchParams.get('token') && lsValue) {
      setLastIssuedAt(parseInt(lsValue));
    }
  }, []);

  function issueCredential() {
    const url = client.issueUrl(
      'ssi_phase_info_v1',
      {
        currentPhase: 'Fase A',
        weekNumber: 'Week 39 2021',
        numberContracts: '2',
        weeklyHours: '32 uur per week',
        totalHours: 'totaal van 1120 uur',
        currentIsOnCallWorker: 'NEE',
        currentEmployer: 'WC Eend BV Kantoor Amsterdam',
        currentWeeklyHours: '24 uur per week',
      },
      `${Date.now()}`,
      createCallbackUrl()
    );

    const now = Date.now();
    setLastIssuedAt(now);
    localStorage.setItem(lastIssuedKey, `${now}`);

    document.location = url;
  }

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

              <Button outlined onClick={issueCredential}>
                Stuur naar mijn wallet
              </Button>

              <label className={styles.small}>
                Laatst gestuurd op {dateFormat(lastIssuedAt, 'd MMM yyyy')}
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
