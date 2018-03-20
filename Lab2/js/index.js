$(".alert").hide();

document.addEventListener("DOMContentLoaded", function(){
	var submitButton = document.getElementById("addCart");
	submitButton.addEventListener("click", validateForm);
	
	var resetButton = document.getElementById("resetOrder");
	resetButton.addEventListener("click", resetForm);
	
	function validateForm() {
		var isValid = true;
		
		// Validating burger select menu
		var selectBurger = document.getElementById("selectBurger");
		var optionSelected = selectBurger.options[selectBurger.selectedIndex];
		
		var burgerError = document.getElementById("burgerError");
		if (optionSelected == null || optionSelected.value == 0){
			burgerError.textContent = "Please choose a burger.";
			selectBurger.classList.add("is-invalid");
			isValid = false;
		} else {
			burgerError.textContent = "";
			selectBurger.classList.remove("is-invalid");
		}
		
		// Validating bread select menu
		var selectBread = document.getElementById("selectBread");
		optionSelected = selectBread.options[selectBread.selectedIndex];
		
		var breadError = document.getElementById("breadError");
		if (optionSelected == null || optionSelected.value == 0){
			breadError.textContent = "Please choose a bread.";
			selectBread.classList.add("is-invalid");
			isValid = false;
		} else {
			breadError.textContent = "";
			selectBread.classList.remove("is-invalid");
		}
		
		// Validating size select menu
		var selectSize = document.getElementById("selectSize");
		optionSelected = selectSize.options[selectSize.selectedIndex];
		
		var sizeError = document.getElementById("sizeError");
		if (optionSelected == null || optionSelected.value == 0){
			sizeError.textContent = "Please choose a size.";
			selectSize.classList.add("is-invalid");
			isValid = false;
		} else {
			sizeError.textContent = "";
			selectSize.classList.remove("is-invalid");
		}
		
		// Validating fries radio buttons
		var friesList = document.getElementsByName("selectFries");
		var hasChosenFries = false;
		for (var i = 0; i < friesList.length; i++){
			if (friesList[i].checked) {
				hasChosenFries = true;
				break;
			}
		}
		var friesError = document.getElementById("friesError");
		if (hasChosenFries) {
			friesError.textContent = "";
		} else {
			friesError.textContent = "Please state your preference.";
			isValid = false;
		}
		
		// Validating order quantity
		var quantityOrder = document.getElementById("quantityOrder");
		var quantityError = document.getElementById("quantityError"); 
		regexVal = /^[1-9]\d*$/;
		if (quantityOrder == null || quantityOrder.value == "") {
			quantityError.textContent = "Please write a number.";
			quantityOrder.classList.add("is-invalid");
			isValid = false;
		} else if (!regexVal.test(quantityOrder.value)){
			quantityError.textContent = "Please write a valid number.";
			quantityOrder.classList.add("is-invalid");
			isValid = false;
		} else {
			quantityError.textContent = "";
			quantityOrder.classList.remove("is-invalid");
		}
		
		if (isValid) {
			$(".alert").show();
			var confBurger = document.getElementById("confBurger");
			confBurger.textContent = selectBurger.options[selectBurger.selectedIndex].text;
			var confBread = document.getElementById("confBread");
			confBread.textContent = selectBread.options[selectBread.selectedIndex].text;
			var confSize = document.getElementById("confSize");
			confSize.textContent = selectSize.options[selectSize.selectedIndex].text;
			
			var confFries = document.getElementById("confFries");
			if (friesList[0].checked)
				confFries.textContent = "with Fries";
			else
				confFries.textContent = "";
			
			var confCondim = document.getElementById("confCondim");
			confCondim.textContent = "Condiments:"
			var condimList = document.getElementById("condimList").getElementsByTagName("input");
			for (var i = 0; i < condimList.length; i++){
				if (condimList[i].checked) {
					confCondim.textContent += " " + condimList[i].labels[0].innerText;
				}
			}
			
			var confTop = document.getElementById("confTop");
			confTop.textContent = "Additional Toppings:"
			var topList = document.getElementById("topList").getElementsByTagName("input");
			for (var i = 0; i < topList.length; i++){
				if (topList[i].checked) {
					confTop.textContent += " " + topList[i].labels[0].innerText;
				}
			}
			
			var confSauce = document.getElementById("confSauce");
			confSauce.textContent = "Sauces:"
			var sauceList = document.getElementById("sauceList").getElementsByTagName("input");
			for (var i = 0; i < sauceList.length; i++){
				if (sauceList[i].checked) {
					confSauce.textContent += " " + sauceList[i].labels[0].innerText;
				}
			}
			
			document.getElementById("confQuantity").textContent = quantityOrder.value;
		}
		else
			$(".alert").hide();
	}
	
	function resetForm() {
		$(".alert").hide();
		
		// Resetting burger select menu
		var selectBurger = document.getElementById("selectBurger");
		var burgerError = document.getElementById("burgerError");
		selectBurger.selectedIndex = 0;
		burgerError.textContent = "";
		selectBurger.classList.remove("is-invalid");
		
		// Resetting bread select menu
		var selectBread = document.getElementById("selectBread");
		var breadError = document.getElementById("breadError");
		selectBread.selectedIndex = 0;
		breadError.textContent = "";
		selectBread.classList.remove("is-invalid");
		
		// Resetting size select menu
		var selectSize = document.getElementById("selectSize");
		var sizeError = document.getElementById("sizeError");
		selectSize.selectedIndex = 0;
		sizeError.textContent = "";
		selectSize.classList.remove("is-invalid");
		
		// Resetting condiments options
		var condimList = document.getElementById("condimList").getElementsByTagName("input");
		for (var i = 0; i < condimList.length; i++){
			condimList[i].checked = false;
		}
		
		// Resetting toppings options
		var topList = document.getElementById("topList").getElementsByTagName("input");
		for (var i = 0; i < topList.length; i++){
			topList[i].checked = false;
		}
		
		// Resetting sauce options
		var sauceList = document.getElementById("sauceList").getElementsByTagName("input");
		for (var i = 0; i < sauceList.length; i++){
			sauceList[i].checked = false;
		}
		
		// Resetting fries radio buttons
		var friesList = document.getElementsByName("selectFries");
		var friesError = document.getElementById("friesError");
		for (var i = 0; i < friesList.length; i++){
			friesList[i].checked = false;
		}
		friesError.textContent = "";
		
		// Resetting order quantity
		var quantityOrder = document.getElementById("quantityOrder");
		var quantityError = document.getElementById("quantityError");
		quantityOrder.value = "";
		quantityError.textContent = "";
		quantityOrder.classList.remove("is-invalid");
	}
})