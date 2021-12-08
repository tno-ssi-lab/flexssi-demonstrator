import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface SSIClientOptions {
  url?: string;
  name?: string;
  callbackUrl?: string;
}

export type SSIData = Record<string, string | number | boolean>;

export type SSIFunction = 'verify' | 'issue';

export enum ResponseStatus {
  success = 'success',
  error = 'error',
  cancelled = 'cancelled',
}

export interface CredentialResponse {
  requestId: string;
  type: string;
  status: ResponseStatus;
  connector: string;
}

export interface CredentialVerifyResponse<T = SSIData>
  extends CredentialResponse {
  data: T;
}

export type CredentialIssueResponse = CredentialResponse;

export class SSIClient {
  private url = 'https://service.ssi-lab.nl/';
  private name = 'ssi-service-provider';
  private callbackUrl?: string;

  constructor(
    private clientId: string,
    private clientSecret: string,
    options?: SSIClientOptions
  ) {
    if (!options) {
      return;
    }

    if (options.url) {
      this.url = options.url;
    }

    if (options.name) {
      this.name = options.name;
    }

    if (options.callbackUrl) {
      this.callbackUrl = options.callbackUrl;
    }
  }

  verifyUrl(type: string, requestId: string, callbackUrl?: string): string {
    const callback = this.getCallbackUrl(callbackUrl);

    const token = this.encodeJWT(
      { type, callbackUrl: callback },
      { subject: 'credential-verify-request', jwtid: requestId }
    );
    return this.constructRequestUrl('verify', token);
  }

  issueUrl(
    type: string,
    data: SSIData,
    requestId: string,
    callbackUrl?: string
  ): string {
    const callback = this.getCallbackUrl(callbackUrl);

    const token = this.encodeJWT(
      { type, data, callbackUrl: callback },
      { subject: 'credential-issue-request', jwtid: requestId }
    );
    return this.constructRequestUrl('issue', token);
  }

  parseVerifyResponse<T = SSIData>(token: string): CredentialVerifyResponse<T> {
    const response = this.decodeJWT(token, {
      subject: 'credential-verify-response',
    }) as any;
    return {
      type: response.type,
      data: response.data,
      status: response.status,
      connector: response.connector,
      requestId: response.requestId,
    };
  }

  parseIssueResponse(token: string): CredentialIssueResponse {
    const response = this.decodeJWT(token, {
      subject: 'credential-issue-response',
    }) as any;

    return {
      type: response.type,
      status: response.status,
      connector: response.connector,
      requestId: response.requestId,
    };
  }

  private getCallbackUrl(callbackUrl?: string) {
    const callback = callbackUrl || this.callbackUrl;

    if (!callback) {
      throw new Error(
        'Please specify a callback url either through the client instance or per request.'
      );
    }

    return callback;
  }

  private constructRequestUrl(endpoint: SSIFunction, token: string) {
    const url = new URL(`${endpoint}/${token}`, this.url);
    return url.toString();
  }

  private encodeJWT(
    payload: Record<string, unknown>,
    signOptions?: SignOptions
  ) {
    return sign(payload, this.clientSecret, {
      issuer: this.clientId,
      audience: this.name,
      ...signOptions,
    });
  }

  private decodeJWT(token: string, verifyOptions?: VerifyOptions) {
    // Payload cannot be a string due to the verify options passed.
    const payload = verify(token, this.clientSecret, {
      issuer: this.name,
      audience: this.clientId,
      ...verifyOptions,
    }) as Record<string, unknown>;

    return payload;
  }
}

export function createSSIClient() {
  const SSI_ID = '33bdc59a-1759-41f0-9cc5-6af5c9fc49ad';
  const SSI_SECRET =
    '505d9c058e0811b522b0d780a7cd50cbe6a29719ab981c02451eda1dcdc75ebb';
  return new SSIClient(SSI_ID, SSI_SECRET, {
    callbackUrl:
      typeof window != 'undefined' ? `${document.location}?token=` : '',
  });
}
