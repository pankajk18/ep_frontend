<?php
// Extract 'lead_id' from the URL and store it in a variable
$lead_id = isset($_GET['encId']) ? $_GET['encId'] : null;
echo "Lead ID: " . $lead_id;   //die;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" cont  ent="width=device-width, initial-scale=1.0">
    <title>eNach | E-Paisa Processing…</title>
    <link rel="icon" href="https://enach.emergencypaisa.com/img/favicon.png" type="image/png">
    
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-image: url('https://enach.emergencypaisa.com/img/bgr.jpg'); /* Replace with your image URL */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        a {
            text-decoration: none;
            color: white;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 18px;
            transition: background-color 0.3s;
        }
        a:hover {
            background-color: rgba(255, 255, 255, 0.7);
            color: black;
        }
        img {
            max-width: 400px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <!--<img src="https://enach.salaryontime.com/img/company-logo-md.png" alt="Company Logo">-->
    <img src="https://enach.emergencypaisa.com/img/ep-logo.png" alt="Company Logo">
    <a href="https://enach.emergencypaisa.com/enach.php?encId=<?= $lead_id ?>" target="_blank">E-Mandate Verification Link</a>
</body>
</html>






