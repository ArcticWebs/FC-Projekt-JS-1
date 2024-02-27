const incomeList = document.querySelector("#income-list");
const incomesTotal = document.querySelector("#incomes-total");
const incomeForm = document.querySelector("#income-form");

import { generateId, updateTotalBalance } from "./index.js";

export let incomes = [];

export const getIncomesSum = () => {
  return incomes.reduce((acc, element) => {
    return acc + element.amount;
  }, 0);
};

const updateTotalIncome = () => {
  const incomeSum = getIncomesSum();
  incomesTotal.innerText = `${incomeSum} PLN`;
};

const updateIncomeList = () => {
  incomeList.innerHTML = "";

  incomes.forEach((income) => {
    const incomeItem = document.createElement("li");
    incomeItem.classList.add("list-element");

    const { incomeNameText, incomeValueNumber, incomeIconsBox } =
      renderIncomeRow(income);

    incomeItem.appendChild(incomeNameText);
    incomeItem.appendChild(incomeValueNumber);
    incomeItem.appendChild(incomeIconsBox);

    incomeList.appendChild(incomeItem);
  });
};

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  incomes.push({
    id: generateId(),
    title: event.target.incomeName.value,
    amount: Number(event.target.incomeAmount.value),
  });

  updateIncomeList();
  event.target.reset();
  updateTotalIncome();
  updateTotalBalance();
});

const renderIncomeRow = (income) => {
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
    const listElementoToEdit = editIcon.closest("li");
    const incomeNameToEdit = listElementoToEdit.querySelector("#income-name");
    const incomeValueToEdit = listElementoToEdit.querySelector("#income-value");
    const incomeListIcons = listElementoToEdit.querySelector(".list-icons");

    const actualIncomeName = incomeNameToEdit.innerText;
    const actualIncomeValue = incomeValueToEdit.innerText;

    incomeNameToEdit.innerHTML = "";

    const nameEditigInput = document.createElement("input");
    nameEditigInput.classList.add("main-input");
    nameEditigInput.setAttribute("type", "text");
    nameEditigInput.setAttribute("value", actualIncomeName);
    incomeNameToEdit.appendChild(nameEditigInput);

    incomeValueToEdit.innerHTML = "";

    const valueEditigInput = document.createElement("input");
    valueEditigInput.classList.add("main-input", "number-input");
    valueEditigInput.setAttribute("type", "number");
    valueEditigInput.setAttribute("step", "0.01");
    valueEditigInput.setAttribute("value", actualIncomeValue);
    incomeNameToEdit.appendChild(valueEditigInput);

    incomeListIcons.innerHTML = "";

    const doneIcon = document.createElement("img");
    doneIcon.src = "assets/done.png";
    doneIcon.setAttribute("alt", "");
    doneIcon.classList.add("edit-delete-icon");
    incomeListIcons.appendChild(doneIcon);
    doneIcon.addEventListener("click", () => {
      if (nameEditigInput.value.length >= 3 && valueEditigInput.value >= 0.01) {
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

        updateTotalIncome();
        updateTotalBalance();

        incomeNameToEdit.innerHTML = "";

        const incomeNameText = document.createElement("span");
        incomeNameText.innerText = `${_title}`;
        incomeNameText.id = "outcome-name";
        incomeNameToEdit.appendChild(incomeNameText);

        incomeValueToEdit.innerHTML = "";

        const incomeValueNumber = document.createElement("span");
        incomeValueNumber.innerText = ` ${Number(_value)}`;
        incomeValueNumber.id = "outcome-value";
        incomeValueToEdit.appendChild(incomeValueNumber);

        incomeIconsBox.innerHTML = "";

        incomeIconsBox.appendChild(editIcon);
        incomeIconsBox.appendChild(deleteIcon);
      } else {
        alert(
          "Nazwa musi mieć więcej niż 3 litery, a wartość musi być większa niż 0.01."
        );
      }
    });

    const cancelIcon = document.createElement("img");
    cancelIcon.src = "assets/cancel.png";
    cancelIcon.setAttribute("alt", "");
    cancelIcon.classList.add("edit-delete-icon");
    incomeListIcons.appendChild(cancelIcon);
    cancelIcon.addEventListener("click", () => {
      listElementoToEdit.innerHTML = "";

      const { incomeNameText, incomeValueNumber, incomeIconsBox } =
        renderIncomeRow(income);

      listElementoToEdit.appendChild(incomeNameText);
      listElementoToEdit.appendChild(incomeValueNumber);
      listElementoToEdit.appendChild(incomeIconsBox);
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

  return {
    incomeNameText,
    incomeValueNumber,
    incomeIconsBox,
  };
};
