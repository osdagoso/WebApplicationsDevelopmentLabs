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
	
	function dbGetUserInfo($uName) {
		$connection = connectToDB();
		
		if ($connection != null) {
			$sql = "SELECT * 
					FROM Users 
					WHERE username = '$uName'";
		
			$resultDB = $connection->query($sql);

			if ($resultDB->num_rows > 0){
				while ($row = $resultDB->fetch_assoc())
					$response = array("firstname"=>$row["fname"], "lastname"=>$row["lname"], "email"=>$row["email"], "pass"=>$row["pass"], "status"=>"SUCCESS");
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
	
	function dbGetOrders($uName) {
		$connection = connectToDB();
		
		if ($connection != null) {
			$sql = "SELECT *
					FROM Orders
					WHERE username = '$uName'";
			
			$resultDB = $connection->query($sql);
			$orders = [];
			
			if ($resultDB->num_rows > 0) {
				while ($row = $resultDB->fetch_assoc()) {
					$orderid = $row["id"];
					$order["id"] = $orderid;
					$order["date"] = $row["orderdate"];
					$order["burger"] = $row["burger"];
					$order["bread"] = $row["bread"];
					$order["bgsize"] = $row["bgsize"];
					$order["fries"] = $row["fries"];
					$order["quantity"] = $row["quantity"];
					
					$order["conds"] = [];
					$sql = "SELECT condiment
							FROM CondimentsOrders
							WHERE orderid = '$orderid'";
					$resultDB2 = $connection->query($sql);
					if ($resultDB2->num_rows > 0) {
						while ($cond = $resultDB2->fetch_assoc()) {
							$order["conds"][] = $cond["condiment"];
						}
					}
					$order["tops"] = [];
					$sql = "SELECT *
							FROM ToppingsOrders
							WHERE orderid = '$orderid'";
					$resultDB2 = $connection->query($sql);
					if ($resultDB2->num_rows > 0) {
						while ($top = $resultDB2->fetch_assoc()) {
							$order["tops"][] = $top["topping"];
						}
					}
					
					$order["sauces"] = [];
					$sql = "SELECT sauce
							FROM SaucesOrders
							WHERE orderid = '$orderid'";
					$resultDB2 = $connection->query($sql);
					if ($resultDB2->num_rows > 0) {
						while ($sauce = $resultDB2->fetch_assoc()) {
							$order["sauces"][] = $sauce["sauce"];
						}
					}
					
					$orders[] = $order;
				}
				return array("orders"=>$orders, "status"=>"SUCCESS");
			} else
				return array("status" => "415");
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
	
	function dbSaveOrder($uName, $uBurger, $uBread, $uSize, $uConds, $uTops, $uSauces, $uFries, $uCant) {
		$connection = connectToDB();
		
		if ($connection != null) {
			$date = date("Y-m-d");
			$sql = "INSERT INTO Orders (username, orderdate, burger, bread, bgsize, fries, quantity)
					VALUES ('$uName', '$date', '$uBurger', '$uBread', '$uSize', '$uFries', '$uCant')";
		
			$resultDB = $connection->query($sql);
			if ($resultDB) {
				$orderid = mysqli_insert_id($connection);
				// Conds
				foreach($uConds as $cond) {
					$sql = "INSERT INTO CondimentsOrders 
						VALUES ('$orderid', '$cond')";
			
					$resultDB = $connection->query($sql);
					if (!$resultDB)
						return array("status" => "414");
				}
				//Tops
				foreach($uTops as $top) {
					$sql = "INSERT INTO ToppingsOrders 
						VALUES ('$orderid', '$top')";
			
					$resultDB = $connection->query($sql);
					if (!$resultDB)
						return array("status" => "414");
				}
				//Sauces
				foreach($uSauces as $sauce) {
					$sql = "INSERT INTO SaucesOrders 
						VALUES ('$orderid', '$sauce')";
			
					$resultDB = $connection->query($sql);
					if (!$resultDB)
						return array("status" => "414");
				}
				return array("status"=>"SUCCESS");
				
			} else
				return array("status" => "414");
		} else
			return array("status" => "500");
	}

?>