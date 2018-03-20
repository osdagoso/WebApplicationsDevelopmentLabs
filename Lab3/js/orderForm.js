$(document).ready(function(){
	// Add slogan and copyright texts
	$("#slogan").text('"Burgers and fries the way they were always meant to be."');
	$("#copyright").text('All Rights Reserved. MR BURGER CO.');
	
	$("#addCart").on("click", validateForm);
	$("#resetOrder").on("click", resetForm);
});

function validateForm() {
	var isValid = true;
	
	// Validating burger select menu
	if ($("#selectBurger").val() == null || $("#selectBurger").val() == 0) {
		$("#burgerError").removeClass("hiddenElements");
		$("#selectBurger").addClass("is-invalid");
		isValid = false;
	} else {
		$("#burgerError").addClass("hiddenElements");
		$("#selectBurger").removeClass("is-invalid");
	}
	
	// Validating bread select menu
	if ($("#selectBread").val() == null || $("#selectBread").val() == 0) {
		$("#breadError").removeClass("hiddenElements");
		$("#selectBread").addClass("is-invalid");
		isValid = false;
	} else {
		$("#breadError").addClass("hiddenElements");
		$("#selectBread").removeClass("is-invalid");
	}
	
	// Validating size select menu
	if ($("#selectSize").val() == null || $("#selectSize").val() == 0) {
		$("#sizeError").removeClass("hiddenElements");
		$("#selectSize").addClass("is-invalid");
		isValid = false;
	} else {
		$("#sizeError").addClass("hiddenElements");
		$("#selectSize").removeClass("is-invalid");
	}
	
	// Validating fries radio buttons
	if ($("input[name=selectFries]").is(":checked")) {
		$("#friesError").addClass("hiddenElements");
	} else {
		$("#friesError").removeClass("hiddenElements");
		isValid = false;
	}
	
	// Validating order quantity
	regexVal = /^[1-9]\d*$/;
	if ($("#quantityOrder").val() == null || $("#quantityOrder").val() == "" || !regexVal.test($("#quantityOrder").val())) {
		$("#quantityError").removeClass("hiddenElements");
		$("#quantityOrder").addClass("is-invalid");
		isValid = false;
	} else {
		$("#quantityError").addClass("hiddenElements");
		$("#quantityOrder").removeClass("is-invalid");
	}
	
	if (isValid) {
		// Fill alert text with order information
		$("#orderInfo").removeClass("hiddenElements");
		
		$("#confBurger").text($("#selectBurger option:selected").text());
		$("#confBread").text($("#selectBread option:selected").text());
		$("#confSize").text($("#selectSize option:selected").text());
		
		if ($("#yesFries").is(":checked")) {
			$("#confFries").text("with Fries");
		} else {
			$("#confFries").text("");
		}
		
		$("#confCondim").text("Condiments:");
		$("#condimList input").each(function() {
			if ($(this).is(":checked"))
				$("#confCondim").append(" " + $('label[for="'+$(this).attr('id')+'"]').prop("innerText"));
		});
		
		$("#confTop").text("Additional Toppings:");
		$("#topList input").each(function() {
			if ($(this).is(":checked"))
				$("#confTop").append(" " + $('label[for="'+$(this).attr('id')+'"]').prop("innerText"));
		});
		
		$("#confSauce").text("Sauces:");
		$("#sauceList input").each(function() {
			if ($(this).is(":checked"))
				$("#confSauce").append(" " + $('label[for="'+$(this).attr('id')+'"]').prop("innerText"));
		});
		
		$("#confQuantity").text($("#quantityOrder").val());
	}
	else
		$("#orderInfo").addClass("hiddenElements");
}

function resetForm() {
	$("#orderInfo").addClass("hiddenElements");
	
	// Resetting burger select menu
	$("#selectBurger").val(0);
	$("#burgerError").addClass("hiddenElements");
	$("#selectBurger").removeClass("is-invalid");
	
	// Resetting bread select menu
	$("#selectBread").val(0);
	$("#breadError").addClass("hiddenElements");
	$("#selectBread").removeClass("is-invalid");
	
	// Resetting size select menu
	$("#selectSize").val(0);
	$("#sizeError").addClass("hiddenElements");
	$("#selectSize").removeClass("is-invalid");
	
	// Resetting condiments options
	$("#condimList input").prop("checked", false);
	
	// Resetting toppings options
	$("#topList input").prop("checked", false);
	
	// Resetting sauce options
	$("#sauceList input").prop("checked", false);
	
	// Resetting fries radio buttons
	$("input[name=selectFries]").prop("checked", false);
	$("#friesError").addClass("hiddenElements");
	
	// Resetting order quantity
	$("#quantityOrder").val("");
	$("#quantityError").addClass("hiddenElements");
	$("#quantityOrder").removeClass("is-invalid");
}