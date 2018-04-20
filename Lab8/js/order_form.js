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
					saveOrder();
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
				saveOrder();
			},
			error: function(errorMessage) {
				$("#overlay").show(400);
				$("#modal").show(400);
			}
		});
	}
	else {
		$("#orderInfo").addClass("hiddenElements");
		$("#errorInfo").removeClass("hiddenElements");
	}
}

function saveOrder() {
	// Prepare info to be sent to DB
	var orderBurger = $("#selectBurger option:selected").val();
	console.log(orderBurger);
	var orderBread = $("#selectBread option:selected").val();
	console.log(orderBread);
	var orderSize = $("#selectSize option:selected").val();
	console.log(orderSize);
	var orderCond = [];
	$("#condimList input").each(function() {
		if ($(this).is(":checked"))
			orderCond.push($('label[for="'+$(this).attr('id')+'"]').prop("innerText"));
	});
	console.log(orderCond);
	var orderTop = [];
	$("#topList input").each(function() {
		if ($(this).is(":checked"))
			orderTop.push($(this).attr('id'));
	});
	var orderSauce = [];
	$("#sauceList input").each(function() {
		if ($(this).is(":checked"))
			orderSauce.push($(this).attr('id'));
	});
	var orderFries = 0;
	if ($("#yesFries").is(":checked"))
		orderFries = 1;
	console.log(orderFries);
	
	var orderCant = $("#quantityOrder").val();
	console.log(orderCant);
	
	
	var jsonToSend = {
						"uBurger": orderBurger,
						"uBread": orderBread,
						"uSize": orderSize,
						"uConds": orderCond,
						"uTops": orderTop,
						"uSauces": orderSauce,
						"uFries": orderFries,
						"uCant": orderCant,
						"uService": 'SAVE_ORDER'
					 };
					 
	$.ajax({
		url : "data/application_layer.php",
		type : "POST",
		data : jsonToSend,
		ContentType : "application/json",
		dataType : "json",
		success : function(dataReceived){
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
				if ($(this).is(":checked")) {
					$("#confCondim").append(" " + $('label[for="'+$(this).attr('id')+'"]').prop("innerText"));
					console.log($('label[for="'+$(this).attr('id')+'"]').prop("innerText"));
				}
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
		},
		error : function(errorMessage){
			console.log(errorMessage);
			// Show alert with error text
			$("#orderInfo").addClass("hiddenElements");
			$("#errorInfo").removeClass("hiddenElements");
		}
	});
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