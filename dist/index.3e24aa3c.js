const balance = document.getElementById("balance"); // Get the balance element
const money_plus = document.getElementById("money-plus"); // Get the money-plus element for income
const money_minus = document.getElementById("money-minus"); // Get the money-minus element for expenses
const list = document.getElementById("list"); // Get the list element where transactions will be displayed
const form = document.getElementById("form"); // Get the form element for submitting new transactions
const text = document.getElementById("text"); // Get the input element for the transaction text
const amount = document.getElementById("amount"); // Get the input element for the transaction amount
// Retrieve transactions from local storage or set to empty array if not present
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
// Function to add a new transaction from the form
function addTransaction(e) {
    e.preventDefault(); // Prevent the form from submitting
    // Check if text and amount fields are filled
    if (text.value.trim() === "" || amount.value.trim() === "") alert("Please add a text and amount");
    else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction); // Add to transactions array
        addTransactionDOM(transaction); // Add transaction to the DOM
        updateValues(); // Update the balance, income, and expense
        updateLocalStorage(); // Update local storage with new transaction
        text.value = ""; // Clear the text input
        amount.value = ""; // Clear the amount input
    }
}
// Function to generate a random ID for a new transaction
function generateID() {
    return Math.floor(Math.random() * 100000000);
}
// Function to add a transaction to the DOM list
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+"; // Determine the sign based on the transaction amount
    const item = document.createElement("li"); // Create a new list item
    // Add a class based on the transaction value (income or expense)
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    // Set the inner HTML of the list item
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
    list.appendChild(item); // Append the new item to the list
}
// Function to update the total balance, income, and expense
function updateValues() {
    const amounts = transactions.map((transaction)=>transaction.amount); // Extract the transaction amounts
    const total = amounts.reduce((acc, item)=>acc += item, 0).toFixed(2); // Calculate the total balance
    const income = amounts // Calculate the total income
    .filter((item)=>item > 0).reduce((acc, item)=>acc += item, 0).toFixed(2);
    const expense = (amounts.filter((item)=>item < 0).reduce((acc, item)=>acc += item, 0) * -1).toFixed(2);
    // Update the DOM with the new values
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}
// Function to remove a transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter((transaction)=>transaction.id !== id); // Filter out the transaction with the given ID
    updateLocalStorage(); // Update local storage to reflect the removal
    init(); // Reinitialize the app
}
// Function to update local storage with the current transactions
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
// Function to initialize the app
function init() {
    list.innerHTML = ""; // Clear the transaction list
    transactions.forEach(addTransactionDOM); // Add each transaction to the DOM
    updateValues(); // Update the balance, income, and expense
}
init(); // Initialize the app
form.addEventListener("submit", addTransaction); // Add event listener for form submission

//# sourceMappingURL=index.3e24aa3c.js.map
