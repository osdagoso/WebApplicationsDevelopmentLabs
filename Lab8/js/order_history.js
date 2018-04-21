$(document).ready(function(){	
	// Check if remember me cookie is active
	var jsonToSend = {
						"uService": 'REMEMBER_ME'								
					 };
	
	$.ajax({
		url : "data/application_layer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(dataReceived){
			$("#name").val(dataReceived);
		},
		error: function(errorMessage) {
			//alert(errorMessage.statusText);
		}
	});
	
	var top = ($(window).height() - $("#modal").height())/2;
	var left = ($(window).width() - $("#modal").width())/2;
	
	$("#modal").css({
    top: top,
    left: left
	});
	
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
			loadOrders(dataReceived.username);
		},
		error: function(errorMessage) {
			$("#overlay").show(400);
			$("#modal").show(400);
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
								"uRemember": rememberMe,
								"uService": 'LOGIN'								
							 };

			$.ajax({
				url : "data/application_layer.php",
				type : "POST",
				data : jsonToSend,
				ContentType : "application/json",
				dataType : "json",
				success : function(dataReceived){
					$("#logoutTag").text(" " + dataReceived.firstname + " " + dataReceived.lastname + " (Logout) ");
					$("#logoutTag").removeClass("hiddenElements");
					$("#loginTag").addClass("hiddenElements");
					$("#overlay").hide(400);
					$("#modal").hide(400);
					loadOrders(dataReceived.username);
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
	
	function loadOrders() {
		console.log("LOAAAAD");
		
		// Load info from JSON
		$.ajax({
			url: "data/mr_burger_menu.json",
			type: "GET",
			dataType: "json",
			success: function(jsonData) {
				var infoDirectory = $(jsonData)[0].menu;
				
				// Check if remember me cookie is active
				jsonToSend = {
								"uService": 'GET_ORDERS'		
							 };
				
				// Load comments log from DB
				$.ajax({
					url: "data/application_layer.php",
					type : "POST",
					data : jsonToSend,
					ContentType : "application/json",
					dataType : "json",
					success: function(dataReceived) {
						console.log(dataReceived);
						//$("#orders").append(dataReceived);
					},
					error: function(errorMessage) {
						console.log(errorMessage);
					}
				});
			},
			error: function(error) {
				console.log("error: " + error);
			}
		});
		
	}

});
 