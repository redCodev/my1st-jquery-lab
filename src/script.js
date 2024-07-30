$(document).ready(function () {
	const $pix = $('#pix')
	const $card = $('#card')
	const $cardKey = $('#cardKey')
	const $totalPix = $('#totalPix')
	const $totalCard = $('#totalCard')
	const $cardOwner = $('#cardOwner')
	const $cardNumber = $('#cardNumber')
	const $errorCardNumber = $('#errorCardNumber')
	const $usdCircle = $('#usdCircle')
	const $dollar = $('#dollar')
	const $selectParcels = $('#selectParcels')
	const $cpf = $('#cpf')

	function toggleDisplay($element, display) {
		$element.css('display', display)
	}

	function updateCardDisplay(valor) {
		$totalCard.html(valor.toFixed(2))
		$('#1x').html('1x R$' + valor.toFixed(2))
		$('#2x').html('2x R$' + (valor / 2).toFixed(2))
		$('#3x').html('3x R$' + (valor / 3).toFixed(2))
		$('#4x').html('4x R$' + ((valor + valor * 0.05) / 4).toFixed(2))
		$('#5x').html('5x R$' + ((valor + valor * 0.1) / 5).toFixed(2))
	}

	function validateInput(inputValue, pattern) {
		return pattern.test(inputValue)
	}

	function validateNumberInput(event) {
		const controlKeys = [8, 9, 37, 39, 46]
		const isControlKey = controlKeys.includes(event.which)
		if ((event.which < 48 || event.which > 57) && !isControlKey) {
			event.preventDefault()
		}
	}

	function validateLetterInput(event) {
		const controlKeys = [8, 9, 32, 37, 39, 46]
		const isControlKey = controlKeys.includes(event.which)
		if ((event.which < 65 || event.which > 90) && !isControlKey) {
			event.preventDefault()
		}
	}

	function handlePaymentMethod(valor) {
		if ($('#radioPix').is(':checked')) {
			toggleDisplay($pix, 'block')
			toggleDisplay($card, 'none')
			$totalPix.html((valor - valor * 0.1).toFixed(2))
		} else if ($('#radioCard').is(':checked')) {
			toggleDisplay($card, 'block')
			toggleDisplay($pix, 'none')
			updateCardDisplay(valor)

			$selectParcels.on('change', function () {
				const selectedOpt = $(this).val()
				if (selectedOpt === '4x') {
					$totalCard.html((valor + valor * 0.05).toFixed(2))
				} else if (selectedOpt === '5x') {
					$totalCard.html((valor + valor * 0.1).toFixed(2))
				} else {
					$totalCard.html(valor.toFixed(2))
				}
			})
		} else {
			alert('Selecione um método de pagamento.')
		}
	}

	$('#btnDetails').click(function () {
		const userInput = $('#textField').val()
		if (userInput === '') {
			alert("Por favor, preencha o campo 'Valor'.")
			return
		}
		if (!/^\d+(\.\d+)?$/.test(userInput)) {
			alert('Por favor, insira um número válido.')
			return
		}
		const valor = parseFloat(userInput)
		handlePaymentMethod(valor)
	})

	$cardNumber.on('keydown', validateNumberInput)

	$cardNumber.on('input', function () {
		const inputValue = $(this).val()
		if (validateInput(inputValue, /^1234/)) {
			toggleDisplay($usdCircle, 'contents')
			toggleDisplay($dollar, 'none')
		} else if (validateInput(inputValue, /^4321/)) {
			toggleDisplay($dollar, 'contents')
			toggleDisplay($usdCircle, 'none')
		} else {
			toggleDisplay($dollar, 'none')
			toggleDisplay($usdCircle, 'none')
		}
	})

	$cardNumber.on('focusout', function () {
		const inputValue = $(this).val()
		if (
			!validateInput(inputValue, /^1234/) &&
			!validateInput(inputValue, /^4321/)
		) {
			$errorCardNumber.css({ display: 'contents', color: 'red' })
		} else {
			$errorCardNumber.css('display', 'none')
		}
	})

	$cardOwner.on('keydown', validateLetterInput).on('input', function () {
		const valUpper = $(this).val().toUpperCase()
		$(this).val(valUpper)
	})

	$cardKey.on('keydown', validateNumberInput)

	$('#submitCard').click(function () {
		const card = $cardNumber.val()
		const owner = $cardOwner.val()
		const key = $cardKey.val()
		if (
			$errorCardNumber.css('display') !== 'none' ||
			owner == '' ||
			key == ''
		) {
			alert('Por favor, preencha todos os campos.')
		} else {
			alert('Pagamento efetuado com sucesso!')
		}
	})

	$cpf.on('keydown', validateNumberInput)

	$('#submitPix').click(function () {
		const cpf = $cpf.val()
		if (cpf === '') {
			alert('Por favor, informe o CPF.')
		} else {
			alert('Pagamento efetuado com sucesso!')
		}
	})
})
