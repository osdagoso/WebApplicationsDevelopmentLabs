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
		$uRemember = $_POST["uRemember"];

		$sql = "SELECT * 
				FROM Users 
				WHERE username = '$uName' AND pass = '$uPassword'";
	
		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			while ($row = $result->fetch_assoc())
			{
				$response = array("firstname"=>$row["fname"], "lastname"=>$row["lname"]);
				if ($uRemember == "true") {
					setcookie("username", $uName, time()+86400*20, "/", "", 0);
				}
				session_start();
				$_SESSION["username"] = $uName;
				$_SESSION["firstname"] = $row["fname"];
				$_SESSION["lastname"] = $row["lname"];
				$_SESSION["email"] = $row["email"];
			}

			echo json_encode($response);
		}
		else
		{
			header("HTTP/1.1 406 Incorrect user and password combination.");
			die("Wrong credentials provided.");
		}
	}

?>






