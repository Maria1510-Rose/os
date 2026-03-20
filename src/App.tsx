import React, { useState } from 'react';
import { RefreshCw, BarChart3, Settings2, BookOpen, Heart, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import InputForm from './components/InputForm';
import DiskChart from './components/DiskChart';
import StatsCard from './components/StatsCard';
import { scanAlgorithm, fcfsAlgorithm, sstfAlgorithm, SimulationResult } from './lib/algorithms';

export default function App() {
  const [simulation, setSimulation] = useState<{
    scan: SimulationResult;
    fcfs: SimulationResult;
    sstf: SimulationResult;
    diskSize: number;
    head: number;
    requests: number[];
    direction: 'left' | 'right';
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'SCAN' | 'FCFS' | 'SSTF'>('SCAN');

  const handleSimulate = (data: {
    diskSize: number;
    head: number;
    requests: number[];
    direction: 'left' | 'right';
  }) => {
    const scan = scanAlgorithm(data.requests, data.head, data.diskSize, data.direction);
    const fcfs = fcfsAlgorithm(data.requests, data.head);
    const sstf = sstfAlgorithm(data.requests, data.head);

    setSimulation({
      scan,
      fcfs,
      sstf,
      ...data
    });
  };

  const currentResult = simulation ? (
    activeTab === 'SCAN' ? simulation.scan :
    activeTab === 'FCFS' ? simulation.fcfs :
    simulation.sstf
  ) : null;

  const chartData = currentResult?.sequence.map((track, index) => ({
    track,
    order: index
  })) || [];

  return (
    <div className="min-h-screen bg-[#fff5f7] p-6 md:p-12 selection:bg-rose-200 selection:text-rose-700">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="bg-rose-400 p-3 rounded-[1.5rem] shadow-lg shadow-rose-200"
              >
                <Heart className="text-white" size={28} fill="currentColor" />
              </motion.div>
              <h1 className="text-4xl font-black tracking-tight text-rose-500">
                SCAN Scheduling <span className="text-indigo-400">Visualizer</span>
              </h1>
            </div>
            <p className="text-rose-300 font-bold max-w-2xl text-lg">
              A super cute tool to learn how disk heads move! 🌸 
              Watch the <span className="text-rose-400 underline decoration-wavy decoration-2 underline-offset-4">Elevator Algorithm</span> dance across the tracks.
            </p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSimulation(null)}
            className="btn-secondary flex items-center space-x-2 group"
          >
            <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            <span>Start Over!</span>
          </motion.button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar / Inputs */}
          <div className="lg:col-span-4 space-y-10">
            <section className="space-y-4">
              <div className="flex items-center space-x-2 text-rose-300 ml-2">
                <Settings2 size={20} />
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">Settings</h2>
              </div>
              <InputForm onSimulate={handleSimulate} />
            </section>

            <section className="glass rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-10">
                <Star size={120} fill="#fb7185" />
              </div>
              <div className="flex items-center space-x-2 text-rose-400">
                <BookOpen size={20} />
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">How it works</h2>
              </div>
              <div className="space-y-4 text-zinc-600 leading-relaxed font-medium">
                <p>
                  <strong className="text-rose-400">SCAN Algorithm:</strong> Imagine an elevator! 🛗 It goes all the way up, then all the way down, picking up everyone on the way.
                </p>
                <div className="flex items-start space-x-3 bg-rose-50 p-4 rounded-2xl border-2 border-rose-100">
                  <Sparkles className="text-rose-400 shrink-0 mt-1" size={20} />
                  <p className="text-sm italic text-rose-500 font-bold">
                    This makes sure nobody waits too long! It's super efficient and fair. ✨
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-8 space-y-10">
            <AnimatePresence mode="wait">
              {!simulation ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="h-full flex flex-col items-center justify-center glass rounded-[3rem] p-16 text-center space-y-8 border-dashed border-4 border-rose-100"
                >
                  <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="bg-rose-50 p-10 rounded-full shadow-inner"
                  >
                    <Star size={64} className="text-rose-200" fill="currentColor" />
                  </motion.div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-rose-400">Ready for Magic?</h3>
                    <p className="text-rose-300 font-bold max-w-sm mx-auto">
                      Fill in the tracks on the left and click the heart button to start the show! 🎀
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-10"
                >
                  {/* Algorithm Tabs */}
                  <div className="flex bg-rose-50 p-1.5 rounded-2xl border-2 border-rose-100 w-fit shadow-sm">
                    {(['SCAN', 'FCFS', 'SSTF'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                          activeTab === tab 
                            ? 'bg-rose-400 text-white shadow-lg' 
                            : 'text-rose-300 hover:text-rose-400'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Stats */}
                  <StatsCard 
                    totalMovement={currentResult!.totalMovement}
                    sequence={currentResult!.sequence}
                    algorithm={activeTab}
                  />

                  {/* Chart */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                      <h3 className="text-xl font-black text-rose-500 flex items-center gap-2">
                        <Sparkles size={20} />
                        Movement Path
                      </h3>
                      <div className="flex items-center space-x-6 text-xs font-bold text-rose-300">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-rose-500 shadow-sm" />
                          <span>Start</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm" />
                          <span>End</span>
                        </div>
                      </div>
                    </div>
                    <DiskChart data={chartData} diskSize={simulation.diskSize} />
                  </div>

                  {/* Comparison Table */}
                  <div className="glass rounded-[2.5rem] overflow-hidden border-2 border-rose-100">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-rose-50/50 border-b-2 border-rose-100">
                        <tr>
                          <th className="px-8 py-5 font-black text-rose-400 uppercase tracking-widest">Algorithm</th>
                          <th className="px-8 py-5 font-black text-rose-400 uppercase tracking-widest">Total Movement</th>
                          <th className="px-8 py-5 font-black text-rose-400 uppercase tracking-widest">Rank</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-rose-50">
                        {[
                          { name: 'SCAN', val: simulation.scan.totalMovement },
                          { name: 'FCFS', val: simulation.fcfs.totalMovement },
                          { name: 'SSTF', val: simulation.sstf.totalMovement },
                        ].sort((a, b) => a.val - b.val).map((algo, idx) => (
                          <tr key={algo.name} className={algo.name === activeTab ? 'bg-rose-100/30' : 'hover:bg-rose-50/50 transition-colors'}>
                            <td className="px-8 py-5 font-bold text-zinc-700">{algo.name}</td>
                            <td className="px-8 py-5 font-mono font-bold text-rose-500">{algo.val} tracks</td>
                            <td className="px-8 py-5">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                idx === 0 ? 'bg-rose-400 text-white shadow-md' : 'bg-indigo-100 text-indigo-400'
                              }`}>
                                {idx === 0 ? '✨ Best ✨' : `${idx + 1}th`}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className="pt-12 border-t-2 border-rose-100 text-center text-rose-300 font-bold text-sm">
          <p>Made with 💖 for happy learning • 2026</p>
        </footer>
      </div>
    </div>
  );
}
