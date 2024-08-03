import { Box } from "@mui/material";
import React, { useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { formatDate } from "date-fns";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = formatDate(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    console.log(currentDay);
    return transaction.date === currentDay;
  });

  const onCloseForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  };

  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
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
        />
        <TransactionForm
          onCloseForm={onCloseForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
        />
      </Box>
    </Box>
  );
};

export default Home;
