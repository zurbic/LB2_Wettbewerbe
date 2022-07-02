<?php

echo "Vielen Dank für Ihre Teilnahme";
echo "<br/>";
echo $_POST["vorname"];
echo "<br/>";
echo $_POST["nachname"];
echo "<br/>";
echo $_POST["email"];
echo "<br/>";
echo $_POST["geschlecht"];
echo "<br/>";
echo $_POST["wunschdestination"];
echo "<br/>";
echo $_POST["ferieninput"];
echo "<br/>";
echo $_POST["foto"];
echo "<br/>";



// Validation

function checkvorname()
{
    $re = "/^([a-zA-Z ]){2,30}$/";
    if (preg_match($re, $_POST["vorname"])) {
        return true;
    }
    return false;
}

function checknachname()
{
    $re = "/^([a-zA-Z ]){2,30}$/";
    if (preg_match($re, $_POST["nachname"])) {
        return true;
    }
    return false;
}
function checkEmail()
{
    $re = "/^([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(" . +"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
    if (preg_match($re, $_POST["nachname"])) {
        return true;
    }
    return false;
}

function checkgeschlecht()
{

    if ($_POST["geschlecht"] != "wählen") {

        return true;
    }
    return false;
}
function checkdestination()
{

    if ($_POST["wunschdestination"] < 1) {
        return true;
    }
    return false;
}
function checkferientext()
{

    if ($_POST["ferieninput"] != "" ) {
        return true;
    }
    return false;
}

$servername = "localhost";
$username = "root";
$password = "";
$db = "wettbewerbteilnehmer";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

if (checkvorname() && checknachname() && checkgeschlecht() && checkdestination() && checkferientext()) {

    $sql = "SELECT * FROM `geschlecht` WHERE Geschlechtsart = '" . $_POST["geschlecht"] . "';";
    $result = $conn->query($sql);

    $geschlecht_id = "";

    if ($result->num_rows > 0) {
        // output data of each row

        $geschlecht_id = $result->fetch_assoc()["Geschlecht_ID"];
    } else {
        echo "0 results";
    }

    $sql = "SELECT * FROM `wunschdestination` WHERE Ort = '" . $_POST["wunschdestination"] . "';";
    $result = $conn->query($sql);

    $wunschdestination_id = "";

    if ($result->num_rows > 0) {
        // output data of each row

        $wunschdestination_id = $result->fetch_assoc()["Wunschdestination_ID"];
    } else {
        echo "0 results";
    }

    $stmt = $conn->prepare("INSERT INTO wettbewerbteilehmer  (`Name`, `Nachname`, `E-Mail`, `Geschlecht_FK`,`Wunschdestination_FK`, `Ferienverdient` ) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssiis", $_POST["vorname"], $_POST["nachname"], $_POST["email"], $geschlecht_id, $wunschdestination_id, $_POST["ferieninput"]);

    if ($stmt->execute() === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
