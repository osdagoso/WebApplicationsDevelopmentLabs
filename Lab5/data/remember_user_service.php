<?php
	header('Accept: application/json');
	
	if (isset($_COOKIE["username"])) {
		echo json_encode($_COOKIE['username']);
	} else {
		header("HTTP/1.1 406 Cookie is not set.");
		die("Cookie is not set.");
	}
?>






