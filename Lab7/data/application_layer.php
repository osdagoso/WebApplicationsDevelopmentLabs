<?php
	header('Content-type: application/json');
	header('Accept: application/json');
	
	$uService = $_POST["uService"];
	
	require_once "data_layer.php";
	
	switch($uService) {
		case 'CHECK_SESSION':
			validateSession();
			break;
		case 'GET_COMMENTS':
			attemptLoadComment();
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
	
	function validateCookie() {
		if (isset($_COOKIE["username"]))
			echo json_encode($_COOKIE['username']);
		else
			errorHandling('409');
	}
	
	function attemptLogin() {
		$uName = $_POST["uName"];
		$uPassword = $_POST["uPassword"];
		$uRemember = $_POST["uRemember"];
		
		$result = dbLogin($uName, $uPassword);
		
		if ($result["status"] == "SUCCESS") {
			if ($uRemember == "true")
				setcookie("username", $uName, time()+86400*20, "/", "", 0);
			session_start();
			$_SESSION["username"] = $uName;
			$_SESSION["firstname"] = $result["firstname"];
			$_SESSION["lastname"] = $result["lastname"];
			$_SESSION["email"] = $result["email"];
			echo json_encode($result);
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
				$response = '<li><p><img src="img/user.jpg" align="left" class="comment_img"><span class="comment_name">';
				$response = $response . $uFName . " " . $uLName . '</span> <span class="comment_email">&lt' . $uEmail . "&gt</span><br>";
				$response = $response . $uMessage . "</p></li>";
				echo json_encode($response);
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
		
		$uHash = generatePasswordHash();
		
		if ($uHash["status"] == "SUCCESS") {
			$uPassword = $uHash["hash"];
			
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
		} else
			errorHandling($result["status"]);
	}
	
	function generatePasswordHash() {
		$uPassword = $_POST["uPassword"];
		
		$response = password_hash($uPassword, PASSWORD_BCRYPT);
		
		if ($response) {
			return array("hash"=>$response, "status"=>'SUCCESS');
		} else {
			return array("status"=>'412');
		}
	}
	
	function errorHandling($errorCode) {
		switch($errorCode) {
			case '500':
				header("HTTP/1.1 500 Bad connection, portal down");
				die("The server is down, we couldn't establish the data base connection.");
				break;
			case '406':
				header("HTTP/1.1 406 User not found.");
				die("Wrong credentials provided.");
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
				header("HTTP/1.1 407 Account creation failure.");
				die("Password encryption unsuccessful.");
				break;
			default:
				header("HTTP/1.1 500 Something went wrong");
				die("We don't know what :|");
				break;
		}
	}

?>