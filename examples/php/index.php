<?php

require '../vendor/autoload.php';

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key;

$config = file_get_contents(dirname(__FILE__) . '/config.json');
$config_data = json_decode($config, true);

$callbackUrl = $config_data["HOSTNAME"]."/index.php?token=";
// $callbackUrl = "http://".rawurldecode($request->getUri()->getHost()).($request->getUri()->getPort() ? ":".$request->getUri()->getPort() : "")."/api/v1/ssif/credential-issue-response/{$credmdAtom}/{$credmdIfcId}?finalRedirect={$finalRedirect}&token=";


// Prepare
$credentialType = "DateOfBirthCredential_nounderscore";
$orgID = $config_data["SSI_SERVICE_MY_ORG_ID"];
$secretKey = new Key($config_data["SSI_SERVICE_SHARED_SECRET"]);

// Issue Request
$data = (object) array('dateofbirth' => "19891007");

$jti = bin2hex(random_bytes(12));
$jwt = (new Builder())
    ->identifiedBy($jti)
    ->issuedBy($orgID)
    ->permittedFor('ssi-service-provider')
    ->issuedAt(time())
    ->withClaim('sub', 'credential-issue-request')
    ->withClaim('type', $credentialType)
    ->withClaim('data', $data)
    ->withClaim('callbackUrl', $callbackUrl);
$signer = new Sha256();
$issuetoken = $jwt->getToken($signer, $secretKey);

// Verify Request
$jti = bin2hex(random_bytes(12));
$jwt = (new Builder())
    ->identifiedBy($jti)
    ->issuedBy($orgID)
    ->permittedFor('ssi-service-provider')
    ->issuedAt(time())
    ->withClaim('sub', 'credential-verify-request')
    ->withClaim('type', $credentialType)
    ->withClaim('predicates', (object) null)
    ->withClaim('callbackUrl', $callbackUrl);
$signer = new Sha256();
$verifytoken = $jwt->getToken($signer, $secretKey);

// Verify Request (ZKP)
$predicates = array(
    "old_enough" => array(
      "name" => "dateofbirth",
      "p_type" => "<=",
      "p_value" => 20010101
    )
);

$jti = bin2hex(random_bytes(12));
$jwt = (new Builder())
    ->identifiedBy($jti)
    ->issuedBy($orgID)
    ->permittedFor('ssi-service-provider')
    ->issuedAt(time())
    ->withClaim('sub', 'credential-verify-request')
    ->withClaim('type', $credentialType)
    ->withClaim('predicates', $predicates)
    ->withClaim('callbackUrl', $callbackUrl);
$signer = new Sha256();
$verifytoken_zkp = $jwt->getToken($signer, $secretKey);

// Issue or Verify Response
if(isset($_GET['token'])) {
    $responsetoken = (new Parser())->parse((string) htmlspecialchars($_GET['token'])); // Parses from a string
    
    $status = $responsetoken->getClaim('status');
    $sub = $responsetoken->getClaim('sub');
    
    if ($status == "success" && $sub == "credential-verify-response") {
        $data = $responsetoken->getClaim('data');
    }   
}

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
    <h2>Issue</h2>
    <a href="<?php echo $config_data["SSI_SERVICE_ENDPOINT"];?>/issue/<?php echo $issuetoken;?>">
        <button>Get Credential</button>
    </a>
    <?php if($sub == "credential-issue-response"):?>
        <h3>Issue Response</h3>
        <p>Status: <?php echo $status;?></p>
    <?php endif; ?>

    <h2>Verify</h2>
    <a href="<?php echo $config_data["SSI_SERVICE_ENDPOINT"];?>/verify/<?php echo $verifytoken;?>">
        <button>Share Credential</button>
    </a>
    <a href="<?php echo $config_data["SSI_SERVICE_ENDPOINT"];?>/verify/<?php echo $verifytoken_zkp;?>">
        <button>Share Zero Knowledge Proof</button>
    </a>
    <?php if($sub == "credential-verify-response"):?>
        <h3>Verify Response</h3>
        <p><strong>Status:</strong> <?php echo $status;?></p>
        <p><strong>Payload:</strong></br>
            <?php foreach ($data as $key => $val) {
                echo $key.": ".$val."</br>";
            }?>
        </p>
    <?php endif; ?>
</body>
</html>