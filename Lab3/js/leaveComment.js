$(document).ready(function(){
	// Add slogan and copyright texts
	$("#slogan").text('"Burgers and fries the way they were always meant to be."');
	$("#copyright").text('All Rights Reserved. MR BURGER CO.');
	$("#textAreaComment").val("");
	
	$("#postComment").on("click", validateForm);
	$("#resetComment").on("click", resetForm);
});
 
function validateForm() {
	var isValid = true;
	
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
		$("#comments").append("<li>From: " + $("#emailAddress").val() + "<br>" + $("#textAreaComment").val() + "</li>");
		
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
	
	// Resetting e-mail address field
	$("#emailAddress").val("");
	$("#emailError").addClass("hiddenElements");
	$("#emailAddress").removeClass("is-invalid");
	
	// Resetting message field
	$("#textAreaComment").val("");
	$("#textAreaError").addClass("hiddenElements");
	$("#textAreaComment").removeClass("is-invalid");
}