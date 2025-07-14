import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm.jsx';
import Summary from '../components/Summary.jsx';
import Reports from '../components/Reports.jsx';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Add/Update</Link> |{' '}
        <Link to="/summary">Summary</Link> |{' '}
        <Link to="/reports">Reports</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ExpenseForm />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
