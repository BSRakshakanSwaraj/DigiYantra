import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend } from
'recharts';
import { Card } from '../ui/Card';
const data = [
{
  name: 'Open',
  value: 24,
  color: '#f97316'
},
{
  name: 'In Progress',
  value: 18,
  color: '#f59e0b'
},
{
  name: 'Resolved',
  value: 94,
  color: '#0d9488'
},
{
  name: 'Closed',
  value: 6,
  color: '#9ca3af'
} // Gray
];
export function DonutChart() {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <Card className="h-full min-h-[300px] flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Complaint Distribution
      </h3>
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value">

              {data.map((entry, index) =>
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                strokeWidth={0} />

              )}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)'
              }} />

            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-3xl font-bold text-gray-900">{total}</span>
          <span className="text-xs text-gray-500 uppercase font-medium">
            Total
          </span>
        </div>
      </div>
    </Card>);

}