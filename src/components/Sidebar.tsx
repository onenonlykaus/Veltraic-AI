import React, { useState } from 'react';
import { 
  Home, 
  Layers, 
  Cpu, 
  Bot, 
  DollarSign, 
  ShieldCheck, 
  Plus, 
  MessageSquare, 
  PanelLeftClose, 
  PanelLeft, 
  Trash2,
  Sparkles
} from 'lucide-react';
import { GPUStats } from '../types';

export interface RecentItem {
  id: string;
  title: string;
  tab: 'landing' | 'chat' | 'campaign' | 'python-gpu' | 'copilot' | 'monetization' | 'uniqueness';
  timestamp: string;
}

import { UserAccount } from './AuthModal';

interface SidebarProps {
  activeTab: 'landing' | 'chat' | 'campaign' | 'python-gpu' | 'copilot' | 'monetization' | 'uniqueness';
  setActiveTab: (tab: 'landing' | 'chat' | 'campaign' | 'python-gpu' | 'copilot' | 'monetization' | 'uniqueness') => void;
  gpuStats: GPUStats | null;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onNewCampaign: () => void;
  currentUser: UserAccount | null;
  onOpenAuth: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  gpuStats,
  collapsed,
  setCollapsed,
  onNewCampaign,
  currentUser,
  onOpenAuth
}) => {
  // Recent items state
  const [recents, setRecents] = useState<RecentItem[]>([
    { id: '1', title: 'Talk AI Assistant Thread', tab: 'chat', timestamp: 'Just now' },
    { id: '2', title: 'SaaS Growth Plan #1', tab: 'campaign', timestamp: '2m ago' },
    { id: '3', title: 'Python GPU CUDA Export', tab: 'python-gpu', timestamp: '1h ago' },
    { id: '4', title: 'Pricing & Growth Strategy', tab: 'monetization', timestamp: '3h ago' },
    { id: '5', title: 'Veltraic Copilot Q&A', tab: 'copilot', timestamp: 'Yesterday' },
  ]);

  const removeRecent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setRecents(prev => prev.filter(r => r.id !== id));
  };

  const navItems = [
    { id: 'landing', label: 'Home Overview', icon: Home },
    { id: 'chat', label: 'Talk AI Assistant', icon: MessageSquare },
    { id: 'campaign', label: 'Autonomous Campaign Studio', icon: Layers },
    { id: 'python-gpu', label: 'Python & GPU Core', icon: Cpu },
    { id: 'copilot', label: 'Co-Founder AI Copilot', icon: Bot },
    { id: 'monetization', label: 'Monetization Plans', icon: DollarSign },
    { id: 'uniqueness', label: 'Name Uniqueness Record', icon: ShieldCheck },
  ] as const;

  return (
    <aside 
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0d0f1f] border-r border-[#1e2438] flex flex-col justify-between transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64 sm:w-72'
      }`}
    >
      {/* Top Header Section */}
      <div className="p-3 border-b border-[#1e2438] flex items-center justify-between gap-2">
        {!collapsed && (
          <button 
            onClick={() => setActiveTab('landing')} 
            className="flex items-center gap-2.5 overflow-hidden text-left hover:opacity-80 transition-opacity cursor-pointer"
            title="Go to Home Overview"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-display font-black text-sm shrink-0 shadow-md shadow-indigo-600/30">
              VE
            </div>
            <div className="truncate">
              <div className="font-display font-extrabold text-sm text-white tracking-tight flex items-center gap-1">
                VELTRAIC<span className="text-indigo-400">.AI</span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono truncate">
                Sub-20ms Intelligence
              </div>
            </div>
          </button>
        )}

        {collapsed && (
          <button 
            onClick={() => setActiveTab('landing')} 
            className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-display font-black text-sm mx-auto shadow-md shadow-indigo-600/30 cursor-pointer hover:opacity-80 transition-opacity"
            title="Go to Home Overview"
          >
            VE
          </button>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-[#181818] rounded-md text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* New Campaign Button */}
      <div className="p-3">
        <button
          onClick={onNewCampaign}
          className={`w-full py-2.5 bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-indigo-500/50 text-white font-mono text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
            collapsed ? 'px-2' : 'px-3'
          }`}
          title="Start New Campaign / Chat"
        >
          <Plus className="w-4 h-4 text-indigo-400 shrink-0" />
          {!collapsed && <span className="truncate">New Campaign / Chat</span>}
        </button>
      </div>

      {/* Middle Navigation & Recents List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-6 py-2 scrollbar-thin">
        {/* Core Navigation Options */}
        <div className="space-y-1">
          {!collapsed && (
            <div className="px-3 text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Workspace Nav
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isComingSoon = 'isComingSoon' in item && item.isComingSoon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#181818] text-white border border-[#333] shadow-inner font-semibold'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#111111]'
                }`}
                title={item.label}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-gray-500'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && isComingSoon && (
                  <span className="text-[9px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.2 rounded uppercase shrink-0">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Recents Section */}
        {!collapsed && (
          <div className="space-y-1 pt-2 border-t border-[#1a1a1a]">
            <div className="px-3 text-[10px] font-mono font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Recents</span>
              <span className="text-[9px] text-gray-600 bg-[#121212] px-1.5 py-0.5 rounded">
                Saved
              </span>
            </div>

            {recents.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.tab)}
                className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-[#121212] transition-colors cursor-pointer ${
                  activeTab === item.tab ? 'bg-[#121212] text-gray-200 font-medium' : ''
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-600 group-hover:text-indigo-400 shrink-0" />
                  <span className="truncate text-[11px]">{item.title}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] text-gray-600 font-mono">{item.timestamp}</span>
                  <button
                    onClick={(e) => removeRecent(e, item.id)}
                    className="p-1 text-gray-500 hover:text-red-400 rounded transition-colors"
                    title="Delete Recent"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GPU Telemetry Bar */}
      {!collapsed && gpuStats && (
        <div className="px-3 py-2 mx-2 mb-2 bg-[#0d0d0d] border border-[#222] rounded-lg font-mono text-[10px] text-gray-400 space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              CUDA GPU ACTIVE
            </span>
            <span className="text-gray-500">{gpuStats.latencyMs}ms</span>
          </div>
          <div className="text-gray-500 truncate">
            {gpuStats.throughputTokensPerSec} tok/s • GPU {gpuStats.activeGpuCount}x H100
          </div>
        </div>
      )}

      {/* Bottom User Section */}
      <div className="p-3 border-t border-[#1e2438] bg-[#090b16]">
        {!collapsed ? (
          <div className="flex items-center justify-between gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 border border-indigo-400/30 flex items-center justify-center text-white font-display font-extrabold text-xs shrink-0 shadow-md">
                  {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'VU'}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white font-display truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-indigo-400 font-mono font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" /> {currentUser.plan}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-[#141829] border border-[#232b45] flex items-center justify-center text-gray-400 font-mono text-xs font-bold shrink-0">
                  ?
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-gray-300 font-display truncate">
                    Guest Account
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    Signed Out
                  </div>
                </div>
              </div>
            )}

            {!currentUser ? (
              <button 
                onClick={onOpenAuth}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-display font-bold rounded-md transition-all cursor-pointer shrink-0 shadow-sm"
              >
                Log In
              </button>
            ) : (
              <button 
                onClick={() => setActiveTab('monetization')}
                className="px-2 py-1 bg-[#141829] hover:bg-[#1e243b] border border-[#232b45] text-amber-300 text-[10px] font-mono font-medium rounded-md transition-all cursor-pointer shrink-0"
              >
                Pro Plan
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <button 
              onClick={onOpenAuth}
              className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-display text-xs font-bold cursor-pointer hover:bg-indigo-600 hover:text-white transition-colors"
              title={currentUser ? currentUser.name : 'Log In'}
            >
              {currentUser ? currentUser.name.charAt(0).toUpperCase() : '?'}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
