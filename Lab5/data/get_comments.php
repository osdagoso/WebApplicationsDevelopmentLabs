<?php
	ini_set('display_errors', 1); 
	ini_set('log_errors', 1); 
	error_reporting(E_ALL);
	header('Accept: application/json');
	
	$servername = 'localhost';
	$username = 'root';
	$password = 'root';
	$port = 3308;
	$dbname = 'OscarGonzalez';
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	if ($conn->connect_error) {
		header("HTTP/1.1 500 Bad connection, portal down");
		die("The server is down, we couldn't stablish the data base connection.");
	} else {
		$sql = "SELECT U.fname, U.lname, C.message, U.email 
				FROM Comments C, Users U
				WHERE C.username = U.username";
	
		$result = $conn->query($sql);
		$response = '';
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				$response = $response . '<li><p><img src="img/user.jpg" align="left" class="comment_img">';
				$response = $response . '<span class="comment_name">' . $row["fname"] . " " . $row["lname"] . '</span> <span class="comment_email">&lt';
				$response = $response . $row["email"] . "&gt</span><br>";
				$response = $response . $row["message"] . "</p></li>";
			}
			echo json_encode($response);
		}
		else {
			header("HTTP/1.1 406 Incorrect user and password combination.");
			die("Wrong credentials provided.");
		}
	}
?>