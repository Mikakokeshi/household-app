import { Balance, Transaction } from "../types";

export function financeCalculations(transactions: Transaction[]): Balance {
  return transactions.reduce(
    (accumulate, transaction) => {
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

// 日付ごとの収支を計算する
export function caluculateDailyBalances(
  transactions: Transaction[]
): Record<string, Balance> {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;
    console.log(transaction);
    if (!acc[day]) {
      acc[day] = { income: 0, expense: 0, balance: 0 };
    }
    if (transaction.type === "income") {
      acc[day].income += transaction.amount;
    } else {
      acc[day].expense += transaction.amount;
    }
    acc[day].balance = acc[day].income - acc[day].expense;
    return acc;
  }, {});
}
