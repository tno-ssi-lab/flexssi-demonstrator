import styles from './issue_passport.module.scss';

import { SystemLayout } from 'components/system/SystemLayout';
import { SystemMenu } from 'components/system/SystemMenu';
import { Column } from 'components/util/Column';
import { Row } from 'components/util/Row';
import { NextPage } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import {
  createCallbackUrl,
  createSSIClient,
  ResponseStatus,
} from 'util/SSIClient';
import Link from 'next/link';
import { passportCredType, passportKeys } from 'model/Passport';

const client = createSSIClient();

const IssuePassport: NextPage = () => {
  const [formData, setFormData] = useState({
    nationality: 'Nederlandse',
    firstName: 'Bert',
    lastName: 'Heuvel',
    birthDate: '01-01-1980',
    birthPlace: 'Amsterdam',
    gender: 'Male',
    length: '1.80 m',
    bsn: '012345678',
    documentNumber: 'AA0123456',
    documentDateOfIssue: '01-01-2020',
    documentValidUntil: '01-01-2025',
  });
  const submit = (e: FormEvent) => {
    e.preventDefault();

    const url = client.issueUrl(
      passportCredType,
      formData,
      Date.now() + '',
      createCallbackUrl()
    );

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
      setSsiData((s) => ({
        ...s,
        connector: response.connector,
        success: true,
      }));
    }
  }, []);

  return (
    <SystemLayout>
      <SystemMenu />

      {ssiData.success == false && (
        <Column style={{ padding: 20 }} gap={30}>
          <h1>Stuur je (voorbeeld) paspoort gegevens naar wallet</h1>

          <p>
            In de toekomst zal je paspoortgegevens vanuit de overheid in je
            wallet ontvangen, maar voor dit prototype kun je deze zelf erin
            zetten.
          </p>

          <Column className={styles.alert}>
            <p>
              Installeer eerst de <b>Trinsic Wallet</b> vanuit de app store.
            </p>
            <p>
              Ga dan naar de instellingen, en verander <b>Network</b> naar{' '}
              <b>Sovrin Staging Network</b>.
            </p>
          </Column>

          <form className={styles.form} onSubmit={submit}>
            <Column>
              {passportKeys.map((row) => (
                <Row centerY key={row.key}>
                  <label>{row.label}</label>
                  <input
                    type="text"
                    value={formData[row.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [row.key]: e.target.value })
                    }
                  />
                </Row>
              ))}

              <Row centerY>
                <label> </label>
                <button>Stuur naar mijn wallet</button>
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
