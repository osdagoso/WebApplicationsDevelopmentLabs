$(document).ready(function(){
	$("#registerButton").on("click", function(){
		var isValid = true;
		
		var fname = $("#firstname").val();
		var lname = $("#lastname").val();
		var email = $("#email").val();
		var username = $("#name").val();
		var pwd = $("#pass").val();
		var pwdconf = $("#passconf").val();
		
		if (fname == "") {
			$("#firstNameError").removeClass("hiddenElements");
			$("#firstname").addClass("is-invalid");
			isValid = false;
		} else {
			$("#firstNameError").addClass("hiddenElements");
			$("#firstname").removeClass("is-invalid");
		}
		
		if (lname == "") {
			$("#lastNameError").removeClass("hiddenElements");
			$("#lastname").addClass("is-invalid");
			isValid = false;
		} else {
			$("#lastNameError").addClass("hiddenElements");
			$("#lastname").removeClass("is-invalid");
		}
		
		if (email == "") {
			$("#emailError").removeClass("hiddenElements");
			$("#email").addClass("is-invalid");
			isValid = false;
		} else {
			$("#emailError").addClass("hiddenElements");
			$("#email").removeClass("is-invalid");
		}
		
		if (username == "") {
			$("#nameError").removeClass("hiddenElements");
			$("#name").addClass("is-invalid");
			isValid = false;
		} else {
			$("#nameError").addClass("hiddenElements");
			$("#name").removeClass("is-invalid");
		}
		
		if (pwd == "") {
			$("#passError").removeClass("hiddenElements");
			$("#pass").addClass("is-invalid");
			isValid = false;
		} else {
			$("#passError").addClass("hiddenElements");
			$("#pass").removeClass("is-invalid");
		}
		
		if (pwdconf == "" || pwd != pwdconf) {
			$("#confError").removeClass("hiddenElements");
			$("#passconf").addClass("is-invalid");
			isValid = false;
		} else {
			$("#confError").addClass("hiddenElements");
			$("#passconf").removeClass("is-invalid");
		}
		
		if (isValid) {
			var jsonObject = {
								"uName" : username,
								"uPassword" : pwd,
								"uFName" : fname,
								"uLName" : lname,
								"uEmail" : email,
								"uService": 'REGISTER'
							 };

			$.ajax({
				type: "POST",
				url: "data/application_layer.php",
				data : jsonObject,
				dataType : "json",
				ContentType : "application/json",
				success: function(jsonData) {
					window.location.href = "index.html";
				},
				error: function(errorMessage){
					$("#loginInfo span").text(errorMessage.statusText);
					$("#loginInfo").removeClass("hiddenElements");
				}
			});
		}
		
	});
	
	$("#cancelButton").on("click", function(){
		window.location.href = "login.html";
	});
});