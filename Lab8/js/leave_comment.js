$(document).ready(function(){
	$("#textAreaComment").val("");
	
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
	
	// Check if remember me cookie is active
	jsonToSend = {
					"uService": 'GET_COMMENTS'								
				 };
	
	// Load comments log from DB
	$.ajax({
		url: "data/application_layer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success: function(dataReceived) {
			$("#comments").append(dataReceived);
		},
		error: function(errorMessage) {
			console.log(errorMessage);
		}
	});
	
	$("#postComment").on("click", validateForm);
	$("#resetComment").on("click", resetForm);
	
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
					saveComment();
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
 
function validateForm() {
	var isValid = true;
	
	// Validating message
	if ($("#textAreaComment").val() == null || $("#textAreaComment").val() == "") {
		$("#textAreaError").removeClass("hiddenElements");
		$("#textAreaComment").addClass("is-invalid");
		$("#commentInfo").addClass("hiddenElements");
	} else {
		$("#textAreaError").addClass("hiddenElements");
		$("#textAreaComment").removeClass("is-invalid");
		
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
				saveComment();
			},
			error: function(errorMessage) {
				$("#overlay").show(400);
				$("#modal").show(400);
			}
		});
	}
}

function saveComment() {
	var jsonToSend = {
						"uMessage": $("#textAreaComment").val(),
						"uService": 'SAVE_COMMENT'
					 };
					 
	$.ajax({
		url : "data/application_layer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
			// Show alert with confirmation text
			$("#commentInfo").removeClass("alert-danger");
			$("#commentInfo").addClass("alert-success");
			$("#commentInfo h5").text("Comment received!");
			$("#commentInfo span").text("Thank you for your comment!");
			$("#commentInfo").removeClass("hiddenElements");
				
			// Adding comment to list
			$("#comments").append(dataReceived);
				
			// Resetting message field
			$("#textAreaComment").val("");
			$("#textAreaError").addClass("hiddenElements");
			$("#textAreaComment").removeClass("is-invalid");
		},
		error : function(errorMessage){
			console.log(errorMessage);
			// Show alert with confirmation text
			$("#commentInfo").removeClass("alert-success");
			$("#commentInfo").addClass("alert-danger");
			$("#commentInfo h5").text("Error!");
			$("#commentInfo span").text(errorMessage.statusText);
			$("#commentInfo").removeClass("hiddenElements");
		}
	});
}

function resetForm() {
	$("#commentInfo").addClass("hiddenElements");
	
	// Resetting message field
	$("#textAreaComment").val("");
	$("#textAreaError").addClass("hiddenElements");
	$("#textAreaComment").removeClass("is-invalid");
}