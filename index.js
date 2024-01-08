let incomeName = document.querySelector("#income-name");
let incomeAmount = document.querySelector("#income-amount");
let addIncome = document.querySelector("#add-income");
let incomeList = document.querySelector("#income-list");

let outcomeName = document.querySelector("#outcome-name");
let outcomeAmount = document.querySelector("#outcome-amount");
let addOutcome = document.querySelector("#add-outcome");
let outcomeList = document.querySelector("#outcome-list");

let incomesTotal = document.querySelector("#incomes-total");
let outcomesTotal = document.querySelector("#outcomes-total");

let incomes = [];

addIncome.addEventListener("click", () => {
  incomes.push({ title: incomeName.value, amount: incomeAmount.value });
  incomeList.innerHTML = "";
  for (let i = 0; i <= incomes.length; i++) {
    let incomeItem = document.createElement("li");
    incomeItem.classList.add("list-element");

    let incomeElement = `
  <span>${incomes[i].title}</span><span>${incomes[i].amount}</span>
  <div class="list-icons">
    <img
      src="assets/PencilSimple.png"
      alt=""
      class="edit-delete-icon"
      id="edit"
    />
    <img src="assets/Trash.png" alt="" class="edit-delete-icon" />
  </div>`;
    incomeItem.innerHTML = incomeElement;
    incomeList.appendChild(incomeItem);

    incomeName.value = "";
    incomeAmount.value = "";

    let incomeSum = incomes.reduce((acc, element) => {
      return acc + Number(element.amount);
    }, 0);

    incomesTotal.innerText = `${incomeSum} PLN`;
  }
});

let outcomes = [];

addOutcome.addEventListener("click", () => {
  outcomes.push({ title: outcomeName.value, amount: outcomeAmount.value });
  outcomeList.innerHTML = "";
  for (let i = 0; i <= outcomes.length; i++) {
    let outcomeItem = document.createElement("li");
    outcomeItem.classList.add("list-element");

    let outcomeElement = `
  <span>${outcomes[i].title}</span><span>${outcomes[i].amount}</span>
  <div class="list-icons">
    <img
      src="assets/PencilSimple.png"
      alt=""
      class="edit-delete-icon"
      id="edit"
    />
    <img src="assets/Trash.png" alt="" class="edit-delete-icon" />
  </div>`;
    outcomeItem.innerHTML = outcomeElement;
    outcomeList.appendChild(outcomeItem);

    outcomeName.value = "";
    outcomeAmount.value = "";

    let outcomeSum = outcomes.reduce((acc, element) => {
      return acc + Number(element.amount);
    }, 0);

    outcomesTotal.innerText = `${outcomeSum} PLN`;
  }
});
