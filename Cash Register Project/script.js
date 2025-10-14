let price = 19.5;
let cid = [
	["PENNY", 1.01], 
	["NICKEL", 2.05], 
	["DIME", 3.1], 
	["QUARTER", 4.25], 
	["ONE", 90], 
	["FIVE", 55], 
	["TEN", 20], 
	["TWENTY", 60], 
	["ONE HUNDRED", 100]
];

const priceLabel = document.getElementById('price');
const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const statusKeyword = document.getElementById('status-keyword');
const outputBox = document.getElementById('output');
const changeDue = document.getElementById('change-due');

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
priceLabel.textContent = `$${price}`;
let logs;

const displayOutput = (status) => {
	statusKeyword.textContent = status;
	if (status === 'NONE') {
		changeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
		return;
	}

	changeDue.innerHTML = `<p>Status: ${status}</p>`;
	switch (status) {
		case 'OPEN':
		case 'CLOSED':
			changeDue.innerHTML += logs;
	}
};

// returns an HTML string, which is later referred to as "logs"
const getStatus = (cash, change) => {
	if (change === 0) {
		return 'NONE';
	}

	let drawerCash = cid.reduce((acc, [_, curr]) => acc + curr, 0);
	if (drawerCash < change) {
		return 'INSUFFICIENT_FUNDS';
	}
	
	logs = '';
	const cidCopy = cid.slice();
	cid.reverse().forEach(([type, total], i) => {
		let value = dollarValues[type];
		if (total != 0 && change >= value) {
			// calculate how much of the current type of cash to give back to the customer
			let temp = Math.floor(change / value);
			let amount = Math.min(total, temp * value);

			// round is used to reduce floating subtraction inaccuracies
			change = Math.round((change - amount) * 1000) / 1000; 
			total = Math.round((total - amount) * 1000) / 1000;

			// make sure money in the drawer gets actually reduced
			cid[i][1] = total; 
			drawerCash = Math.round((drawerCash - amount) * 1000) / 1000;

			// create log for output
			logs += `<p>${type}: $${amount}</p>`;
		}
	});

	// cannot return exact change
	if (change != 0) {
		cid = cidCopy;
		return 'INSUFFICIENT_FUNDS';
	}
	// if drawer's empty, that means initially drawerCash === change, but had to build logs
	if (drawerCash === 0) {
		return 'CLOSED';
	}
	return 'OPEN';
};

const processPurchase = () => {
	const cash = parseFloat(cashInput.value);
	cashInput.value = '';
	if (cash < price) {
		alert('Customer does not have enough money to purchase the item');
		cashInput.value = '';
		return;
	}
	const change = Math.round((cash - price) * 1000) / 1000;
	const status = getStatus(cash, change);
	displayOutput(status);
};


purchaseBtn.onclick = processPurchase;
cashInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		processPurchase();
	}
});
