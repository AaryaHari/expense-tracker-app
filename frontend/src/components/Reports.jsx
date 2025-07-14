import React, { useState } from 'react';

export default function Reports() {
  const [month, setMonth] = useState('');
  const [summary, setSummary] = useState({ totalCredit: 0, totalDebit: 0 });

  const download = async () => {
    const res = await fetch(`http://localhost:3001/report/${month}`);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${month}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const fetchSummary = async (m) => {
    if (!m) return;
    const res = await fetch(`http://localhost:3001/reportSummary/${m}`);
    if (res.ok) {
      const json = await res.json();
      setSummary(json);
    }
  };

  return (
    <div>
      <h2>Reports</h2>
      <input
        type="month"
        value={month}
        onChange={(e) => {
          setMonth(e.target.value);
          fetchSummary(e.target.value);
        }}
      />
      <button onClick={download}>Download PDF</button>
      <div>
        <p>Total Credit: {summary.totalCredit.toFixed(2)}</p>
        <p>Total Debit: {summary.totalDebit.toFixed(2)}</p>
      </div>
    </div>
  );
}
