<?php

error_reporting(1);
ini_set('display_errors', 1);

$lead_id = isset($_GET['encId']) ? $_GET['encId'] : null;
$apiStatusId = 0;
$apiError = "";
$apiRequestData = array();
//$successUrl = "https://enach.suryaloan.com/success.php";
//$successUrl = "https://suryaloan.co.in/api/index.php/Api/CallBacks/ICICIeNachController/eMandate_callback";   //uat.Working
$successUrl = "https://api.crmpaisa.com/Api/CallBacks/ICICIeNachController/eMandate_callback";                     //Live

$algo = "sha512";
$merchantId = "";
$consumerId = "";
$constomerMobileNo = "";
$customerEmailId = "";
$transactionId = "";
$payableAmount = 0;
$debitStartDate = "";
$debitEndDate = "";
$maxAmount = 0;
$amountType = "M";
$frequency = "MNTH";
$token = "";
$hardcode_response = "";

//echo $successUrl; die;

try {
    if (empty($lead_id)) {
        throw new Exception("Missing e-Mandate ID");
    }

    //$apiUrl = "https://suryaloan.co.in/api/index.php/Api/CallBacks/ICICIeNachController/eMandate";    //need to change for production
    $apiUrl = "https://api.crmpaisa.com/Api/CallBacks/ICICIeNachController/eMandate";     //live

    $apiHeader = array(
        'Content-Type: application/json',
        'Auth: Y2M0Nzk0OGYwNmQyMjdmZTlhY2E1ZWQ1Nzk5YTZmMWE=',
    );

    $apiRequestData = array(
        'enc_id' => $lead_id,
    );

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,

        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,

        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($apiRequestData),
        CURLOPT_HTTPHEADER => $apiHeader,
    ));

    $apiResponseJson = curl_exec($curl);
   
 
    $apiResponseJson = preg_replace("!\s+!", " ", $apiResponseJson);
    $apiResponseDateTime = date("Y-m-d H:i:s");

    if (!$hardcode_response && curl_errno($curl)) { // CURL Error
        $curlError = curl_error($curl);
        curl_close($curl);
        throw new RuntimeException("Something went wrong. Please try after sometimes.[0]");
    } else {
        if (isset($curl)) {
            curl_close($curl);
        }

        $apiResponseData = json_decode($apiResponseJson, true);

        if (!empty($apiResponseData) && $apiResponseData['Status'] == 1) {

            $apiResponseData = $apiResponseData['data'];
            $merchantId = $apiResponseData['merchantId'];
            $consumerId = $apiResponseData['consumerId'];
            $constomerMobileNo = $apiResponseData['mobile'];
            $customerEmailId = $apiResponseData['email'];
            $transactionId = $apiResponseData['txnId'];
            $payableAmount = $apiResponseData['repayment_amount'];
            //$payableAmount = 1;
            $maxAmount = $apiResponseData['maxAmount'];
            $debitStartDate = $apiResponseData['debitStartDate'];
            $debitEndDate = $apiResponseData['debitEndDate'];
            $apiStatusId = 1; // Success
        } elseif(isset($apiResponseData['Message']))    {
            throw new Exception($apiResponseData['Message']);
        } else {
            throw new RuntimeException("Something went wrong. Please try after sometimes.[1]");
        }
    }
} catch (RuntimeException $e) {
    $apiError =  $e->getMessage();
    $apiStatusId = 2; // Failure
} catch (Exception $e) {
    $apiError =  $e->getMessage();
    $apiStatusId = 3; // Failure
}

//echo "test"; die;

//* Hardcoded response for testing purposes --start*//
    // $merchantId = "L1110353";                //Live-  //uatmerchantId-(T1094585)
    // $transactionId = "TXN1175811601";          //Unique merchant transaction ID
    // $payableAmount = 1;
    // $consumerId = "1175811601";                //Your unique consumer identifier to register a eMandate/eNACH
    // $constomerMobileNo = 9872305680;
    // $customerEmailId = "pradeep@salaryontime.com";
    // $debitStartDate = "14-11-2025";
    // $debitEndDate = "30-12-2025";
    // $maxAmount = 100;
    // $amountType = "M";
    // $frequency = "MNTH";
    // $apiStatusId = 1;                //Success
    // $SALT = "3257578904QPGVII";       //Live
    // //$successUrl = "https://enach.emergencypaisa.com/success.php";
    // $successUrl = "https://api.crmpaisa.com/Api/CallBacks/ICICIeNachController/eMandate_callback";
    // $algo = "sha512";
    // $amountType = "M";
    // $frequency = "MNTH";
