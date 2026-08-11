import React from 'react';
import { Cpu, Zap, ShieldCheck, Sparkles, Terminal, DollarSign, CheckCircle2, MessageSquare } from 'lucide-react';
import { GPUStats } from '../types';

interface HeaderProps {
  activeTab: 'campaign' | 'python-gpu' | 'copilot' | 'monetization' | 'uniqueness';
  setActiveTab: (tab: 'campaign' | 'python-gpu' | 'copilot' | 'monetization' | 'uniqueness') => void;
  gpuStats: GPUStats | null;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, gpuStats }) => {
  return (
    <header className="bg-[#0a0a0a] border-b border-[#222] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Branding & Live GPU Pulse */}
        <div className="py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-black text-white text-xs font-mono">NY</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tighter text-white font-mono">
                  NYXVEL<span className="text-indigo-500">.AI</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-medium bg-indigo-900/20 text-indigo-400 border border-indigo-500/20 rounded">
                  100% UNIQUE BRAND
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                High-Speed AI Marketing &amp; Growth Engine • Python + TensorFlow CUDA Cluster
              </p>
            </div>
          </div>

          {/* GPU Metrics Pill */}
          <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#333] px-3.5 py-1.5 rounded-full text-xs">
            <div className="flex items-center gap-2 border-r border-[#333] pr-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-500 font-mono text-[11px] font-semibold">SYSTEM_READY</span>
            </div>

            <div className="flex items-center gap-4 text-gray-300 font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>{gpuStats?.inferenceLatencyMs || '16.8'} ms</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-gray-400">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>{gpuStats?.tokensPerSecond || '154'} tokens/s</span>
              </div>
              <div className="hidden lg:flex items-center gap-1.5 text-purple-400">
                <span>TF 2.16 • CUDA 12.2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto space-x-6 border-t border-[#222] pt-1.5 pb-2 text-sm font-medium text-gray-400 scrollbar-none">
          <button
            onClick={() => setActiveTab('campaign')}
            className={`flex items-center space-x-2 py-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'campaign'
                ? 'text-white border-indigo-500 font-semibold'
                : 'border-transparent hover:text-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Autonomous Campaign Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('python-gpu')}
            className={`flex items-center space-x-2 py-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'python-gpu'
                ? 'text-white border-indigo-500 font-semibold'
                : 'border-transparent hover:text-gray-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Python &amp; TensorFlow GPU Core</span>
          </button>

          <button
            onClick={() => setActiveTab('copilot')}
            className={`flex items-center space-x-2 py-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'copilot'
                ? 'text-white border-indigo-500 font-semibold'
                : 'border-transparent hover:text-gray-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Co-Founder AI Copilot</span>
          </button>

          <button
            onClick={() => setActiveTab('monetization')}
            className={`flex items-center space-x-2 py-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'monetization'
                ? 'text-white border-indigo-500 font-semibold'
                : 'border-transparent hover:text-gray-200'
            }`}
          >
            <DollarSign className="w-4 h-4 text-indigo-400" />
            <span>Monetization &amp; Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('uniqueness')}
            className={`flex items-center space-x-2 py-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'uniqueness'
                ? 'text-white border-indigo-500 font-semibold'
                : 'border-transparent hover:text-gray-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>Unique Name Proof</span>
          </button>
        </div>
      </div>
    </header>
  );
};
