// Budget controller
const budgetController = (function() {
	let Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercanetage = function(totalIncome) {
		if (totalIncome > 0) {
			this.percentage = Math.round((this.value / totalIncome) * 100);
			// console.log(totalIncome);
		} else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage;
	};

	let Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	let calculateTotal = function(type) {
		let sum = 0;
		data.allItems[type].forEach(cur => {
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1 // -1 is no exist
	};

	return {
		addItem: function(type, des, val) {
			// console.log(data);

			let newItem, ID;

			// [1 2 3 4 5] => next ID = 6
			// [1 2 3 4 6 7] => next ID = 8
			// ID = lastID + 1

			// Create new Id
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Create new item based on 'inc' or 'exp' type
			if (type === "exp") {
				newItem = new Expense(ID, des, val);
			} else if (type === "inc") {
				newItem = new Income(ID, des, val);
			}

			// Push it into our data structure
			// console.log(data.allItems[type].push(newItem));
			data.allItems[type].push(newItem);

			// Return the new element
			return newItem;
		},
		calculateBudget: function() {
			// Caculate total income and expense
			calculateTotal("exp");
			calculateTotal("inc");

			// caculate income - expense
			data.budget = data.totals.inc - data.totals.exp;

			// Calculate the percentage of income that you spent
			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},
		deleteItem: function(type, id) {
			let ids, index;
			ids = data.allItems[type].map(curr => {
				return curr.id;
			});

			index = ids.indexOf(id);

			if (index !== -1) {
				data.allItems[type].splice(index, 1);
			}
		},
		calculatePercentages: function() {
			data.allItems.exp.forEach(function(curr) {
				curr.calcPercanetage(data.totals.inc);
			});
		},
		getPercentages: function() {
			let allPerc = data.allItems.exp.map(function(curr) {
				return curr.getPercentage();
			});
			return allPerc;
		},
		getBudget: function() {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		},
		testing: function() {
			console.log(data);
		}
	};
})();

// UI controller
const UIController = (function() {
	let DOMstrings = {
		inputType: ".add__type",
		decriptionType: ".add__description",
		valueInput: ".add__value",
		inputBtn: ".add__btn",
		incomeContainer: ".income__list",
		expenseContainer: ".expenses__list",
		budgetLabel: ".budget__value",
		incomeLabel: ".budget__income--value",
		expenseLabel: ".budget__expenses--value",
		percentageLabel: ".budget__expenses--percentage",
		container: ".container",
		expensePercLabel: ".item__percentage",
		dateLabel: ".budget__title--month"
	};
	let formatNumber = function(num, type) {
		let numSplit, int, dec;
		/*
		+ or - before number
		exactly 2 decimal points
		comma separating the thousands

		1234.5678 => + 12,345.678
		*/

		num = Math.abs(num);
		num = num.toFixed(2);

		numSplit = num.split(".");

		int = numSplit[0];
		if (int.length > 3) {
			int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3); // input 23510 => length = 5 => length - 3 = 2, output 23,510
		}

		dec = numSplit[1];

		return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
	};
	let nodeListForEach = function(list, callback) {
		for (let i = 0; i < list.length; i++) {
			callback(list[i], i);
		}
	};
	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.decriptionType).value,
				value: parseFloat(document.querySelector(DOMstrings.valueInput).value)
			};
		},
		addListItem: function(obj, type) {
			let html, newHtml, element;
			// Create HTML string

			if (type == "inc") {
				element = DOMstrings.incomeContainer;
				html =
					'<div class="item clearfix" id="inc-%id%"> <div class="item__description">%decription%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			} else if ((type = "exp")) {
				element = DOMstrings.expenseContainer;
				html =
					'<div class="item clearfix" id="exp-%id%"> <div class="item__description">%decription%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
			}
			// replace placeholder text with some  actual data
			newHtml = html.replace("%id%", obj.id);
			newHtml = newHtml.replace("%decription%", obj.description);
			newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
			// Insert the html into DOM
			document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
		},
		deleteListItem: function(selectorID) {
			let el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},
		clearFields: function() {
			let fields, fieldArr;
			fields = document.querySelectorAll(
				DOMstrings.decriptionType + ", " + DOMstrings.valueInput
			);
			// Using call method because it point to fields then slice method will copy it to new array
			fieldArr = Array.prototype.slice.call(fields);

			fieldArr.forEach((current, index, array) => {
				current.value = "";
			});
			fieldArr[0].focus();
		},
		displayBudget: function(obj) {
			let type;
			obj.budget > 0 ? (type = "inc") : (type = "exp");
			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
				obj.budget,
				type
			);
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
				obj.totalInc,
				"inc"
			);
			document.querySelector(
				DOMstrings.expenseLabel
			).textContent = formatNumber(obj.totalExp, "exp");
			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent =
					obj.percentage + "%";
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = "--";
			}
		},
		displayPercentages: function(percentage) {
			let fieldes;
			// Make for each function
			// let nodeListForEach = function(list, callback) {
			// 	for (let i = 0; i < list.length; i++) {
			// 		callback(list[i], i);
			// 	}
			// };
			// return a array dom
			fieldes = document.querySelectorAll(DOMstrings.expensePercLabel);

			nodeListForEach(fieldes, function(current, index) {
				console.log(percentage[index]);
				if (percentage[index] > 0) {
					current.textContent = percentage[index] + "%";
				} else {
					current.textContent = "--";
				}
			});
		},
		displayMonth: function() {
			let now, year, month, months;
			months = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			];
			now = new Date();
			month = now.getMonth();
			year = now.getFullYear();
			document.querySelector(DOMstrings.dateLabel).textContent =
				months[month] + " - " + year;
		},
		changeType: function() {
			let fields = document.querySelectorAll(
				DOMstrings.inputType +
					"," +
					DOMstrings.decriptionType +
					"," +
					DOMstrings.valueInput
			);
			nodeListForEach(fields, function(curr) {
				curr.classList.toggle("red-focus");
			});
			document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
		},
		// make DOMstrings object can be access in other control || make DOMstrings to public
		getDomstrings: function() {
			return DOMstrings;
		}
	};
})();

