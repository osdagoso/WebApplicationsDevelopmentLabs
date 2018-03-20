<?php
	function connectToDB() {
		$servername = 'localhost';
		$username = 'root';
		$password = 'root';
		$dbname = 'OscarGonzalez';
		$conn = new mysqli($servername, $username, $password, $dbname);
		
		if ($conn->connect_error)
			return null;
		else
			return $conn;
	}
	
	function dbLogin($uName, $uPassword) {
		$connection = connectToDB();
		
		if ($connection != null) {
			$sql = "SELECT * 
					FROM Users 
					WHERE username = '$uName' AND pass = '$uPassword'";
		
			$resultDB = $connection->query($sql);

			if ($resultDB->num_rows > 0){
				while ($row = $resultDB->fetch_assoc())
					$response = array("firstname"=>$row["fname"], "lastname"=>$row["lname"], "email"=>$row["email"], "status"=>"SUCCESS");
				return $response;
			} else
				return array("status" => "406");
		} else
			return array("status" => "500");
	}
	
	function dbRegister($uName, $uPassword, $uEmail, $uFName, $uLName) {
		$connection = connectToDB();
		
		if ($connection != null) {
			$sql = "INSERT INTO Users
					VALUES ('$uName', '$uFName', '$uLName', '$uEmail', '$uPassword')";
		
			$resultDB = $connection->query($sql);

			if ($resultDB)
				return array("status"=>"SUCCESS");
			else
				return array("status" => "407");
		} else
			return array("status" => "500");
	}
	
	function dbGetComments() {
		$connection = connectToDB();
		
		if ($connection != null) {
			$sql = "SELECT U.fname, U.lname, C.message, U.email 
					FROM Comments C, Users U
					WHERE C.username = U.username";
		
			$resultDB = $connection->query($sql);
			$response = '';
			
			if ($resultDB->num_rows > 0) {
				while ($row = $resultDB->fetch_assoc()) {
					$response = $response . '<li><p><img src="img/user.jpg" align="left" class="comment_img">';
					$response = $response . '<span class="comment_name">' . $row["fname"] . " " . $row["lname"] . '</span> <span class="comment_email">&lt';
					$response = $response . $row["email"] . "&gt</span><br>";
					$response = $response . $row["message"] . "</p></li>";
				}
				return array("comments"=>$response, "status"=>"SUCCESS");
			} else
				return array("status" => "410");
		} else
			return array("status" => "500");
	}
	
	function dbSaveComment($uName, $uMessage) {
		$connection = connectToDB();
		
		if ($connection != null) {
			$sql = "INSERT INTO Comments (message, username)
					VALUES ('$uMessage', '$uName')";
		
			$resultDB = $connection->query($sql);
			
			if ($resultDB)
				return array("status"=>"SUCCESS");
			else
				return array("status" => "411");
		} else
			return array("status" => "500");
	}

?>