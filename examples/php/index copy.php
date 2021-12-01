<?php

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key;

// $callbackUrl = "http://localhost/api/v1/ssif/credential-issue-response/";
$callbackUrl = "http://".rawurldecode($request->getUri()->getHost()).($request->getUri()->getPort() ? ":".$request->getUri()->getPort() : "")."/api/v1/ssif/credential-issue-response/{$credmdAtom}/{$credmdIfcId}?finalRedirect={$finalRedirect}&token=";
// $callbackUrl = rawurldecode($request->getQueryParam('callbackUrl', $request->getUri()->getHost()));

// Prepare
$resource = ResourceList::makeFromInterface($formAtom, $ifcId)->one($formAtom);
$jti = bin2hex(random_bytes(12));

// Get data, and recursively remove null values
$data = $resource->get(Options::INCLUDE_REF_IFCS);
$data = array_remove_null($data);

// JWT interface with SSI service
// See: https://ci.tno.nl/gitlab/ssi-lab/developer-docs/-/blob/master/jwt-descriptions/jwt-credential-issue-request.md
$jwt = (new Builder())
    ->identifiedBy($jti)
    ->issuedBy($request->getAttribute('ssiServiceOrgId')) // org id from group middleware
    ->permittedFor('ssi-service-provider')
    ->issuedAt(time())
    ->withClaim('sub', 'credential-issue-request')
    ->withClaim('type', $credentialType)
    ->withClaim('data', $data)
    ->withClaim('callbackUrl', $callbackUrl);
$signer = new Sha256();
$secretKey = new Key($request->getAttribute('ssiServiceSharedSecret')); // secret from group middleware
$token = $jwt->getToken($signer, $secretKey);

// 301 Redirect with jwt token to ssi issuing service
return $response->withRedirect("{$request->getAttribute('ssiServiceEndpoint')}/issue/{$token}"); // endpoint from group middleware

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>DEMO</h1>
    <?php echo 3+2; ?>
</body>
</html>