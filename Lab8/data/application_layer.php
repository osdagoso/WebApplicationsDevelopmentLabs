<?php
	header('Content-type: application/json');
	header('Accept: application/json');
	
	$uService = $_POST["uService"];
	
	require_once "data_layer.php";
	
	switch($uService) {
		case 'CHECK_SESSION':
			validateSession();
			break;
		case 'GET_ORDERS':
			attemptLoadOrder();
			break;
		case 'GET_COMMENTS':
			attemptLoadComment();
			break;
		case 'SAVE_ORDER':
			attemptSaveOrder();
			break;
		case 'REMEMBER_ME':
			validateCookie();
			break;
		case 'LOGIN':
			attemptLogin();
			break;
		case 'LOGOUT':
			attemptLogout();
			break;
		case 'SAVE_COMMENT':
			attemptSaveComment();
			break;
		case 'REGISTER':
			attemptRegister();
			break;
		default:
			errorHandling('');
			break;
	}
	
	function validateSession() {
		session_start();
		if(isset($_SESSION["firstname"]) && isset($_SESSION["lastname"])) {
			$uFName = $_SESSION["firstname"];
			$uLName = $_SESSION["lastname"];
			
			$response = array("firstname"=>$uFName, "lastname"=>$uLName);
			echo json_encode($response);
		} else
			errorHandling('408');
	}
	
	function attemptLoadComment() {
		$result = dbGetComments();
		
		if ($result["status"] == "SUCCESS")
			echo json_encode($result["comments"]);
		else
			errorHandling($result["status"]);
	}
	
	function attemptLoadOrder() {
		session_start();
		if(isset($_SESSION["username"])) {
			$result = dbGetOrders($_SESSION["username"]);
		
			if ($result["status"] == "SUCCESS")
				echo json_encode($result);
			else
				errorHandling($result["status"]);
		} else
			errorHandling('408');
	}
	
	function validateCookie() {
		if (isset($_COOKIE["username"]))
			echo json_encode($_COOKIE['username']);
		else
			errorHandling('409');
	}
	
	function attemptLogin() {
		$uName = $_POST["uName"];
		$uRemember = $_POST["uRemember"];
		
		$result = dbGetUserInfo($uName);
		
		if ($result["status"] == "SUCCESS") {
			if (verifyPassword($result["pass"])) {
				if ($uRemember == "true")
					setcookie("username", $uName, time()+86400*20, "/", "", 0);
				session_start();
				$_SESSION["username"] = $uName;
				$_SESSION["firstname"] = $result["firstname"];
				$_SESSION["lastname"] = $result["lastname"];
				$_SESSION["email"] = $result["email"];
				echo json_encode($result);
			} else
				errorHandling('413');
		} else
			errorHandling($result["status"]);
	}
	
	function attemptLogout() {
		session_start();
		if(isset($_SESSION["username"]) && isset($_SESSION["firstname"]) && isset($_SESSION["email"]) && isset($_SESSION["lastname"])) {
			$uFName = $_SESSION["firstname"];
			$uLName = $_SESSION["lastname"];
			unset($_SESSION["username"], $_SESSION["firstname"], $_SESSION["lastname"], $_SESSION["email"]);
			session_destroy();
			
			$response = array("firstname"=>$uFName, "lastname"=>$uLName);
			echo json_encode($response);
		} else
			errorHandling('408');
	}
	
	function attemptSaveComment() {
		$uMessage = $_POST["uMessage"];
		
		session_start();
		if(isset($_SESSION["firstname"]) && isset($_SESSION["lastname"]) && isset($_SESSION["email"]) && isset($_SESSION["username"])) {
			$uFName = $_SESSION["firstname"];
			$uLName = $_SESSION["lastname"];
			$uEmail = $_SESSION["email"];
			$uName = $_SESSION["username"];
			
			$result = dbSaveComment($uName, $uMessage);
			
			if ($result["status"] == "SUCCESS") {
				echo json_encode('');
			} else
				errorHandling($result["status"]);
		} else
			errorHandling('408');
	}
	
	function attemptSaveOrder() {
		$uBurger = $_POST["uBurger"];
		$uBread = $_POST["uBread"];
		$uSize = $_POST["uSize"];
		$uConds = $_POST["uConds"];
		$uTops = $_POST["uTops"];
		$uSauces = $_POST["uSauces"];
		$uFries = $_POST["uFries"];
		$uCant = $_POST["uCant"];
		
		session_start();
		if(isset ($_SESSION["username"])) {
			$uName = $_SESSION["username"];
			
			$result = dbSaveOrder($uName, $uBurger, $uBread, $uSize, $uConds, $uTops, $uSauces, $uFries, $uCant);
			
			if ($result["status"] == "SUCCESS") {
				echo json_encode('');
			} else
				errorHandling($result["status"]);
		} else
			errorHandling('408');
	}
	
	function attemptRegister() {
		$uName = $_POST["uName"];
		$uFName = $_POST["uFName"];
		$uLName = $_POST["uLName"];
		$uEmail = $_POST["uEmail"];
		
		$uPassword = encryptPassword();
		
		$result = dbRegister($uName, $uPassword, $uEmail, $uFName, $uLName);
	
		if ($result["status"] == "SUCCESS") {
			session_start();
			$_SESSION["username"] = $uName;
			$_SESSION["firstname"] = $uFName;
			$_SESSION["lastname"] = $uLName;
			$_SESSION["email"] = $uEmail;
			echo json_encode($result);
		} else
			errorHandling($result["status"]);
	}
	
	function verifyPassword($uPassword) {
		$uPassword = decryptPassword($uPassword);
		
		return $uPassword === $_POST["uPassword"];
	}
	
	function decryptPassword($uPassword) {
		$key = pack('H*', "d8eed86a977f675b08d17aec3090f03036733c97d8a4d80eb07d8cfeca8aad17");
	    
	    $cipher = base64_decode($uPassword);
		
		// Split IV and cipher text
		$ivSize = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = substr($cipher, 0, $ivSize);
	    $cipher = substr($cipher, $ivSize);

	    $uPassword = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $cipher, MCRYPT_MODE_CBC, $iv);
	   	
	   	$count = 0;
	   	$uPassLength = strlen($uPassword);
		
		// Remove possible null characters
	    for ($i = $uPassLength - 1; $i >= 0; $i--)
	    	if (ord($uPassword{$i}) === 0)
				$count++;

	    $uPassword = substr($uPassword, 0,  $uPassLength - $count); 
	    return $uPassword;
	}
	
	function encryptPassword() {
		$uPassword = $_POST["uPassword"];
		
		// Key generated at https://www.random.org/bytes/
		$key = pack('H*', "d8eed86a977f675b08d17aec3090f03036733c97d8a4d80eb07d8cfeca8aad17");
	    $keySize =  strlen($key);
		
		// Random IV is created to work with CBC encoding
	    $ivSize = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = mcrypt_create_iv($ivSize, MCRYPT_RAND);
	    
		// Cipher text compatible with AES is created, then has IV added as "prefix"
	    $cipher = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $uPassword, MCRYPT_MODE_CBC, $iv);
	    $cipher = $iv . $cipher;
		
		$uPassword = base64_encode($cipher);
		
		return $uPassword;
	}
	
	function errorHandling($errorCode) {
		switch($errorCode) {
			case '500':
				header("HTTP/1.1 500 Bad connection, portal down");
				die("The server is down, we couldn't establish the data base connection.");
				break;
			case '406':
				header("HTTP/1.1 406 Login failure.");
				die("User not found.");
				break;
			case '407':
				header("HTTP/1.1 407 Account creation failure.");
				die("Database insertion unsuccessful.");
				break;
			case '408':
				session_destroy();
				header("HTTP/1.1 408 Session not found.");
				die("No active session.");
				break;
			case '409':
				header("HTTP/1.1 409 Cookie is not set.");
				die("Cookie is not set.");
				break;
			case '410':
				header("HTTP/1.1 410 Comment retrieval failure.");
				die("No comments were found.");
				break;
			case '411':
				header("HTTP/1.1 411 Comment creation failure.");
				die("Database insertion unsuccessful.");
				break;
			case '412':
				header("HTTP/1.1 412 Account creation failure.");
				die("Password encryption unsuccessful.");
				break;
			case '413':
				header("HTTP/1.1 413 Login failure.");
				die("Wrong credentials provided.");
				break;
			case '414':
				header("HTTP/1.1 414 Order creation failure.");
				die("Database insertion unsuccessful.");
				break;
			case '415':
				header("HTTP/1.1 415 Order retrieval failure.");
				die("No orders were found.");
				break;
			default:
				header("HTTP/1.1 500 Something went wrong");
				die("We don't know what :|");
				break;
		}
	}
?>