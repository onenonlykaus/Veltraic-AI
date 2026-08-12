import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { FullChatPage } from './components/FullChatPage';
import { CampaignStudio } from './components/CampaignStudio';
import { PythonGpuEngine } from './components/PythonGpuEngine';
import { CopilotChat } from './components/CopilotChat';
import { StartupMonetization } from './components/StartupMonetization';
import { UniqueNameVerifier } from './components/UniqueNameVerifier';
import { AuthModal, UserAccount } from './components/AuthModal';
import { CampaignData, GPUStats } from './types';
import { DEFAULT_CAMPAIGN } from './data/defaultTemplates';
import { Zap, Menu, ShieldCheck, MessageSquare, User, LogIn, LogOut, Sparkles } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export type ActiveTabType = 'landing' | 'chat' | 'campaign' | 'python-gpu' | 'copilot' | 'monetization' | 'uniqueness';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('landing');
  const [campaign, setCampaign] = useState<CampaignData>(DEFAULT_CAMPAIGN);
  const [gpuStats, setGpuStats] = useState<GPUStats | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Auth & User State
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('veltraic_user');
    return saved ? JSON.parse(saved) : null;
  });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    localStorage.setItem('veltraic_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('veltraic_user');
    triggerToast('Logged out of Veltraic AI Engine.');
  };

  const handleNewCampaign = () => {
    setCampaign(DEFAULT_CAMPAIGN);
    setActiveTab('chat');
    triggerToast("Created new Veltraic AI Talk Assistant session!");
  };

  // Poll live simulated GPU stats from server
  useEffect(() => {
    const fetchGpuStats = async () => {
      try {
        const res = await fetch('/api/gpu-stats');
        if (res.ok) {
          const data = await res.json();
          setGpuStats(data);
        }
      } catch (err) {
        // Silently handle if server offline or starting up
      }
    };

    fetchGpuStats();
    const interval = setInterval(fetchGpuStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'landing': return 'Home Overview & Product Introduction';
      case 'chat': return 'Talk AI Assistant & Instruction Studio';
      case 'campaign': return 'Autonomous Campaign Studio';
      case 'python-gpu': return 'Python 3.11 + TensorFlow GPU Core';
      case 'copilot': return '24/7 Co-Founder AI Copilot';
      case 'monetization': return 'Affordable Subscription Plans';
      case 'uniqueness': return '100% Unique Name Record';
      default: return 'Veltraic AI Engine';
    }
  };

  return (
    <div className="min-h-screen bg-[#090b14] text-[#e2e8f0] font-sans antialiased selection:bg-indigo-500 selection:text-white flex">
      {/* Auth Login & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onNotify={triggerToast}
      />

      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        gpuStats={gpuStats}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onNewCampaign={handleNewCampaign}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area next to Sidebar */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64 sm:ml-72'
        }`}
      >
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#0d0f1f]/90 backdrop-blur-md border-b border-[#1e2438] px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 hover:bg-[#181d33] rounded-md text-gray-400 hover:text-white transition-colors cursor-pointer sm:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setActiveTab('landing')}
              className="px-2.5 py-1 rounded-md bg-[#14182b] hover:bg-[#1a2038] border border-[#232b45] text-gray-300 hover:text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Redirect to Main Homepage"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Home / Main Site</span>
            </button>

            <div>
              <h1 className="text-sm sm:text-base font-bold font-display text-white tracking-tight flex items-center gap-2">
                {getPageTitle()}
              </h1>
              <p className="text-[10px] text-gray-400 font-mono hidden sm:block">
                VELTRAIC AI ENGINE • Sub-20ms Python TensorFlow CUDA Pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Animated Talk Assistant Top Button */}
            <button
              onClick={() => {
                if (!currentUser) {
                  setIsAuthOpen(true);
                  triggerToast('Please log in or sign up to access Talk Assistant.');
                } else {
                  setActiveTab('chat');
                }
              }}
              className="relative px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white text-xs font-display font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-xl shadow-indigo-600/40 hover:scale-105 active:scale-95 group overflow-hidden border border-indigo-400/30"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin shrink-0" />
              <span className="tracking-wide">Talk Assistant</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
            </button>

            {/* Login / Sign Up or Logged In Badge */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-[#141829] border border-[#232b45] pl-2.5 pr-1.5 py-1 rounded-lg">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-display font-bold text-[10px]">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-display font-bold text-white hidden md:inline truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-500/30 hidden lg:inline">
                    {currentUser.plan}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 hover:bg-[#1e243b] text-gray-400 hover:text-red-400 rounded transition-colors cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-gray-200 text-black text-xs font-display font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-black" />
                <span>Log In / Sign Up</span>
              </button>
            )}
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 px-4 sm:px-8 py-6 pb-20 max-w-7xl w-full mx-auto">
          {activeTab === 'landing' && (
            <LandingPage 
              onLaunchApp={(tab) => {
                if (!currentUser) {
                  setIsAuthOpen(true);
                  triggerToast('Please log in or create an account to enter Veltraic Studio.');
                } else {
                  setActiveTab(tab || 'chat');
                }
              }} 
              onNotify={triggerToast}
              onOpenAuth={() => setIsAuthOpen(true)}
              currentUser={currentUser}
            />
          )}

          {/* Protected Studio Tabs */}
          {!currentUser && activeTab !== 'landing' && activeTab !== 'monetization' && activeTab !== 'uniqueness' ? (
            <div className="bg-[#0e111d] border border-[#232b45] rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto my-12 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto text-white shadow-xl shadow-indigo-600/30">
                <User className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>SIGN IN REQUIRED</span>
                </div>
                <h2 className="text-2xl font-bold font-display text-white">Sign In to Access Veltraic AI Studio</h2>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                  Please log in or create your free account to use Talk AI Assistant, Campaign Studio, Python GPU Core, and Co-Founder Copilot.
                </p>
              </div>
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-display font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/40 transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2 border border-indigo-400/30"
              >
                <LogIn className="w-4 h-4 text-amber-300" />
                <span>Log In / Create Free Account</span>
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'chat' && (
                <FullChatPage 
                  onNotify={triggerToast}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'campaign' && (
                <CampaignStudio campaign={campaign} setCampaign={setCampaign} onNotify={triggerToast} />
              )}

              {activeTab === 'python-gpu' && (
                <PythonGpuEngine gpuStats={gpuStats} onNotify={triggerToast} />
              )}

              {activeTab === 'copilot' && (
                <CopilotChat onNotify={triggerToast} />
              )}
            </>
          )}

          {activeTab === 'monetization' && (
            <StartupMonetization onNotify={triggerToast} />
          )}

          {activeTab === 'uniqueness' && (
            <UniqueNameVerifier />
          )}
        </main>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#131728] border border-[#2d3652] text-indigo-300 font-mono text-xs px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 animate-bounce">
            <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Footer Branding */}
        <footer className="border-t border-[#1e2438] bg-[#0d0f1f] py-4 text-center text-[11px] font-mono text-gray-400 mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <strong className="text-gray-200 font-display">VELTRAIC AI ENGINE</strong> • Sub-20ms Autonomous Growth Platform
            </div>
            <div className="text-gray-400">
              Python 3.11 • TensorFlow 2.16 GPU • Gemini 3.6 Flash
            </div>
          </div>
        </footer>
      </div>
      <SpeedInsights />
    </div>
  );
}

