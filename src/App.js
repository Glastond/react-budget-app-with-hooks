import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./Components/ExpenseList";
import ExpenseForm from "./Components/ExpenseForm";
import Alert from "./Components/Alert";
// UUID
import uuid from "uuid/v4";
import { statement } from "@babel/template";

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1200 },
//   { id: uuid(), charge: "Shopping", amount: 200 },
//   { id: uuid(), charge: "Laptop", amount: 1200 }
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // *************** State Values ***************
  // Expenses,addExpenses

  const [expenses, setExpenses] = useState(initialExpenses);

  // Single expense
  const [charge, setCharge] = useState("");

  // Single expense
  const [amount, setAmount] = useState("");

  // Alert
  const [alert, setAlert] = useState({ show: false });

  // alert
  const [edit, setEdit] = useState(false);

  // edit item
  const [id, setId] = useState(0);

  // *************** UseEffect ***************
  useEffect(() => {
    console.log("Use effect called");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // *************** Functionalities ***************

  const handleCharge = e => {
    setCharge(e.target.value);
  };

  const handleAmount = e => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount >= 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Edited Successfully" });
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item Added" });
      }
      setCharge("");
      setAmount("");
    } else {
      // Handle Alert call
      handleAlert({ type: "danger", text: `Enter valid Values!` });
    }
  };

  // Clear all items

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "success", text: "List Cleared" });
  };

  // deleting single items
  const deleteHandler = id => {
    const newExpenses = initialExpenses.filter(expense => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: "success", text: "Item Deleted" });
  };

  // editing single items
  const editHandler = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1 className="main-header">Budget Calculator</h1>
      <hr />
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          deleted={deleteHandler}
          edited={editHandler}
          clearItems={clearItems}
        />{" "}
      </main>
      <h1>
        Total Spending:{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
