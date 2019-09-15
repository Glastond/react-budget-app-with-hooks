import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, deleted, edited, clearItems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              deleted={deleted}
              edited={edited}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          Clear Expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
