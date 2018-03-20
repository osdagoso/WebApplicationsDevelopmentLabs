<?php
	ini_set('display_errors', 1); 
	ini_set('log_errors', 1); 
	error_reporting(E_ALL);
	header('Content-type: application/json');
	header('Accept: application/json');
	
	$servername = 'localhost';
	$username = 'root';
	$password = 'root';
	$port = 3308;
	$dbname = 'OscarGonzalez';
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	if ($conn->connect_error)
	{
		header("HTTP/1.1 500 Bad connection, portal down");
		die("The server is down, we couldn't stablish the data base connection.");
	}
	else
	{
		$uName = $_POST["uName"];
		$uPassword = $_POST["uPassword"];
		$uFName = $_POST["uFName"];
		$uLName = $_POST["uLName"];
		$uEmail = $_POST["uEmail"];

		$sql = "SELECT * 
				FROM Users 
				WHERE username = '$uName'";
	
		$result = $conn->query($sql);

		if ($result->num_rows <= 0)
		{
			$sql = "INSERT INTO Users
					VALUES ('$uName', '$uFName', '$uLName', '$uEmail', '$uPassword')";
			$result = $conn->query($sql);		
			
			if ($result) {
				$response = array("firstname"=>$uFName, "lastname"=>$uLName);
				session_start();
				$_SESSION["username"] = $uName;
				$_SESSION["firstname"] = $uFName;
				$_SESSION["lastname"] = $uLName;
				$_SESSION["email"] = $uEmail;
				echo json_encode($response);
			} else {
				header("HTTP/1.1 406 Account creation failure.");
				die("Database insertion unsuccessful.");
			}
		}
		else
		{
			header("HTTP/1.1 406 Account creation failure2.");
			die("Unavailable username.");
		}
	}

?>






