import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, CheckCircle2, Sparkles, RefreshCw, BarChart2, ShieldCheck, Play, Pause } from 'lucide-react';

interface HeroLiveAnimationProps {
  onNotify: (msg: string) => void;
}

export const HeroLiveAnimation: React.FC<HeroLiveAnimationProps> = ({ onNotify }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeNode, setActiveNode] = useState<string>('cuda');
  const [latency, setLatency] = useState<number>(18.4);
  const [tflops, setTflops] = useState<number>(4.8);
  const [executionCount, setExecutionCount] = useState<number>(142089);
  const [pulseKey, setPulseKey] = useState<number>(0);

  // Live latency & counter jitter simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setLatency(+(16 + Math.random() * 4.5).toFixed(1));
      setExecutionCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      setPulseKey(prev => prev + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nodes = [
    {
      id: 'input',
      title: '1. User Prompt Input',
      desc: 'Talk Assistant Instruction Stream',
      metric: '0.2ms Ingestion',
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500/50',
    },
    {
      id: 'cuda',
      title: '2. Sub-20ms CUDA Core',
      desc: 'Python 3.11 + TensorFlow 2.16 GPU',
      metric: `${latency}ms Latency`,
      color: 'from-indigo-600 to-purple-600',
      borderColor: 'border-indigo-500/80',
    },
    {
      id: 'gemini',
      title: '3. Gemini 3.6 Flash AI',
      desc: 'Real-time Reasoning & Verification',
      metric: `${tflops} TFLOPS Compute`,
      color: 'from-purple-600 to-pink-600',
      borderColor: 'border-purple-500/50',
    },
    {
      id: 'output',
      title: '4. Instant Output Synthesis',
      desc: 'Campaigns, Code, Email & Pitch',
      metric: '100% Verified Response',
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/50',
    },
  ];

  const handleNodeClick = (nodeId: string, title: string) => {
    setActiveNode(nodeId);
    if (nodeId === 'cuda') setTflops(8.2);
    else if (nodeId === 'gemini') setTflops(12.4);
    else setTflops(4.8);
    onNotify(`Activated ${title} visual inspector node! Real-time metrics updated.`);
  };

  return (
    <div className="bg-[#0a0a0a] border-2 border-indigo-500/40 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden font-sans space-y-6">
      {/* Background glowing matrix gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-purple-950/20 pointer-events-none" />
      
      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                LIVE SUB-20ms AI CUDA PIPELINE
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] bg-green-500/10 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                Live Engine Active
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Interactive visual matrix showing real-time instruction passing through Kentra AI's Python GPU core.
            </p>
          </div>
        </div>

        {/* Live Metrics & Play/Pause Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-[#121212] border border-[#222] px-3 py-1.5 rounded-xl text-right font-mono">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Pipeline Latency</div>
            <div className="text-sm font-bold text-green-400">{latency} ms</div>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] border border-[#333] text-gray-300 hover:text-white transition-colors cursor-pointer"
            title={isPlaying ? "Pause visual simulation" : "Play visual simulation"}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-green-400" />}
          </button>
        </div>
      </div>

      {/* Interactive Node Pipeline Canvas/Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node.id, node.title)}
              className={`p-4 rounded-xl bg-[#0f0f12] border transition-all cursor-pointer relative overflow-hidden group ${
                isActive
                  ? `${node.borderColor} shadow-lg shadow-indigo-600/20 ring-1 ring-indigo-500/50 scale-[1.02]`
                  : 'border-[#222] hover:border-[#444]'
              }`}
            >
              {/* Particle Pulse Wave Overlay */}
              {isPlaying && isActive && (
                <div
                  key={pulseKey}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse pointer-events-none"
                />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-gradient-to-r ${node.color} text-white shadow-sm`}>
                  {node.metric}
                </span>
                {isActive && <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />}
              </div>

              <h4 className="text-xs font-bold text-white font-display mb-1 group-hover:text-indigo-300 transition-colors">
                {node.title}
              </h4>
              <p className="text-[11px] text-gray-400 leading-snug">{node.desc}</p>

              {/* Node Connection Arrow */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-gray-500 border-t border-[#1a1a1a] pt-2">
                <span>Node Status</span>
                <span className="text-green-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Graph & Live Activity Stream Bar */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
        {/* Realtime Wave Monitor */}
        <div className="lg:col-span-2 bg-[#080808] border border-[#222] rounded-xl p-4 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-gray-400 border-b border-[#1f1f1f] pb-2">
            <span className="flex items-center gap-1.5 text-white font-bold font-display">
              <BarChart2 className="w-4 h-4 text-indigo-400" />
              Sub-20ms Response Time Benchmark Wave
            </span>
            <span className="text-[10px] text-indigo-400">99.99% Hardware Uptime</span>
          </div>

          <div className="h-20 flex items-end justify-between gap-1 pt-2">
            {[18.2, 19.1, 17.5, 18.8, 16.9, 19.4, 18.1, 17.8, 18.5, 19.0, 17.2, 18.4, 19.3, 17.9, 18.6, 17.4, 18.8, 18.0, 17.6, 18.3].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  className={`w-full rounded-t transition-all duration-500 ${
                    i % 2 === 0 ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-purple-500 hover:bg-purple-400'
                  }`}
                  style={{ height: `${((val - 12) / 10) * 100}%` }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1">
            <span>0ms</span>
            <span className="text-green-400 font-bold">Target Latency: &lt; 20ms (Avg {latency}ms)</span>
            <span>30ms</span>
          </div>
        </div>

        {/* Live Executions Counter & Trust Info */}
        <div className="bg-[#080808] border border-[#222] rounded-xl p-4 flex flex-col justify-between space-y-3 font-sans">
          <div>
            <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Total Micro-Executions</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight text-indigo-400">
              {executionCount.toLocaleString()}
            </div>
            <p className="text-[11px] text-gray-400 mt-1 leading-snug">
              Prompts and work instructions executed with sub-20ms speed globally.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-300 font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
            <span>Zero-Data Retention Policy: Your prompts remain 100% private.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
