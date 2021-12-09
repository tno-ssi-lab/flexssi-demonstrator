import styles from './portaal.module.scss';

import { NextPage } from 'next';
import { Column } from 'components/util/Column';
import Link from 'next/link';
import { LayoutFlexiForce } from 'components/flexiforce/LayoutFlexiForce';

const HomePage: NextPage = () => {
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

        <Column>
          <h5>Fase</h5>

          <div className={styles.sub}>Nog geen fasegegevens</div>

          <a href="">Fasegegevens importeren</a>
        </Column>
      </Column>
    </LayoutFlexiForce>
  );
};

export default HomePage;
