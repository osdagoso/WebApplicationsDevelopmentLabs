$(document).ready(function(){
	// Add slogan and copyright texts
	$("#slogan").text('"Burgers and fries the way they were always meant to be."');
	$("#copyright").text('All Rights Reserved. MR BURGER CO.');
	$("#textAreaComment").val("");
	
	// Load comments log from XML
	$.ajax({
		url: "data/comments.xml",
		type: "GET",
		dataType: "xml",
		success: function(xmlContent) {
			var logComments = "";
			
			$(xmlContent).find("comment").each(function(){
				logComments += '<li><p><img src="img/user.jpg" align="left" class="comment_img">';
				logComments += '<span class="comment_name">' + $(this).find("name").text() + '</span> <span class="comment_email">&lt';
				logComments += $(this).find("name").attr("email") + "&gt</span><br>";
				logComments += $(this).find("text").text() + "</p></li>";
			});
			$("#comments").append(logComments);
			console.log(logComments);
		},
		error: function(error) {
			console.log("error: " + error);
		}
	});
	
	$("#postComment").on("click", validateForm);
	$("#resetComment").on("click", resetForm);
});
 
function validateForm() {
	var isValid = true;
	
	// Validating name
	if ($("#name").val() == null || $("#name").val() == "") {
		$("#nameError").removeClass("hiddenElements");
		$("#name").addClass("is-invalid");
		isValid = false;
	} else {
		$("#nameError").addClass("hiddenElements");
		$("#name").removeClass("is-invalid");
	}
	
	// Validating e-mail address
	if ($("#emailAddress").val() == null || $("#emailAddress").val() == "") {
		$("#emailError").removeClass("hiddenElements");
		$("#emailAddress").addClass("is-invalid");
		isValid = false;
	} else {
		$("#emailError").addClass("hiddenElements");
		$("#emailAddress").removeClass("is-invalid");
	}
	
	// Validating message
	if ($("#textAreaComment").val() == null || $("#textAreaComment").val() == "") {
		$("#textAreaError").removeClass("hiddenElements");
		$("#textAreaComment").addClass("is-invalid");
		isValid = false;
	} else {
		$("#textAreaError").addClass("hiddenElements");
		$("#textAreaComment").removeClass("is-invalid");
	}
	
	if (isValid) {
		// Show alert with confirmation text
		$("#commentInfo").removeClass("hiddenElements");
		
		// Adding comment to list
		$("#comments").append('<li><p><img src="img/user.jpg" align="left" class="comment_img"><span class="comment_name">' + $("#name").val() + '</span> <span class="comment_email">&lt' + $("#emailAddress").val() + "&gt</span><br>" + $("#textAreaComment").val() + "</p></li>");
		
		// Resetting name field
		$("#name").val("");
		$("#nameError").addClass("hiddenElements");
		$("#name").removeClass("is-invalid");
		
		// Resetting e-mail address field
		$("#emailAddress").val("");
		$("#emailError").addClass("hiddenElements");
		$("#emailAddress").removeClass("is-invalid");
		
		// Resetting message field
		$("#textAreaComment").val("");
		$("#textAreaError").addClass("hiddenElements");
		$("#textAreaComment").removeClass("is-invalid");
	}
	else
		$("#commentInfo").addClass("hiddenElements");
}

function resetForm() {
	$("#commentInfo").addClass("hiddenElements");
	
	// Resetting name field
	$("#name").val("");
	$("#nameError").addClass("hiddenElements");
	$("#name").removeClass("is-invalid");
	
	// Resetting e-mail address field
	$("#emailAddress").val("");
	$("#emailError").addClass("hiddenElements");
	$("#emailAddress").removeClass("is-invalid");
	
	// Resetting message field
	$("#textAreaComment").val("");
	$("#textAreaError").addClass("hiddenElements");
	$("#textAreaComment").removeClass("is-invalid");
}