//* Hardcoded response for testing purposes --end*//

//$data = "T1055993|TXN1197581110|1||c964634|9872305680|pradeep@salaryontime.com|12-12-2024|12-12-2025|10|M|MNTH|||||6758089220PTIMPJ";
//$data = "T123456|TXN1140|4||c12345|9999999999|test@gmail.com|30-03-2022|31-07-2022|100|M|MNTH|||||504352123456MKDBB";

//echo "test11111111111"; die;


$merchantId = "L1110353";        //live
$SALT = "3257578904QPGVII";      //live
//echo $merchantId;
//echo $SALT;         die;

$hash_string = "$merchantId|$transactionId|$payableAmount||$consumerId|$constomerMobileNo|$customerEmailId|$debitStartDate|$debitEndDate|$maxAmount|$amountType|$frequency|||||$SALT";

$apiStatusId = 1;
if ($apiStatusId == 1) {
    $token = hash($algo, $hash_string);
     //echo $hash_string."<br>";
     //echo $token;
} else {
    ob_start();
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invalid URL</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f4f4f4;
            }

            .container {
                text-align: center;
                padding: 20px;
                border: 2px solid #ff0000;
                border-radius: 10px;
                background-color: #fff;
            }

            h1 {
                color: #ff0000;
            }

            p {
                color: #333;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <h1>Error!!!</h1>
            <p>Error : <?= $apiError ?></p>
        </div>
    </body>

    </html>
<?php
    echo ob_get_clean();
    exit;
}

?>

<!doctype html>
<html>

<head>
    <title>e-Mandate | Request</title>
    <meta name="viewport" content="width=device-width" />
    <script src="https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js" type="text/javascript"></script>
</head>

<body>

    <script type="text/javascript" src="https://www.paynimo.com/Paynimocheckout/server/lib/checkout.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            function handleResponse(res) {
                if (typeof res != 'undefined' && typeof res.paymentMethod != 'undefined' && typeof res.paymentMethod.paymentTransaction != 'undefined' && typeof res.paymentMethod.paymentTransaction.statusCode != 'undefined' && res.paymentMethod.paymentTransaction.statusCode == '0300') {
                    alert("success");
                    return false;
                    // success code
                } else {
                    alert("Error");
                    return false;
                    // error code
                }
            };

            var configJson = {
                'tarCall': false,
                'features': {
                    'showPGResponseMsg': true,
                    'enableNewWindowFlow': true,
                    "enableExpressPay": true,
                    "siDetailsAtMerchantEnd": true,
                    "enableSI": true,
                    'redirectOnClose': false
                },
                'consumerData': {
                    'deviceId': 'WEBSH2', //possible values 'WEBSH1', 'WEBSH2' and 'WEBMD5'
                    'token': '<?= $token; ?>',
                    'returnUrl': '<?= $successUrl; ?>',
                    'responseHandler': handleResponse,
                    'paymentMode': 'all',
                    'merchantLogoUrl': 'https://enach.emergencypaisa.com/img/ep-logo.png',
                    'merchantId': '<?= $merchantId; ?>',
                    'consumerId': '<?= $consumerId; ?>',          //Your unique consumer identifier to register a eMandate/eNACH
                    'consumerMobileNo': '<?= $constomerMobileNo; ?>',
                    'consumerEmailId': '<?= $customerEmailId; ?>',
                    'txnId': '<?= $transactionId; ?>',             //Unique merchant transaction ID
                    'items': [{
                        'itemId': 'first',
                        'amount': '<?= $payableAmount; ?>',
                        'comAmt': '0'
                    }],
                    "customStyle": {
                        "PRIMARY_COLOR_CODE": "#3977b7",
                        "SECONDARY_COLOR_CODE": "#FFFFFF",
                        "BUTTON_COLOR_CODE_1": "#1969bb",
                        "BUTTON_COLOR_CODE_2": "#FFFFFF"
                    },
                    "debitStartDate": '<?= $debitStartDate; ?>',
                    "debitEndDate": '<?= $debitEndDate; ?>',
                    "maxAmount": '<?= $maxAmount; ?>',
                    "amountType": '<?= $amountType; ?>',
                    "frequency": '<?= $frequency; ?>'       //Available options DAIL, WEEK, MNTH, QURT, MIAN, YEAR, BIMN and ADHO
                }
            };

            $.pnCheckout(configJson);
            if (configJson.features.enableNewWindowFlow) {
                pnCheckoutShared.openNewWindow();
            }

        });
    </script>
</body>

</html>