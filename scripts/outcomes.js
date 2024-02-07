const outcomeForm = document.querySelector("#outcome-form");
const outcomeList = document.querySelector("#outcome-list");
const outcomesTotal = document.querySelector("#outcomes-total");

import { updateTotalBalance } from "./index.js";

export const outcomes = [];

export const getOutcomesSum = () => {
  return outcomes.reduce((acc, element) => {
    return acc + element.amount;
  }, 0);
};

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
