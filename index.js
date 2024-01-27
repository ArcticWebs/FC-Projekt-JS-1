// SELECTORS

const incomeForm = document.querySelector("#income-form");
const outcomeForm = document.querySelector("#outcome-form");

const incomeList = document.querySelector("#income-list");
const outcomeList = document.querySelector("#outcome-list");

const incomesTotal = document.querySelector("#incomes-total");
const outcomesTotal = document.querySelector("#outcomes-total");
const totalInOut = document.querySelector("#total-in-out-sum");

const incomes = [];
const outcomes = [];

//  FUNCTIONS

const getIncomesSum = () => {
  return incomes.reduce((acc, element) => {
    return acc + element.amount;
  }, 0);
};

const getOutcomesSum = () => {
  return outcomes.reduce((acc, element) => {
    return acc + element.amount;
  }, 0);
};

const updateTotalBalance = () => {
  let incomeSum = getIncomesSum();

  let outcomeSum = getOutcomesSum();

  const totalSum = incomeSum - outcomeSum;

  let totalText = () => {
    if (totalSum > 0) {
      return `Możesz jeszcze wydać ${totalSum} PLN`;
    } else if (totalSum === 0) {
      return `Bilans wynosi 0 PLN`;
    } else {
      return `Jesteś na minusie ${totalSum} PLN`;
    }
  };

  totalInOut.innerText = totalText();
};

updateTotalBalance();

// ADDING INCOMES

const updateTotalIncome = () => {
  const incomeSum = getIncomesSum();
  incomesTotal.innerText = `${incomeSum} PLN`;
};

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

      let actualIncomeName = incomeNameToEdit.innerText;
      let actualIncomeValue = incomeValueToEdit.innerText;

      incomeNameToEdit.innerHTML = `<input
      class="main-input"
      type="text"
      minlength="3"
      required
      value="${actualIncomeName}"
    />`;
      incomeValueToEdit.innerHTML = `<input
    class="main-input number-input"
    type="number"
    required
    min="0.01"
    step="0.01"
    value="${actualIncomeValue}"
    />`;

      editIcon.src = "assets/done.png";
      editIcon.onclick = deleteIcon.src = "assets/cancel.png";
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

incomeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  incomes.push({
    title: event.target.incomeName.value,
    amount: Number(event.target.incomeAmount.value),
  });

  updateIncomeList();
  event.target.reset();
  updateTotalIncome();
  updateTotalBalance();
});

// ADDING OUTCOMES

const updateTotalOutcome = () => {
  const outcomeSum = getOutcomesSum();
  outcomesTotal.innerText = `${outcomeSum} PLN`;
};

const updateOutcomeList = () => {
  outcomeList.innerHTML = "";

  outcomes.forEach((outcome) => {
    const outcomeItem = document.createElement("li");
    outcomeItem.classList.add("list-element");

    const outcomeNameText = document.createElement("span");
    outcomeNameText.innerText = `${outcome.title}`;

    const outcomeValueNumber = document.createElement("span");
    outcomeValueNumber.innerText = ` ${outcome.amount}`;

    const outcomeIconsBox = document.createElement("div");
    outcomeIconsBox.classList.add("list-icons");

    const editIcon = document.createElement("img");
    editIcon.src = "assets/PencilSimple.png";
    editIcon.setAttribute("alt", "edit icon");
    editIcon.classList.add("edit-delete-icon");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/Trash.png";
    deleteIcon.setAttribute("alt", "");
    deleteIcon.classList.add("edit-delete-icon");
    deleteIcon.addEventListener("click", () => {
      const itemToRemove = outcomes.findIndex((item) => item.id === outcome.id);
      outcomes.splice(itemToRemove, 1);
      updateOutcomeList();
      updateTotalOutcome();
      updateTotalBalance();
    });
    outcomeIconsBox.appendChild(editIcon);
    outcomeIconsBox.appendChild(deleteIcon);

    outcomeItem.appendChild(outcomeNameText);
    outcomeItem.appendChild(outcomeValueNumber);
    outcomeItem.appendChild(outcomeIconsBox);

    outcomeList.appendChild(outcomeItem);
  });
};

outcomeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  outcomes.push({
    title: event.target.outcomeName.value,
    amount: Number(event.target.outcomeAmount.value),
  });

  updateOutcomeList();
  event.target.reset();
  updateTotalOutcome();
  updateTotalBalance();
});
