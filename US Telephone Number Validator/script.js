const userInput = document.getElementById('user-input');
const checkButton = document.getElementById('check-btn');
const clearButton = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');


userInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		checkUserInput();
	}
});
checkButton.onclick = () => checkUserInput();
clearButton.onclick = () => resultsDiv.innerHTML = '';


function checkUserInput() {
	const value = userInput.value;
	if (!value) {
		alert('Please provide a phone number');
		return;
	}

	const regex = /^1?\s?(\(\d{3}\)|\d{3})[-\s]?(\d{3})[-\s]?(\d{4})$/;
	displayResult(value, regex.test(value));
	userInput.value = '';
}

function displayResult(value, valid) {
	const resultText = document.createElement('p');
	switch (valid) {
		case true:
			resultText.textContent = `Valid US number: ${value}`;
			resultText.style.color = '#2C3930';
			break;
		case false:
			resultText.textContent = `Invalid US number: ${value}`;
			resultText.style.color = '#6D2323';
			break;
	}
	resultText.classList.toggle('result-output');
	resultsDiv.appendChild(resultText);
}


