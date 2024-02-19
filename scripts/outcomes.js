const outcomeForm = document.querySelector("#outcome-form");
const outcomeList = document.querySelector("#outcome-list");
const outcomesTotal = document.querySelector("#outcomes-total");

import { updateTotalBalance } from "./index.js";

export let outcomes = [];

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
    outcomeNameText.id = "outcome-name";

    const outcomeValueNumber = document.createElement("span");
    outcomeValueNumber.innerText = ` ${outcome.amount}`;
    outcomeValueNumber.id = "outcome-value";

    const outcomeIconsBox = document.createElement("div");
    outcomeIconsBox.classList.add("list-icons");

    const editIcon = document.createElement("img");
    editIcon.src = "assets/PencilSimple.png";
    editIcon.setAttribute("alt", "edit icon");
    editIcon.classList.add("edit-delete-icon");
    editIcon.addEventListener("click", () => {
      let listElementoToEdit = editIcon.closest("li");
      let outcomeNameToEdit = listElementoToEdit.querySelector("#outcome-name");
      let outcomeValueToEdit =
        listElementoToEdit.querySelector("#outcome-value");
      let outcomeListIcons = listElementoToEdit.querySelector(".list-icons");

      let actualOutcomeName = outcomeNameToEdit.innerText;
      let actualOutcomeValue = outcomeValueToEdit.innerText;

      outcomeNameToEdit.innerHTML = "";

      const nameEditigInput = document.createElement("input");
      nameEditigInput.classList.add("main-input");
      nameEditigInput.setAttribute("type", "text");
      nameEditigInput.setAttribute("minlength", "3");
      nameEditigInput.setAttribute("value", actualOutcomeName);
      outcomeNameToEdit.appendChild(nameEditigInput);

      outcomeValueToEdit.innerHTML = "";

      const valueEditigInput = document.createElement("input");
      valueEditigInput.classList.add("main-input", "number-input");
      valueEditigInput.setAttribute("type", "number");
      valueEditigInput.setAttribute("value", actualOutcomeValue);
      outcomeNameToEdit.appendChild(valueEditigInput);

      outcomeListIcons.innerHTML = "";

      const doneIcon = document.createElement("img");
      doneIcon.src = "assets/done.png";
      doneIcon.setAttribute("alt", "");
      doneIcon.classList.add("edit-delete-icon");
      outcomeListIcons.appendChild(doneIcon);
      doneIcon.addEventListener("click", () => {
        const _title = nameEditigInput.value;
        const _value = valueEditigInput.value;

        outcomes = outcomes.map((el) => {
          if (el.id === outcome.id) {
            return {
              ...el,
              title: _title,
              amount: Number(_value),
            };
          }
          return el;
        });

        // updateOutcomeList();
        updateTotalOutcome();
        updateTotalBalance();

        outcomeNameToEdit.innerHTML = "";

        const outcomeNameText = document.createElement("span");
        outcomeNameText.innerText = `${_title}`;
        outcomeNameText.id = "outcome-name";
        outcomeNameToEdit.appendChild(outcomeNameText);

        outcomeValueToEdit.innerHTML = "";

        const outcomeValueNumber = document.createElement("span");
        outcomeValueNumber.innerText = ` ${Number(_value)}`;
        outcomeValueNumber.id = "outcome-value";
        outcomeValueToEdit.appendChild(outcomeValueNumber);

        outcomeIconsBox.innerHTML = "";

        outcomeIconsBox.appendChild(editIcon);
        outcomeIconsBox.appendChild(deleteIcon);
      });

      const cancelIcon = document.createElement("img");
      cancelIcon.src = "assets/cancel.png";
      cancelIcon.setAttribute("alt", "");
      cancelIcon.classList.add("edit-delete-icon");
      outcomeListIcons.appendChild(cancelIcon);
      cancelIcon.addEventListener("click", () => {
        // updateOutcomeList();
        updateTotalOutcome();
        updateTotalBalance();
      });
    });

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
