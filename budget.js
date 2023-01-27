//Variables
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//Transaction History
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//Transaction Additions
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter description and amount.");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateLocalStorage();
    updateValues();
    text.value = "";
    amount.value = "";
  }
}

//Generate id
function generateId() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  console.log(transaction);
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text}<span> ${sign}${Math.abs(
    transaction.amount
  )} </span>
  <button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
}

//Remove Transaction
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  Init();
}

//Update updateValues
function updateValues() {
  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//Update Local Storage (refresh the page)
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Init app
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

//Add Transactions Form
form.addEventListener("submit", addTransaction);
