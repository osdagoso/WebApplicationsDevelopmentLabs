<?php
	ini_set('display_errors', 1); 
	ini_set('log_errors', 1); 
	error_reporting(E_ALL);
	header('Accept: application/json');
	
	session_start();
	if(isset($_SESSION["username"]) && isset($_SESSION["firstname"]) && isset($_SESSION["email"]) && isset($_SESSION["lastname"])) {
		$uFName = $_SESSION["firstname"];
		$uLName = $_SESSION["lastname"];
		unset($_SESSION["username"], $_SESSION["firstname"], $_SESSION["lastname"], $_SESSION["email"]);
		session_destroy();
		
		$response = array("firstname"=>$uFName, "lastname"=>$uLName);
		echo json_encode($response);
	} else {
		session_destroy();
		header("HTTP/1.1 406 Session not found.");
		die("No active session.");
	}
?>