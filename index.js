document.addEventListener("DOMContentLoaded", function () {
  let incomeName = document.querySelector("#income-name");
  let incomeAmount = document.querySelector("#income-amount");
  let addIncome = document.querySelector("#add-income");
});

let incomes = [];
addIncome.addEventListener("click", () => {
  incomes.push({ title: incomeName.value, amount: incomeAmount.value });
});
