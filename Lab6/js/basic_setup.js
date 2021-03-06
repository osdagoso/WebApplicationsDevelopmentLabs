$(document).ready(function(){
	// Add slogan and copyright texts
	$("#slogan").text('"Burgers and fries the way they were always meant to be."');
	$("#copyright").text('All Rights Reserved. MR BURGER CO.');
	
	// Check if user is logged in
	var jsonToSend = {
						"uService": 'CHECK_SESSION'								
					 };
	$.ajax({
		url : "data/application_layer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(dataReceived) {
			$("#logoutTag").text(" " + dataReceived.firstname + " " + dataReceived.lastname + " (Logout) ");
			$("#logoutTag").removeClass("hiddenElements");
			$("#loginTag").addClass("hiddenElements");
		},
		error: function(errorMessage) {
			//alert(errorMessage.statusText);
			$("#loginTag").text(" Login ");
			$("#loginTag").removeClass("hiddenElements");
			$("#logoutTag").addClass("hiddenElements");
		}
	});
	
	// When clicking on logout
	$("#logoutTag").on("click", function(){
		var jsonToSend = {
							"uService": 'LOGOUT'
						 };
		$.ajax({
			url : "data/application_layer.php",
			type : "POST",
			data : jsonToSend,
			ContentType : "application/json",
			dataType : "json",
			success: function(dataReceived){
				window.location.href = "index.html";
			},
			error: function(errorMessage) {
				alert(errorMessage.statusText);
			}
		});
	});
});