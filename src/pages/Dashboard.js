import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food', amount: 25 },
    { id: 2, category: 'Transport', amount: 10 },
    { id: 3, category: 'Shopping', amount: 50 }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [editId, setEditId] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const chartData = {
    labels: expenses.map(e => e.category),
    datasets: [
      {
        label: 'Expenses ($)',
        data: expenses.map(e => e.amount),
        backgroundColor: 'rgba(0, 200, 255, 0.8)',
        borderRadius: 5,
        hoverBackgroundColor: 'rgba(0, 255, 200, 1)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#ddd' } },
      title: {
        display: true,
        text: 'Expenses Overview',
        color: '#eee',
        font: { size: 20, weight: 'bold' }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#222',
        titleColor: '#0ff',
        bodyColor: '#fff',
        cornerRadius: 4
      }
    },
    scales: {
      x: { ticks: { color: '#aaa' }, grid: { color: '#333' } },
      y: {
        beginAtZero: true,
        ticks: { color: '#aaa' },
        grid: { color: '#333' }
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully');
      // optionally redirect to login
    } catch (error) {
      alert('Logout failed: ' + error.message);
    }
  };

  const addExpense = e => {
    e.preventDefault();
    if (!newCategory.trim() || !newAmount || isNaN(newAmount) || newAmount <= 0) return;

    setExpenses(prev => [
      ...prev,
      { id: Date.now(), category: newCategory.trim(), amount: Number(newAmount) }
    ]);
    setNewCategory('');
    setNewAmount('');
  };

  const startEdit = (id, category, amount) => {
    setEditId(id);
    setEditCategory(category);
    setEditAmount(amount);
  };

  const saveEdit = id => {
    if (!editCategory.trim() || !editAmount || isNaN(editAmount) || editAmount <= 0) return;

    setExpenses(prev =>
      prev.map(e =>
        e.id === id ? { ...e, category: editCategory.trim(), amount: Number(editAmount) } : e
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditCategory('');
    setEditAmount('');
  };

  const deleteExpense = id => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#eee',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '30px 15px',
        maxWidth: 900,
        margin: '0 auto'
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: '900', color: '#00e5ff' }}>Your Dashboard 🎉</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#00b8d4',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 6,
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#00e5ff')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00b8d4')}
        >
          Logout
        </button>
      </header>

      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 30,
          gap: 20,
          flexWrap: 'wrap'
        }}
      >
        {/* Total spent card */}
        <div
          style={{
            flex: '1 1 250px',
            backgroundColor: '#222',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 0 15px #00e5ff88',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontWeight: '900', fontSize: 24, marginBottom: 8 }}>Total Spent</h2>
          <p style={{ fontSize: 30, fontWeight: 'bold', color: '#00e5ff' }}>${total.toFixed(2)}</p>
        </div>

        {/* Add new expense */}
        <form
          onSubmit={addExpense}
          style={{
            flex: '1 1 350px',
            backgroundColor: '#222',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 0 15px #00e5ff88',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <h2 style={{ fontWeight: '900', fontSize: 20, marginBottom: 10 }}>Add New Expense</h2>
          <input
            type="text"
            placeholder="Category"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: 6,
              border: 'none',
              outline: 'none',
              fontSize: 16
            }}
            required
          />
          <input
            type="number"
            min="0"
            placeholder="Amount"
            value={newAmount}
            onChange={e => setNewAmount(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: 6,
              border: 'none',
              outline: 'none',
              fontSize: 16
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              borderRadius: 6,
              border: 'none',
              backgroundColor: '#00e5ff',
              fontWeight: '700',
              color: '#121212',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#00b8d4')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00e5ff')}
          >
            Add Expense
          </button>
        </form>
      </section>

      {/* Bar Chart */}
      <section
        style={{
          marginTop: 40,
          backgroundColor: '#222',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 0 15px #00e5ff88'
        }}
      >
        <Bar data={chartData} options={chartOptions} />
      </section>

      {/* Expense list */}
      <section
        style={{
          marginTop: 40,
          backgroundColor: '#222',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 0 15px #00e5ff88'
        }}
      >
        <h2 style={{ fontWeight: '900', marginBottom: 20, color: '#00e5ff' }}>Recent Expenses</h2>
        {expenses.length === 0 && <p>No expenses added yet.</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {expenses.map(e =>
            editId === e.id ? (
              <li
                key={e.id}
                style={{
                  display: 'flex',
                  gap: 12,
                  marginBottom: 12,
                  alignItems: 'center'
                }}
              >
                <input
                  type="text"
                  value={editCategory}
                  onChange={e => setEditCategory(e.target.value)}
                  style={{
                    flex: 1,
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid #00e5ff',
                    backgroundColor: '#121212',
                    color: '#eee'
                  }}
                />
                <input
                  type="number"
                  min="0"
                  value={editAmount}
                  onChange={e => setEditAmount(e.target.value)}
                  style={{
                    width: 100,
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid #00e5ff',
                    backgroundColor: '#121212',
                    color: '#eee'
                  }}
                />
                <button
                  onClick={() => saveEdit(e.id)}
                  style={{
                    backgroundColor: '#00e676',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 12px',
                    cursor: 'pointer',
                    color: '#121212',
                    fontWeight: '700'
                  }}
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  style={{
                    backgroundColor: '#f44336',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 12px',
                    cursor: 'pointer',
                    color: '#fff',
                    fontWeight: '700'
                  }}
                >
                  Cancel
                </button>
              </li>
            ) : (
              <li
                key={e.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                  padding: '8px 12px',
                  borderRadius: 8,
                  backgroundColor: '#333',
                  alignItems: 'center'
                }}
              >
                <span>
                  <strong>{e.category}</strong>: ${e.amount.toFixed(2)}
                </span>
                <span>
                  <button
                    onClick={() => startEdit(e.id, e.category, e.amount)}
                    style={{
                      backgroundColor: '#00bcd4',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 10px',
                      marginRight: 8,
                      cursor: 'pointer',
                      color: '#fff',
                      fontWeight: '700'
                    }}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteExpense(e.id)}
                    style={{
                      backgroundColor: '#e91e63',
                      border: 'none',
                      borderRadius: 6,
                      padding: '6px 10px',
                      cursor: 'pointer',
                      color: '#fff',
                      fontWeight: '700'
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </span>
              </li>
            )
          )}
        </ul>
      </section>
    </div>
  );
}
