import React from 'react';
import { Activity, Move, ListOrdered, Sparkles, Zap, Star } from 'lucide-react';

interface StatsCardProps {
  totalMovement: number;
  sequence: number[];
  algorithm: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ totalMovement, sequence, algorithm }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass rounded-[2rem] p-6 flex items-start space-x-4">
        <div className="bg-rose-100 p-3 rounded-2xl">
          <Sparkles className="text-rose-500" size={24} />
        </div>
        <div>
          <p className="text-sm font-bold text-rose-300 uppercase tracking-wider">Algorithm</p>
          <p className="text-2xl font-bold text-rose-500">{algorithm}</p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-6 flex items-start space-x-4">
        <div className="bg-indigo-100 p-3 rounded-2xl">
          <Zap className="text-indigo-500" size={24} />
        </div>
        <div>
          <p className="text-sm font-bold text-indigo-300 uppercase tracking-wider">Total Movement</p>
          <p className="text-2xl font-bold text-indigo-500">{totalMovement} <span className="text-sm font-medium">tracks</span></p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-6 flex items-start space-x-4 overflow-hidden">
        <div className="bg-amber-100 p-3 rounded-2xl">
          <Star className="text-amber-500" size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-amber-300 uppercase tracking-wider">Seek Sequence</p>
          <p className="text-lg font-mono font-bold text-amber-600 truncate">
            {sequence.join(' ➜ ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
