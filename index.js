let incomeName = document.querySelector("#income-name");
let incomeAmount = document.querySelector("#income-amount");
let addIncome = document.querySelector("#add-income");
let incomeList = document.querySelector("#income-list");

let incomes = [];

addIncome.addEventListener("click", () => {
  incomes.push({ title: incomeName.value, amount: incomeAmount.value });

  let incomeElement = `<li class="list-element">
  <span>${incomeName.value}</span><span>${incomeAmount.value}</span>
</li>`;

  incomeList.appendChild(incomeElement);
});
