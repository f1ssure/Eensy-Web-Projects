const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');


const checkInput = () => {
	if (!numberInput.value || isNaN(numberInput.value)) {
		output.textContent = 'Please enter a valid number';
		return;
	}

	const number = parseInt(numberInput.value);
	if (number < 1) {
		output.textContent = 'Please enter a number greater than or equal to 1';
	} else if (number > 3999) {
		output.textContent = 'Please enter a number less than or equal to 3999';
	} else {
		// pass in the array of the arabic numeral digits
		output.textContent = convertToRoman(numberInput.value.split(''));
	}
};

// function converts only arabic numerals up to 4000
function convertToRoman(digits) {		 
	const len = digits.length;
	const curr = digits.shift();
	let result = '';

	if (curr == 0) {
		return result + convertToRoman(digits);
	}

	if (len === 0) {
		return '';
	} else if (len === 1) {
		if (curr < 4) {
			result = 'I'.repeat(curr);
		} else if (curr == 4) {
			result = 'IV';
		} else if (curr < 9) {
			result = 'V' + 'I'.repeat(curr - 5);
		} else {
			result = 'IX';
		}
	} else if (len === 2) {
		if (curr < 4) {
			result = 'X'.repeat(curr);
		} else if (curr == 4) {
			result = 'XL';
		} else if (curr < 9) {
			result = 'L' + 'X'.repeat(curr - 5);
		} else {
			result = 'XC';
		}
	} else if (len === 3) {
		if (curr < 4) {
			result = 'C'.repeat(curr);
		} else if (curr == 4) {
			result = 'CD';
		} else if (curr < 9) {
			console.log('PROBLEM: ', curr);
			result = 'D' + 'C'.repeat(curr - 5);
		} else {
			result = 'CM';
		}
	} else {
		result = 'M'.repeat(curr);
	}

	return result + convertToRoman(digits);
}


numberInput.addEventListener('keydown', e => { 
	if (e.key === 'Enter') {
		checkInput();
	}
});

convertBtn.addEventListener('click', checkInput);

