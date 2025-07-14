import React, { useState, useEffect } from 'react';

const types = ['Groceries', 'Food', 'Beverage', 'Clothes', 'Shoes', 'Home', 'Electronics', 'Shopping', 'Subscription'];
const modes = ['Bank', 'Chase', 'Discover'];
const transTypes = ['Credit', 'Debit'];

export default function ExpenseForm() {
  const [form, setForm] = useState({
    item: '',
    amount: '',
    type: types[0],
    quantity: 1,
    mode: modes[0],
    date: '',
    transType: 'Debit',
  });
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState({ Bank: 0, Chase: 0, Discover: 0, total: 0 });

  const computeBalances = (items) => {
    let bank = 0,
      chase = 0,
      discover = 0,
      total = 0;
    items.forEach((e) => {
      const sign = e.transType === 'Credit' ? 1 : -1;
      const amt = parseFloat(e.amount || 0) * sign;
      if (e.mode === 'Bank') bank += amt;
      if (e.mode === 'Chase') chase += amt;
      if (e.mode === 'Discover') discover += amt;
      total += amt;
    });
    setBalances({ Bank: bank, Chase: chase, Discover: discover, total });
  };

  useEffect(() => {
    fetch('http://localhost:3001/expenses')
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        computeBalances(data);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = async () => {
    const res = await fetch('http://localhost:3001/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const { id } = await res.json();
      const updated = [...expenses, { ...form, id }];
      setExpenses(updated);
      computeBalances(updated);
    }
  };

  const deleteExpense = async (id) => {
    await fetch(`http://localhost:3001/expenses/${id}`, { method: 'DELETE' });
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    computeBalances(updated);
  };

  return (
    <div>
      <h2>Add/Update Expense</h2>
      <div>
        <span>Bank Balance: {balances.Bank.toFixed(2)} </span>
        <span>Chase: {balances.Chase.toFixed(2)} </span>
        <span>Discover: {balances.Discover.toFixed(2)} </span>
        <span>Total Expense: {balances.total.toFixed(2)}</span>
      </div>
      <div>
        <input name="item" value={form.item} onChange={handleChange} placeholder="Item" />
        <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} placeholder="Amount" />
        <select name="type" value={form.type} onChange={handleChange}>{types.map(t => <option key={t}>{t}</option>)}</select>
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} />
        <select name="mode" value={form.mode} onChange={handleChange}>{modes.map(m => <option key={m}>{m}</option>)}</select>
        <select name="transType" value={form.transType} onChange={handleChange}>{transTypes.map(t => <option key={t}>{t}</option>)}</select>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <button onClick={addExpense}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sr</th>
            <th>Item</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Mode</th>
            <th>Trans</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={e.id}>
              <td>{i + 1}</td>
              <td>{e.item}</td>
              <td>{e.amount}</td>
              <td>{e.type}</td>
              <td>{e.quantity}</td>
              <td>{e.mode}</td>
              <td>{e.transType}</td>
              <td>{e.date}</td>
              <td><button onClick={() => deleteExpense(e.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
