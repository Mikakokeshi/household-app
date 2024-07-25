import { Balance, Transaction } from "../types";

export function financeCalculations(transactions: Transaction[]): Balance {
  return transactions.reduce(
    (accumulate, transaction) => {
      console.log(transaction, accumulate.expense);
      if (transaction.type === "income") {
        accumulate.income += transaction.amount;
      } else {
        accumulate.expense += transaction.amount;
      }

      accumulate.balance = accumulate.income - accumulate.expense;

      return accumulate;
    },
    { income: 0, expense: 0, balance: 0 }
  );
}
