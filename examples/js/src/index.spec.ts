import SSIClient, { SSIClientOptions } from "../src/index";
import { sign } from "jsonwebtoken";

const ID = "my";
const SECRET = "secret";

function newClient(
  options: SSIClientOptions = { callbackUrl: "http://localhost?response=" }
) {
  return new SSIClient(ID, SECRET, options);
}

test("It instantiates with an id and a secret", () => {
  newClient();
});

test("It instantiates with the url option", () => {
  newClient({
    url: "http://localhost",
  });
});

test("It instantiates with the name option", () => {
  newClient({
    name: "other-provider",
  });
});

test("It instantiates without extra options", () => {
  new SSIClient(ID, SECRET);
});

test("It constructs a verify request url", () => {
  const client = newClient();
  const url = client.verifyUrl("MyType", "12345");
  expect(url).toBeDefined();
  expect(url).toMatch(/verify\//);
});

test("It constructs an issue request url", () => {
  const client = newClient();
  const url = client.issueUrl("MyType", { my: "data" }, "12345");
  expect(url).toBeDefined();
  expect(url).toMatch(/issue\//);
});

test("It handles issue responses", () => {
  const client = newClient();
  const payload = {
    type: "MyType",
    requestId: "12345",
    connector: "jolocom",
    status: "success",
  };

  const token = sign(payload, SECRET, {
    issuer: "ssi-service-provider",
    audience: ID,
    subject: "credential-issue-response",
  });

  const response = client.parseIssueResponse(token);

  expect(response).toMatchObject(payload);
});

test("It handles missing callback parameters", () => {
  const client = newClient({});
  expect(() => client.issueUrl("MyType", { my: "data" }, "12345")).toThrow();
});

test("It accepts callback urls per request", () => {
  const client = newClient({});
  const url = client.issueUrl(
    "MyType",
    { my: "data" },
    "12345",
    "myCallback?token="
  );
  expect(url).toBeDefined();
  expect(url).toMatch(/issue\//);
});

test("It handles malformed issue responses", () => {
  const client = newClient();
  const payload = { some: "body" };

  const token = sign(payload, SECRET, {
    issuer: "ssi-service-provider",
    audience: ID,
    subject: "wrong-subject",
  });

  expect(() => client.parseIssueResponse(token)).toThrow();
});

test("It handles verify responses", () => {
  const client = newClient();
  const payload = {
    type: "MyType",
    requestId: "12345",
    connector: "jolocom",
    status: "success",
    data: {
      my: "Data",
    },
  };

  const token = sign(payload, SECRET, {
    issuer: "ssi-service-provider",
    audience: ID,
    subject: "credential-verify-response",
  });

  const response = client.parseVerifyResponse(token);

  expect(response).toMatchObject(payload);
});

test("It handles malformed verify responses", () => {
  const client = newClient();
  const payload = { some: "body" };

  const token = sign(payload, SECRET, {
    issuer: "ssi-service-provider",
    audience: ID,
    subject: "wrong-subject",
  });

  expect(() => client.parseVerifyResponse(token)).toThrow();
});
