import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  XAxisProps,
  YAxisProps
} from 'recharts';

interface DiskChartProps {
  data: { track: number; order: number }[];
  diskSize: number;
}

const DiskChart: React.FC<DiskChartProps> = ({ data, diskSize }) => {
  // Add a small padding to the Y axis so the first and last points aren't cut off
  const chartData = data.map(d => ({ ...d, z: 100 }));

  return (
    <div className="w-full h-[500px] glass rounded-[2rem] p-8">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 40, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="8 8" stroke="#fce7f3" vertical={true} horizontal={true} />
          <XAxis
            type="number"
            dataKey="track"
            name="Track"
            domain={[0, diskSize]}
            stroke="#fda4af"
            tick={{ fill: '#fb7185', fontSize: 12, fontWeight: 600 }}
            tickLine={{ stroke: '#fda4af' }}
            axisLine={{ stroke: '#fda4af', strokeWidth: 2 }}
            label={{ value: 'Disk Track Number', position: 'bottom', offset: 20, fill: '#fb7185', fontSize: 14, fontWeight: 700 }}
          />
          <YAxis
            type="number"
            dataKey="order"
            name="Service Order"
            reversed
            domain={['auto', 'auto']}
            stroke="#fda4af"
            tick={{ fill: '#fb7185', fontSize: 12, fontWeight: 600 }}
            tickLine={{ stroke: '#fda4af' }}
            axisLine={{ stroke: '#fda4af', strokeWidth: 2 }}
            label={{ value: 'Time Sequence (Top to Bottom)', angle: -90, position: 'insideLeft', offset: 0, fill: '#fb7185', fontSize: 14, fontWeight: 700 }}
          />
          <ZAxis type="number" dataKey="z" range={[100, 100]} />
          <Tooltip
            cursor={{ stroke: '#f472b6', strokeDasharray: '5 5' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '2px solid #fecdd3',
              borderRadius: '16px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              color: '#e11d48'
            }}
          />
          <Scatter
            name="Head Movement"
            data={chartData}
            fill="#fb7185"
            line={{ stroke: '#f472b6', strokeWidth: 4, strokeLinecap: 'round' }}
            lineType="joint"
            shape="circle"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 0 ? '#f43f5e' : index === chartData.length - 1 ? '#10b981' : '#fb7185'} 
                r={index === 0 || index === chartData.length - 1 ? 8 : 5}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiskChart;
