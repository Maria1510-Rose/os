import React, { useState } from 'react';
import { ArrowLeftRight, Play, Heart } from 'lucide-react';

interface InputFormProps {
  onSimulate: (data: {
    diskSize: number;
    head: number;
    requests: number[];
    direction: 'left' | 'right';
  }) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSimulate }) => {
  const [diskSize, setDiskSize] = useState<number>(200);
  const [head, setHead] = useState<number>(50);
  const [requestsStr, setRequestsStr] = useState<string>("82, 170, 43, 140, 24, 16, 190");
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const requests = requestsStr
      .split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n));

    if (requests.length === 0) {
      setError("Oops! Please enter some track numbers. ✨");
      return;
    }

    if (head < 0 || head >= diskSize) {
      setError(`Head position must be between 0 and ${diskSize - 1}. 🌸`);
      return;
    }

    const invalidRequests = requests.filter(r => r < 0 || r >= diskSize);
    if (invalidRequests.length > 0) {
      setError(`Tracks must be between 0 and ${diskSize - 1}. Invalid: ${invalidRequests.join(', ')} 🎀`);
      return;
    }

    onSimulate({ diskSize, head, requests, direction });
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-rose-400 ml-1">Total Disk Size</label>
          <input
            type="number"
            value={diskSize}
            onChange={(e) => setDiskSize(parseInt(e.target.value))}
            className="input-field w-full"
            placeholder="e.g. 200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-rose-400 ml-1">Initial Head Position</label>
          <input
            type="number"
            value={head}
            onChange={(e) => setHead(parseInt(e.target.value))}
            className="input-field w-full"
            placeholder="e.g. 50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-rose-400 ml-1">Disk Request Queue</label>
        <textarea
          value={requestsStr}
          onChange={(e) => setRequestsStr(e.target.value)}
          className="input-field w-full h-24 resize-none"
          placeholder="e.g. 82, 170, 43, 140, 24, 16, 190"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-bold text-rose-400">Direction</label>
          <div className="flex bg-rose-50 rounded-2xl p-1 border-2 border-rose-100">
            <button
              type="button"
              onClick={() => setDirection('left')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                direction === 'left' ? 'bg-rose-400 text-white shadow-md' : 'text-rose-300 hover:text-rose-400'
              }`}
            >
              Left
            </button>
            <button
              type="button"
              onClick={() => setDirection('right')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                direction === 'right' ? 'bg-rose-400 text-white shadow-md' : 'text-rose-300 hover:text-rose-400'
              }`}
            >
              Right
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center">
          <Heart size={18} fill="currentColor" />
          <span>Simulate!</span>
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border-2 border-rose-100 text-rose-500 text-sm p-4 rounded-2xl font-bold animate-pulse">
          {error}
        </div>
      )}
    </form>
  );
};

export default InputForm;
