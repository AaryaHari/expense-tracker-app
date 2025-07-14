import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Summary() {
  const [groupBy, setGroupBy] = useState('month');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`http://localhost:3001/summary/${groupBy}`);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => { fetchData(); }, [groupBy]);

  return (
    <div>
      <h2>Summary</h2>
      <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
        <option value="month">Month</option>
        <option value="type">Type</option>
        <option value="mode">Mode</option>
      </select>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
