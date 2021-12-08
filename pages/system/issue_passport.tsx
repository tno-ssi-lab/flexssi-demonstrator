import styles from './issue_passport.module.scss';

import { SystemLayout } from 'components/system/SystemLayout';
import { SystemMenu } from 'components/system/SystemMenu';
import { Column } from 'components/util/Column';
import { Row } from 'components/util/Row';
import { NextPage } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import { createSSIClient, ResponseStatus } from 'util/SSIClient';
import { useSsiResponse } from 'hooks/useSsiResponse';
import Link from 'next/link';

const client = createSSIClient();

const IssuePassport: NextPage = () => {
  const [formData, setFormData] = useState({
    firstName: 'Bert',
    lastName: 'Heuvel',
  });
  const submit = (e: FormEvent) => {
    e.preventDefault();

    const url = client.issueUrl('SsiTest2', formData, '12345');

    document.location = url;
  };

  // Check if we got JWT token from eassi callback
  const [ssiData, setSsiData] = useState({
    success: false,
    connector: '',
  });
  useEffect(() => {
    const token = new URL(document.location.toString()).searchParams.get(
      'token'
    );
    if (!token) return;

    const response = client.parseIssueResponse(token);
    if (response.status == ResponseStatus.success) {
      setSsiData({ ...ssiData, connector: response.connector, success: true });
    }
  }, []);

  return (
    <SystemLayout>
      <SystemMenu />

      {ssiData.success == false && (
        <Column style={{ padding: 20 }} gap={30}>
          <h1>Stuur (voorbeeld) paspoort gegevens naar wallet</h1>

          <form className={styles.form} onSubmit={submit}>
            <Column>
              <Row centerY>
                <label>Voornaam</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </Row>

              <Row centerY>
                <label>Achternaam</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </Row>

              <Row centerY>
                <label> </label>
                <button>Verstuur</button>
              </Row>
            </Column>
          </form>
        </Column>
      )}

      {ssiData.success == true && (
        <Column gap={20} style={{ padding: 20 }}>
          <h1>Success</h1>
          <p>Paspoort gegevens opgeslagen in wallet</p>

          <Link href="/">
            <a>Terug naar overzicht</a>
          </Link>
        </Column>
      )}
    </SystemLayout>
  );
};

export default IssuePassport;
