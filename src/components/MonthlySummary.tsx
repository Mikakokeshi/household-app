import { Grid, Typography, CardContent, Stack, Card } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SavingsIcon from "@mui/icons-material/Savings";
import { Transaction } from "../types";
import { financeCalculations } from "../utils/financeCalculations";

interface MonthlySummaryProps {
  monthlyTransactions: Transaction[];
}

const MonthlySummary = ({ monthlyTransactions }: MonthlySummaryProps) => {
  const { income, expense, balance } = financeCalculations(monthlyTransactions);
  console.log(balance);
  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} mb={2} display={"flex"}>
      {/* 収入 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.incomeColor.main,
            color: "#fff",
            borderRadius: "10px",
            flexGlow: 1,
          }}>
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>収入</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"bold"}
              sx={{ wordBreak: "break-word" }}>
              {income}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 支出 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.expenseColor.main,
            color: "#fff",
            borderRadius: "10px",
            flexGlow: 1,
          }}>
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>支出</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"bold"}
              sx={{ wordBreak: "break-word" }}>
              {expense}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 残高 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.balanceColor.main,
            color: "#fff",
            borderRadius: "10px",
            flexGlow: 1,
          }}>
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <SavingsIcon sx={{ fontSize: "2rem" }} />
              <Typography>残高</Typography>
            </Stack>
            <Typography textAlign={"right"} variant="h5" fontWeight={"bold"}>
              {balance}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MonthlySummary;
