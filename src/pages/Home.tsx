import { Box } from "@mui/material";
import React, { useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { formatDate } from "date-fns";
import { Schema } from "../validations/schema";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  handleSaveTransaction: (transaction: Schema) => Promise<void>;
  onDeleteTransaction: (transactionId: string) => Promise<void>;
}

const Home = ({
  monthlyTransactions,
  setCurrentMonth,
  handleSaveTransaction,
  onDeleteTransaction,
}: HomeProps) => {
  const today = formatDate(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null); //初期値はnull
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    console.log(currentDay);
    return transaction.date === currentDay;
  });

  const onCloseForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
    setSelectedTransaction(null);
  };

  const handleAddTransactionForm = () => {
    if (selectedTransaction) {
      setSelectedTransaction(null);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }
  };

  //取引選択時の処理
  const handleSelectTransaction = (transaction: Transaction) => {
    console.log(transaction);
    setIsEntryDrawerOpen(true);
    setSelectedTransaction(transaction);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGlow: 1,
          width: "100%",
          // bgcolor: "#fff",
          // boxShadow: 3,
          padding: 2,
          // borderRadius: "10px",
        }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
        />
      </Box>
      <Box
        sx={{
          flexGlow: 1,
        }}>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          handleAddTransactionForm={handleAddTransactionForm}
          handleSelectTransaction={handleSelectTransaction}
        />
        <TransactionForm
          onCloseForm={onCloseForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          handleSaveTransaction={handleSaveTransaction}
          selectedTransaction={selectedTransaction}
          onDeleteTransaction={onDeleteTransaction}
          setSelectedTransaction={setSelectedTransaction}
        />
      </Box>
    </Box>
  );
};

export default Home;