// App controller
const appController = (function(budgetCtrl, UICtrl) {
	let setupEventListener = function() {
		let DOM = UICtrl.getDomstrings();

		document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

		document.addEventListener("keypress", function(event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
		document
			.querySelector(DOM.container)
			.addEventListener("click", ctrlDeleteItem);
		document
			.querySelector(DOM.inputType)
			.addEventListener("change", UICtrl.changeType);
	};
	let updateBudget = function() {
		// caculate
		budgetCtrl.calculateBudget();
		// Return
		let budget = budgetCtrl.getBudget();
		// Display
		UICtrl.displayBudget(budget);
	};

	let updatePercentage = function() {
		// Calculate percentage
		budgetCtrl.calculatePercentages();

		// read percentage from the budget comtroller
		let percentages = budgetCtrl.getPercentages();

		// Update UI with new percentage
		UICtrl.displayPercentages(percentages);
	};

	let ctrlAddItem = function() {
		let input, newItem;
		// Get input data

		input = UICtrl.getInput();
		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
			// Add item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// Clear fields
			UICtrl.clearFields();

			// Add the item to the UI
			UICtrl.addListItem(newItem, input.type);

			// Caculate the budget
			updateBudget();

			// Calculate and update percentage
			updatePercentage();
		}
	};
	let ctrlDeleteItem = function(event) {
		let itemID, splitID, type, ID;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {
			splitID = itemID.split("-");
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// Delete item from the data structure
			budgetCtrl.deleteItem(type, ID);
			// Delete item from UI
			UICtrl.deleteListItem(itemID);
			// Update and show the new budget
			updateBudget();
		}
	};
	return {
		init: function() {
			console.log("Application has started");
			setupEventListener();
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			UICtrl.displayMonth();
		}
	};
})(
	budgetController, // assign to budgetCtrl
	UIController // assign to UICtrl
);

appController.init();
