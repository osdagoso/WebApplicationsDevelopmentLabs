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
						var info = '';
						console.log(dataReceived);
						dataReceived.orders.forEach((order) => {
							info = info + '<li><div><span class="order_number">Order #' + order.id + ' </span>';
							info = info + '<span class="order_date">'+ order.date + '</span></div>';
							
							infoDirectory.burgerType.forEach((burger) => {
								if (order.burger == burger.value) {
									info = info + '<div>'+ order.quantity + ' ' + infoDirectory.burgerSize[order.bgsize] + ' ' + burger.type;

									if (order.fries == 1) {
										info = info + ' with Fries</div>';
									} else {
										info = info + '</div>';
									}
								}
							});
							
							info = info + '<ul>';
							infoDirectory.breadType.forEach((bread) => {
								if (order.bread == bread.value) {
									info = info + '<li>' + bread.type + ' Bread</li>';
								}
							});
							if (order.conds.length > 0) {
								info = info + '<li>Condiments:<ul class="orderdets">';
								order.conds.forEach((cond) => {
									info = info + '<li>' + cond + '</li>';
								});
								info = info + '</ul></li>';
							}
							if (order.tops.length > 0) {
								info = info + '<li>Toppings:<ul class="orderdets">';
								order.tops.forEach((top) => {
									infoDirectory.toppings.forEach((jtop) => {
										if (top == jtop.value) {
											info = info + '<li>' + jtop.topping + '</li>';
											infoDirectory.toppings.splice(infoDirectory.toppings.indexOf(jtop));
										}
									});
								});
								info = info + '</ul></li>';
							}
							if (order.sauces.length > 0) {
								info = info + '<li>Sauces:<ul class="orderdets">';
								order.sauces.forEach((sauce) => {
									infoDirectory.sauces.forEach((jsauce) => {
										if (sauce == jsauce.value) {
											info = info + '<li>' + jsauce.sauce + '</li>';
											infoDirectory.sauces.splice(infoDirectory.sauces.indexOf(jsauce));
										}
									});
								});
								info = info + '</ul></li>';
							}
							info = info + "</ul>";
							info = info + "</li>";
							console.log(info);
						});
						$("#orders").append(info);
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
 