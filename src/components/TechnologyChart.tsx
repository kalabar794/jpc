'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const data = [
  { name: 'Next.js', value: 35 },
  { name: 'TypeScript', value: 25 },
  { name: 'React', value: 20 },
  { name: 'Tailwind CSS', value: 15 },
  { name: 'Other', value: 5 },
]

const COLORS = ['#000000', '#3178C6', '#61DAFB', '#06B6D4', '#9CA3AF']

export default function TechnologyChart() {
  return (
    <div className="w-full h-[400px]">
      <h3 className="text-xl font-semibold mb-4">Technology Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}