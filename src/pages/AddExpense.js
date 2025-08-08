// src/pages/AddExpense.js
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const { currentUser } = useAuth();
  const nav = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      await addDoc(collection(db, "expenses"), {
        uid: currentUser.uid,
        title,
        amount: parseFloat(amount),
        category,
        createdAt: serverTimestamp()
      });
      nav("/dashboard");
    } catch (err) {
      setError("Failed to add expense");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h2>Add Expense</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="form-col">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" type="number" required />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
        <button className="btn">Add</button>
      </form>
    </div>
  );
}
