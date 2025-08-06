const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const resultContainer = document.getElementById('result');


const checkPalindrome = () => {
	if (!textInput.value) {
		alert('Please input a value');
		return;
	}

	let userInput = textInput.value;
	userInput = userInput.toLowerCase(); 

	const regex = /[\W_]/g;
	userInput = userInput.replace(regex, ''); 
	console.log(userInput);

	let i = 0;
	let j = userInput.length - 1;
	let isPalindrome = true;
	while (i < j) {
		if (userInput[i] !== userInput[j]) {
			isPalindrome = false;
			break;
		}
		i++;
		j--;
	}

	printResult(isPalindrome);
}


const printResult = isPalindrome => {
	let text;
	if (isPalindrome) {
		text = document.createTextNode(`${textInput.value} is a palindrome`);
	} else {
		text = document.createTextNode(`${textInput.value} is not a palindrome`);
	}

	const result = document.createElement('p');
	result.appendChild(text);

	const previousResult = document.querySelector('#result p');
	if (previousResult) previousResult.remove();
	resultContainer.appendChild(result);
};


checkBtn.addEventListener('click', checkPalindrome);
