$(document).ready(function(){
	// Check if remember me cookie is active
	$.ajax({
		url : "data/remember_user_service.php",
		type : "POST",
		dataType : "json",
		success: function(dataReceived){
			$("#name").val(dataReceived);
		},
		error: function(errorMessage) {
			//alert(errorMessage.statusText);
		}
	});
	
	$("#loginButton").on("click", function(){
		var username = $("#name").val();
		var passwrd = $("#pass").val();
		var rememberMe = $('#checkRemember').is(':checked');

		if (username != "" && passwrd != "") {
			$("#nameError").addClass("hiddenElements");
			$("#name").removeClass("is-invalid");
			$("#passError").addClass("hiddenElements");
			$("#pass").removeClass("is-invalid");
			
			var jsonToSend = {
								"uName" : username,
								"uPassword" : passwrd,
								"uRemember": rememberMe								
							 };

			$.ajax({
				url : "data/login_service.php",
				type : "POST",
				data : jsonToSend,
				ContentType : "application/json",
				dataType : "json",
				success : function(dataReceived){
					window.location.href = "/Lab5/index.html";
				},
				error : function(errorMessage){
					$("#loginInfo span").text(errorMessage.statusText);
					$("#loginInfo").removeClass("hiddenElements");
				}

			});
		} else {
			if (username === "") {
				$("#nameError").removeClass("hiddenElements");
				$("#name").addClass("is-invalid");
			} else {
				$("#nameError").addClass("hiddenElements");
				$("#name").removeClass("is-invalid");
			}
			
			if (passwrd === "") {
				$("#passError").removeClass("hiddenElements");
				$("#pass").addClass("is-invalid");
			} else {
				$("#passError").addClass("hiddenElements");
				$("#pass").removeClass("is-invalid");
			}
		}
	});
	
	$("#registerButton").on("click", function(){
		window.location.href = "register.html";
	});
});