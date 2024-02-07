const incomeList = document.querySelector("#income-list");
const incomesTotal = document.querySelector("#incomes-total");
const incomeForm = document.querySelector("#income-form");

import { updateTotalBalance } from "./index.js";

export let incomes = [];

const updateIncomeList = () => {
  incomeList.innerHTML = "";

  incomes.forEach((income) => {
    const incomeItem = document.createElement("li");
    incomeItem.classList.add("list-element");

    const incomeNameText = document.createElement("span");
    incomeNameText.innerText = `${income.title}`;
    incomeNameText.id = "income-name";

    const incomeValueNumber = document.createElement("span");
    incomeValueNumber.innerText = ` ${income.amount}`;
    incomeValueNumber.id = "income-value";

    const incomeIconsBox = document.createElement("div");
    incomeIconsBox.classList.add("list-icons");

    const editIcon = document.createElement("img");
    editIcon.src = "assets/PencilSimple.png";
    editIcon.setAttribute("alt", "edit icon");
    editIcon.classList.add("edit-delete-icon");
    editIcon.addEventListener("click", () => {
      let listElementoToEdit = editIcon.closest("li");
      let incomeNameToEdit = listElementoToEdit.querySelector("#income-name");
      let incomeValueToEdit = listElementoToEdit.querySelector("#income-value");
      let incomeListIcons = listElementoToEdit.querySelector(".list-icons");

      let actualIncomeName = incomeNameToEdit.innerText;
      let actualIncomeValue = incomeValueToEdit.innerText;

      incomeNameToEdit.innerHTML = "";

      const nameEditigInput = document.createElement("input");
      nameEditigInput.classList.add("main-input");
      nameEditigInput.setAttribute("type", "text");
      nameEditigInput.setAttribute("minlength", "3");
      nameEditigInput.setAttribute("value", actualIncomeName);
      incomeNameToEdit.appendChild(nameEditigInput);

      incomeValueToEdit.innerHTML = "";

      const valueEditigInput = document.createElement("input");
      valueEditigInput.classList.add("main-input", "number-input");
      valueEditigInput.setAttribute("type", "number");
      valueEditigInput.setAttribute("value", actualIncomeValue);
      incomeNameToEdit.appendChild(valueEditigInput);

      incomeListIcons.innerHTML = "";

      const doneIcon = document.createElement("img");
      doneIcon.src = "assets/done.png";
      doneIcon.setAttribute("alt", "");
      doneIcon.classList.add("edit-delete-icon");
      incomeListIcons.appendChild(doneIcon);
      doneIcon.addEventListener("click", () => {
        const _title = nameEditigInput.value;
        const _value = valueEditigInput.value;

        incomes = incomes.map((el) => {
          if (el.id === income.id) {
            return {
              ...el,
              title: _title,
              amount: Number(_value),
            };
          }
          return el;
        });
        updateIncomeList();
        updateTotalIncome();
        updateTotalBalance();
      });

      const cancelIcon = document.createElement("img");
      cancelIcon.src = "assets/cancel.png";
      cancelIcon.setAttribute("alt", "");
      cancelIcon.classList.add("edit-delete-icon");
      incomeListIcons.appendChild(cancelIcon);
      cancelIcon.addEventListener("click", () => {
        updateIncomeList();
        updateTotalIncome();
        updateTotalBalance();
      });
    });

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/Trash.png";
    deleteIcon.setAttribute("alt", "");
    deleteIcon.classList.add("edit-delete-icon");
    deleteIcon.addEventListener("click", () => {
      const itemToRemove = incomes.findIndex((item) => item.id === income.id);
      incomes.splice(itemToRemove, 1);
      updateIncomeList();
      updateTotalIncome();
      updateTotalBalance();
    });
    incomeIconsBox.appendChild(editIcon);
    incomeIconsBox.appendChild(deleteIcon);

    incomeItem.appendChild(incomeNameText);
    incomeItem.appendChild(incomeValueNumber);
    incomeItem.appendChild(incomeIconsBox);

    incomeList.appendChild(incomeItem);
  });
};

export const getIncomesSum = () => {
  return incomes.reduce((acc, element) => {
    return acc + element.amount;
  }, 0);
};

const updateTotalIncome = () => {
  const incomeSum = getIncomesSum();
  incomesTotal.innerText = `${incomeSum} PLN`;
};

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  incomes.push({
    id: incomes.length + 1,
    title: event.target.incomeName.value,
    amount: Number(event.target.incomeAmount.value),
  });

  updateIncomeList();
  event.target.reset();
  updateTotalIncome();
  updateTotalBalance();
});
