import { Box } from "@mui/material";
import React from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";

interface HomeProps {
  monthlyTransactions: Transaction[];
}

const Home = ({ monthlyTransactions }: HomeProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGlow: 1,
          // bgcolor: "#fff",
          // boxShadow: 3,
          // padding: 2,
          // borderRadius: "10px",
        }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar />
      </Box>
      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;
