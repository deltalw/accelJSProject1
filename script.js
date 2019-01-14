// ** NOTE TO REVIEWER **
	//if you have more than one sub categories in a category and you try putting amounts to the same sub category more than once it will break
	//categories should be total of sub categories but i couldn't get it to work (it would just take the sub category amounts)
	//i think if i fix the first problem, the second problem should be fixed as well
	//i should have set a more attainable MVP T-T
		//spent too much time creating sub categories and checking if there was already an existing sub-category

//data structures

const budget = {
	food:[],
	entertainment: [],
	travel: [],
	debt: [],
	discretionary: [],
	miscellaneous: []
};


//while you can certainly nest arrays - we are not nesting arrays here because we need a key to act as a "filter" (condition)
//put an array within your key if you want to use that key as a condition before looking into the array
//think of arrays as just an index (list) of items
// only objects allow you to "name" an array
// objects always have key value pairing; value can be string, number, object, method. the key is what makes objects powerful

$(document).ready(function() {
	$('form').on('submit', function(e) {
		e.preventDefault();

		//function converts user input to a number
		const $convertNum = function (string){
			return parseFloat(string.val());
			// parseFloat returns a number with a decimal place
		};

		const $category = $('#category').val(); //category converted to string
		const $expense = $('#expense').val(); //expense converted to string
		const $amount = $convertNum($('#amount'));; //amount converted to decimal
		
		//go the budget array and key of the category selected by the user
		const $expenseBudArray = budget[$('#category').val()];  
		//finds the category

		//*** Storing amounts for budget items 

		//find the index in the array where there is already an existing expense 
		const $expenseBudIndex = $expenseBudArray.findIndex(function (array) {
			return array.expense === $expense;	
		});
		console.log(`expenseBudIndex ${$expenseBudIndex}`);

		//if there is an existing expense in the array
		if ($expenseBudIndex > -1){
			// go to that array and increase the amount
			$expenseBudArray[$expenseBudIndex].amount += $amount;
		} else {
			//if expense is not found - create a new object
			$expenseBudArray.push({expense: $expense, amount: $amount});
		}
		
		//*** Updating the DOM for newly inputted budget items

		//look for an li with the same value in expenses as inputted by the user 
		const $containsExp = $(`.category .${$category} ul li:contains(${$expense})`);

		//sum up all values within array with key amount
		const $arrayReducer = $expenseBudArray.reduce(function (accumulator, currentValue){
			return accumulator + currentValue.amount;
		},0);
		console.log($arrayReducer);

		//create a new li for each expense
		//if there isnt already an li for the expense inputted by user
		if ($containsExp.text() !== $expense){
			console.log("Creating new li..");
			//create a new expense as inputted by user
			$(`.category .${$category} ul`).append(`<li>${$expense}</li>`);
			//create a new amount as inputted by user && give to a class to use as identifier (for dupes)
			$(`.budget .${$category}Budget ul`).append(`<li class=${$category}BudgetAmt>${$('#amount').val()}</li>`);
			//${category}BudgetAmt as identifier
			//put the sum in the category li
			// $(`.budget .${$category}Budget`).text($arrayReducer);
		} else {
			//find the appropriate li take the amount (which is now the sum of the old and new amounts)
			const $newBudAmt = $expenseBudArray[$expenseBudIndex].amount.toFixed(2);
			//change the contents of that li to the amount
				// in the category go to the index where there is an existing expense
			$(`.budget .${$category}Budget ul .${$category}BudgetAmt`).text(`${$newBudAmt}`);
			// $(`.budget .${$category}Budget`).text($arrayReducer);
		}
			
		//Sum up expenses in category
		//sum up all amount key-values in the array




		//** Storing amounts for actual items

		//clear inputs after user clicks submit


		//enter actuals
		//update the actuals in real time

	});//end of 'submit' event listener

	
});//end of document ready 