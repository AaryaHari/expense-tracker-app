import React, { useState } from 'react';

export default function Reports() {
  const [month, setMonth] = useState('');

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

  return (
    <div>
      <h2>Reports</h2>
      <input type="month" value={month} onChange={e => setMonth(e.target.value)} />
      <button onClick={download}>Download PDF</button>
    </div>
  );
}
