$(document).ready(function () {
	var $pix = $('#pix')
	var $card = $('#card')
	var $cardKey = $('#cardKey')
	var $totalPix = $('#totalPix')
	var $totalCard = $('#totalCard')
	var $cardOwner = $('#cardOwner')
	var $cardNumber = $('#cardNumber')

	$('#btnDetails').click(function () {
		// Check if the shopping value is provided
		var userInput = $('#textField').val()
		if (userInput === '') {
			alert("Por favor, preencha o campo 'Valor'.")
			return
		} else {
			if (!/^\d+(\.\d+)?$/.test(userInput)) {
				alert('Por favor, insira um número válido.')
				return
			} else {
				var valor = parseFloat(userInput)
				// Check the payment method
				if ($('#radioPix').is(':checked')) {
					$pix.css('display', 'block')
					$card.css('display', 'none')
					// Set the informed value to the total with a 10% discount
					$totalPix.html((valor - valor * 0.1).toFixed(2))
				} else if ($('#radioCard').is(':checked')) {
					$card.css('display', 'block')
					$pix.css('display', 'none')
					// Set the informed value to the total
					$totalCard.html(valor.toFixed(2))
					// Display the amount of each parcel according to the total
					$('#1x').html('1x R$' + valor.toFixed(2))
					$('#2x').html('2x R$' + (valor / 2).toFixed(2))
					$('#3x').html('3x R$' + (valor / 3).toFixed(2))
					// Add interest to the parcels
					$('#4x').html('4x R$' + ((valor + valor * 0.05) / 4).toFixed(2))
					$('#5x').html('5x R$' + ((valor + valor * 0.1) / 5).toFixed(2))
					// Change the total price display in case of interest on the parcels
					$('#selectParcels').on('change', function () {
						var selectedOpt = $(this).val()
						if (
							selectedOpt == '1x' ||
							selectedOpt == '2x' ||
							selectedOpt == '3x'
						) {
							$totalCard.html(valor.toFixed(2))
						}
						if (selectedOpt == '4x') {
							$totalCard.html((valor + valor * 0.05).toFixed(2))
						}
						if (selectedOpt == '5x') {
							$totalCard.html((valor + valor * 0.1).toFixed(2))
						}
					})
				} else {
					alert('Selecione um método de pagamento')
				}
			}
		}
	})
	// Only allow numeric and control keys
	$cardNumber.keydown(function (event) {
		var controlKeys = [8, 9, 37, 39, 46] // backspace, tab, left arrow, right arrow, delete
		var isControlKey = controlKeys.indexOf(event.which) !== -1
		// Check if it's a number or a control key
		if ((event.which < 48 || event.which > 57) && !isControlKey) {
			event.preventDefault() // Prevent the default action (typing)
		}
	})

	// Verify the card's flag
	$cardNumber.on('input', function () {
		var inputValue = $(this).val()
		var pattern1 = /^1234/
		var pattern2 = /^4321/
		if (pattern1.test(inputValue)) {
			$('#usdCircle').css('display', 'contents')
			$('#dollar').css('display', 'none')
		} else if (pattern2.test(inputValue)) {
			$('#dollar').css('display', 'contents')
			$('#usdCircle').css('display', 'none')
		} else {
			$('#usdCircle').css('display', 'none')
			$('#dollar').css('display', 'none')
		}
	})
	// Check for invalid card number
	$cardNumber.on('focusout', function () {
		var inputValue = $(this).val()
		var pattern1 = /^1234/
		var pattern2 = /^4321/
		if (!pattern1.test(inputValue) && !pattern2.test(inputValue)) {
			$('#errorCardNumber').css('display', 'contents')
			$('#errorCardNumber').css('color', 'red')
		} else {
			$('#errorCardNumber').css('display', 'none')
		}
	})
	// Only allow (upper case) letters
	$cardOwner.keydown(function (event) {
		var controlKeys = [8, 9, 32, 37, 39, 46]
		var isControlKey = controlKeys.indexOf(event.which) !== -1
		if ((event.which < 65 || event.which > 90) && !isControlKey) {
			event.preventDefault()
		} else {
			$(this).on('input', function () {
				var valUpper = $(this).val().toUpperCase()
				$(this).val(valUpper)
			})
		}
	})

	$cardKey.keydown(function (event) {
		var controlKeys = [8, 9, 37, 39, 46]
		var isControlKey = controlKeys.indexOf(event.which) !== -1
		if ((event.which < 48 || event.which > 57) && !isControlKey) {
			event.preventDefault()
		}
	})

	$('#submitCard').on('click', function () {
		let card = $cardNumber.val()
		let owner = $cardOwner.val()
		let key = $cardKey.val()
		if (
			$('#errorCardNumber').css('display') !== 'none' ||
			owner == '' ||
			key == ''
		) {
			alert('Por favor, preencha todos os campos.')
		} else {
			alert('Pagamento efetuado com sucesso!')
		}
	})

	$('#cpf').keydown(function (event) {
		var controlKeys = [8, 9, 37, 39, 46]
		var isControlKey = controlKeys.indexOf(event.which) !== -1
		if ((event.which < 48 || event.which > 57) && !isControlKey) {
			event.preventDefault()
		}
	})

	$('#submitPix').on('click', function () {
		let cpf = $('#cpf').val()
		if (cpf == '') {
			alert('Por favor, informe o CPF.')
		} else {
			alert('Pagamento efetuado com sucesso!')
		}
	})
})
