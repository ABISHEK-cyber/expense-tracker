// src/components/ExpenseList.js
import React from "react";

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  if (!expenses || expenses.length === 0) return <p>No expenses yet.</p>;
  return (
    <div className="list">
      {expenses.map(exp => (
        <div key={exp.id} className="item">
          <div>
            <strong>{exp.title}</strong>
            <div className="muted">{exp.category} • {new Date(exp.createdAt?.seconds * 1000).toLocaleDateString()}</div>
          </div>
          <div className="right">
            <span className="amount">₹{exp.amount}</span>
            <button className="btn small" onClick={()=>onEdit(exp)}>Edit</button>
            <button className="btn small danger" onClick={()=>onDelete(exp.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
