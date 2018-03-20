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
		$uMessage = $_POST["uMessage"];
		
		session_start();
		if(isset($_SESSION["firstname"]) && isset($_SESSION["lastname"]) && isset($_SESSION["email"]) && isset($_SESSION["username"])) {
			$uFName = $_SESSION["firstname"];
			$uLName = $_SESSION["lastname"];
			$uEmail = $_SESSION["email"];
			$uName = $_SESSION["username"];
			
			$sql = "INSERT INTO Comments (message, username)
					VALUES ('$uMessage', '$uName')";
			$result = $conn->query($sql);		
			
			if ($result) {
				$response = '<li><p><img src="img/user.jpg" align="left" class="comment_img"><span class="comment_name">';
				$response = $response . $uFName . " " . $uLName . '</span> <span class="comment_email">&lt' . $uEmail . "&gt</span><br>";
				$response = $response . $uMessage . "</p></li>";
				echo json_encode($response);
			} else {
				header("HTTP/1.1 406 Comment creation failure.");
				die("Database insertion unsuccessful.");
			}
		} else {
			session_destroy();
			header("HTTP/1.1 406 Session not found.");
			die("No active session.");
		}
	}

?>






