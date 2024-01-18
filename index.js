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

    const incomeElement = `
<span>${income.title}</span><span>${income.amount}</span>
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
    editIcon.setAttribute("alt", "");
    editIcon.classList.add("edit-delete-icon");

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/Trash.png";
    deleteIcon.setAttribute("alt", "");
    deleteIcon.classList.add("edit-delete-icon");
    deleteIcon.addEventListener("click", () => {
      outcome.splice(0, 1);

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

// incones.splice(index, 1) - usuwanie elementów - index elementów i ilośc usuwanych elementów
