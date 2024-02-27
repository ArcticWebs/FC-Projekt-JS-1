import { getIncomesSum } from "./incomes.js";
import { getOutcomesSum } from "./outcomes.js";

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

const totalInOut = document.querySelector("#total-in-out-sum");

export const updateTotalBalance = () => {
  const incomeSum = getIncomesSum();

  const outcomeSum = getOutcomesSum();

  const totalSum = incomeSum - outcomeSum;

  const totalText = () => {
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
