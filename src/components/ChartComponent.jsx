// src/components/ChartComponent.jsx
import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#89CFF0', '#6BAED6', '#AEDFF7', '#c2e0f4'];

const ChartComponent = ({ title, type, data }) => (
  <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', flex: 1 }}>
    <h4>{title}</h4>
    <ResponsiveContainer width="100%" height={200}>
      {type === 'pie' ? (
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#6BAED6" />
        </BarChart>
      )}
    </ResponsiveContainer>
  </div>
);

export default ChartComponent;
