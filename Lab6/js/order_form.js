$(document).ready(function(){
	// Load info from JSON
	$.ajax({
		url: "data/mr_burger_menu.json",
		type: "GET",
		dataType: "json",
		success: function(jsonData) {
			var infoDirectory = $(jsonData)[0].menu;
			var aux = "";
			
			for(var i = 0; i < infoDirectory.burgerType.length; i++) {
				aux += '<option value="' + infoDirectory.burgerType[i].value + '">';
				aux += infoDirectory.burgerType[i].type + '</option>';
			}
			$("#selectBurger").append(aux);
			aux = "";
			
			for(var i = 0; i < infoDirectory.breadType.length; i++) {
				aux += '<option value="' + infoDirectory.breadType[i].value + '">';
				aux += infoDirectory.breadType[i].type + '</option>';
			}
			$("#selectBread").append(aux);
			aux = "";
			
			var sizeKeys = Object.keys(infoDirectory.burgerSize);
			
			for (var i = 0; i < sizeKeys.length; i++) {
				aux += '<option value="' + sizeKeys[i] + '">';
				aux += infoDirectory.burgerSize[sizeKeys[i]] + '</option>';
			}
			$("#selectSize").append(aux);
			aux = "";
			
			
			var checklistLimit = Math.ceil(infoDirectory.toppings.length/2);
			
			for(var i = 0; i < checklistLimit; i++) {
				aux += '<div class="form-check"><input class="form-check-input" type="checkbox" id="' + infoDirectory.toppings[i].value + '">';
				aux += '<label class="form-check-label" for="' + infoDirectory.toppings[i].value + '">' + infoDirectory.toppings[i].topping;
				aux += '</label></div>';
			}
			$("#selectTop .col")[0].innerHTML += aux;
			aux = "";
			
			for(var i = checklistLimit; i < infoDirectory.toppings.length; i++) {
				aux += '<div class="form-check"><input class="form-check-input" type="checkbox" id="' + infoDirectory.toppings[i].value + '">';
				aux += '<label class="form-check-label" for="' + infoDirectory.toppings[i].value + '">' + infoDirectory.toppings[i].topping;
				aux += '</label></div>';
			}
			$("#selectTop .col")[1].innerHTML += aux;
			aux = "";
			
			var checklistLimit = Math.ceil(infoDirectory.sauces.length/2);
			
			for(var i = 0; i < checklistLimit; i++) {
				aux += '<div class="form-check"><input class="form-check-input" type="checkbox" id="' + infoDirectory.sauces[i].value + '">';
				aux += '<label class="form-check-label" for="' + infoDirectory.sauces[i].value + '">' + infoDirectory.sauces[i].sauce;
				aux += '</label></div>';
			}
			$("#selectSauce .col")[0].innerHTML += aux;
			aux = "";
			
			for(var i = checklistLimit; i < infoDirectory.sauces.length; i++) {
				aux += '<div class="form-check"><input class="form-check-input" type="checkbox" id="' + infoDirectory.sauces[i].value + '">';
				aux += '<label class="form-check-label" for="' + infoDirectory.sauces[i].value + '">' + infoDirectory.sauces[i].sauce;
				aux += '</label></div>';
			}
			$("#selectSauce .col")[1].innerHTML += aux;
			aux = "";
		},
		error: function(error) {
			console.log("error: " + error);
		}
	});
	
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
		$("#errorInfo").addClass("hiddenElements");
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
	else {
		$("#orderInfo").addClass("hiddenElements");
		$("#errorInfo").removeClass("hiddenElements");
	}
}

function resetForm() {
	$("#orderInfo").addClass("hiddenElements");
	$("#errorInfo").addClass("hiddenElements");
	
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