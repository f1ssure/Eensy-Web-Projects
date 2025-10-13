let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];


const priceLabel = document.getElementById('price');
const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const statusKeyword = document.getElementById('status-keyword');
const outputBox = document.getElementById('output');
const changeDisplay = document.getElementById('change-due');

let dollarValues = {
	'PENNY': 0.01,
	'NICKEL': 0.05,
	'DIME': 0.1,
	'QUARTER': 0.25,
	'ONE': 1,
	'FIVE': 5,
	'TEN': 10,
	'TWENTY': 20,
	'ONE HUNDRED': 100,
};

cid = cid.reverse();
priceLabel.textContent = `$${price}`;


const displayOutput = (status, logs) => {
	statusKeyword.textContent = status;
	changeDisplay.innerHTML = `<p class='hidden'>Status: ${status}</p>`;
	switch (status) {
		case 'INSUFFICIENT_FUNDS':
			break;
		case 'CLOSED':
			break;
		case 'OPEN':

			break;
	}

};

const processPurchase = () => {
	const cash = parseFloat(cashInput.value);
	//const changeDue = Math.round((cash - price) * 1000) / 1000;
	if (cash < price) {
		alert('Customer does not have enough money to purchase the item');
		cashInput.value = '';
		return;
	}

	displayOutput('INSUFFICIENT_FUNDS', undefined);
};


purchaseBtn.onclick = processPurchase;
cashInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		processPurchase();
	}
});


// OLD CODE:
/*
let successfulReturn;

const returnChange = (changeDue) => {
	// while subtracting from drawer, log what bills/coins in what amount should be given
	// logs is a div that will hold different p tags
	const logs = document.createElement('div');
	logs.id = 'change-due';
	let log;


	if (changeDue === 0) {
		log = document.createElement('p');
		log.textContent = 'No change due - customer paid with exact cash';
		logs.appendChild(log);
		return logs;
	} else if (changeDue < 0) {
		return logs;
	}

	// store a cidCopy in case of an unsuccessful change return
	const cidCopy = cid.slice();
	cid.forEach(([type, total], i) => {
		let value = dollarValues[type];
		if (total != 0 && changeDue >= value) {
			// calculate how much of the current type of cash to give back to the customer
			let temp = Math.floor(changeDue / value);
			let amount = Math.min(total, temp * value);
			changeDue = Math.round((changeDue - amount) * 1000) / 1000; // round is used to reduce floating subtraction inaccuracies
			total = Math.round((total - amount) * 1000) / 1000;
			cid[i][1] = total; // make sure money in the drawer gets actually reduced

			// create log for output
			log = document.createElement('p');
			log.textContent = `${type}: $${amount}`;
			logs.appendChild(log);
		}
	});

	// when returning change was unsuccessful
	if (changeDue != 0) {
		cid = cidCopy;
		logs.remove();
		successfulReturn = false;
	}

	return logs;
}

const displayOutput = (status, logs) => {
	statusKeyword.textContent = status;

	// remove previous output if there is one
	outputText = document.getElementById('change-due');
	if (outputText) {
		output.removeChild(outputText);
	}

	if (status) {
		const statusHidden = document.createElement('p');
		statusHidden.textContent = `Status: ${status}`;
		statusHidden.classList.add('hidden');
		logs.insertBefore(statusHidden, logs.firstChild);
	}

	// in case there is no status (change due is 0)
	if (!status) {
		statusKeyword.textContent = 'NONE';
	}

	output.appendChild(logs);
};

const processRequest = () => {
	cash = parseFloat(cashInput.value);
	if (cash < price) {
		alert('Customer does not have enough money to purchase the item');
		cashInput.value = '';
		return;
	}

	const changeDue = Math.round((cash - price) * 1000) / 1000;
	successfulReturn = true;
	let logs = returnChange(changeDue);
	const cashInDrawer = cid.reduce((acc, [_, curr]) => acc + curr, 0);

	// if no change is due -> cash === price
	if (changeDue === 0) {
		displayOutput('', logs);
		return;
	}

	if (cashInDrawer === 0 && successfulReturn) {
		displayOutput('CLOSED', logs);
		return;
	}

	if (!successfulReturn) {
		displayOutput('INSUFFICIENT_FUNDS', logs);
		return;
	}
	

// remove LATER
	displayOutput('OPEN', logs);
}

purchaseBtn.onclick = processRequest;
cashInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		processRequest();
	}
});

console.log("\nTest #9");
price = 11.95;
document.querySelector("#cash").value = 11.95;
document.querySelector("#purchase-btn").click();
console.log("actual", document.querySelector("#change-due").innerText);
console.log("expected", "No change due - customer paid with exact cash");

console.log("\nTest #11");
price = 19.5;
document.querySelector("#cash").value = 20;
cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
document.querySelector("#purchase-btn").click();
console.log("actual", document.querySelector("#change-due").innerText);
console.log("expected", "Status: OPEN QUARTER: $0.5");

console.log("\nTest #12");
price = 3.26;
document.querySelector("#cash").value = 100;
cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
document.querySelector("#purchase-btn").click();
console.log("actual", document.querySelector("#change-due").innerText);
console.log("expected", "Status: OPEN TWENTY: $60 TEN: $20 FIVE: $15 ONE: $1 QUARTER: $0.5 DIME: $0.2 PENNY: $0.04");

console.log("\nTest #14");
price = 19.5;
document.querySelector("#cash").value = 20;
cid = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
document.querySelector("#purchase-btn").click();
console.log("actual", document.querySelector("#change-due").innerText);
console.log("expected", "Status: INSUFFICIENT_FUNDS");

console.log("\nTest #16");
price = 19.5;
document.querySelector("#cash").value = 20;
cid = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
document.querySelector("#purchase-btn").click();
console.log("actual", document.querySelector("#change-due").innerText);
console.log("expected", "Status: INSUFFICIENT_FUNDS");

console.log("\nTest #18");
price = 19.5;
document.querySelector("#cash").value = 20;
cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
document.querySelector("#purchase-btn").click();
console.log("actual", document.querySelector("#change-due").innerText);
console.log("expected", "Status: CLOSED PENNY: $0.5");
*/
