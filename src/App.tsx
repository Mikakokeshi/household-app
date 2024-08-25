import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Nomatch from "./pages/Nomatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Transaction } from "./types/index";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { format } from "date-fns";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/schema";

function App() {
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object";
  }
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          // console.log(doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });
        setTransactions(transactionsData);
        console.log(transactions);
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error(err);
          console.error(err.message);
          console.error(err.code);
        } else {
          console.error("firestore以外のエラー", err);
        }
      }
    };
    fetchData();
  }, []);

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      //firestoreにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log(docRef.id); // firestoreで自動で作成されるID
      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions((prevTransaction) => [
        ...prevTransaction,
        newTransaction,
      ]);
      console.log(transactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firestoreのエラー", err);
      } else {
        console.error("firestore以外のエラー", err);
      }
    }
  };

  const onDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      setTransactions(filteredTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firestoreのエラー", err);
      } else {
        console.error("firestore以外のエラー", err);
      }
    }
  };

  const onUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);

      await updateDoc(docRef, transaction);
      const updatedTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      console.log(updatedTransactions);
      setTransactions(updatedTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firestoreのエラー", err);
      } else {
        console.error("firestore以外のエラー", err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              path="/"
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  handleSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={onDeleteTransaction}
                  onUpdateTransaction={onUpdateTransaction}
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<Nomatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
