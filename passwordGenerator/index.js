const characterAmountRange = document.getElementById("characterAmountRange")
const characterAmountNumber = document.getElementById("characterAmountNumber")
const includeUppercaseElement = document.getElementById("includeUppercase")
const includeNumbersElement = document.getElementById("includeNumbers")
const includeSymbolsElement = document.getElementById("includeSymbols")
const form = document.getElementById("passwordGeneratorForm")
const passwordDisplay = document.getElementById("passwordDisplay")

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65,90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97,122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48,57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33,47).concat(
	arrayFromLowToHigh(58,64)
	).concat(arrayFromLowToHigh(91,96)
	).concat(arrayFromLowToHigh(123,126)
	)


characterAmountNumber.addEventListener("input", synchCharacterAmount)
characterAmountRange.addEventListener("input", synchCharacterAmount)

//copy password to clipboard
document.querySelector("#copyButton").addEventListener("click", ()=>{
	let content = document.querySelector("#passwordDisplay").innerHTML;
	let cb = navigator.clipboard;
	cb.writeText(content)
	.then(()=>{
		alert("copied to clipboard")
	})
})


form.addEventListener("submit", event => {
	event.preventDefault() //stop form from refreshing page on submit
	const characterAmount = characterAmountNumber.value
	const includeUppercase = includeUppercaseElement.checked //return true or false if checkbox is checked
	const includeNumbers = includeNumbersElement.checked
	const includeSymbols = includeSymbolsElement.checked
	const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
	passwordDisplay.innerText = password
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
	let charCodes = LOWERCASE_CHAR_CODES
	if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
	if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
	if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)

	const passwordCharacters = []
	for (let i = 0; i < characterAmount; i++) {
		const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
		//String.fromCharCode() //method to convert ASCII chart values to characters
		passwordCharacters.push(String.fromCharCode(characterCode))
	}
	return passwordCharacters.join("")
}

// generate an array from low number to high number
function arrayFromLowToHigh(low, high){
	const array = []
	for (let i = low; i <= high; i++) {
		array.push(i)
	}
	return array
}

// function to synch character amount box with slider (range)
function synchCharacterAmount(event) {
	// .target property gets the element on which the event originally occurred, unlike .currentTarget, which always refers to the element whose event listener triggered the event.
	const value = event.target.value
	characterAmountNumber.value = value
	characterAmountRange.value = value
}


