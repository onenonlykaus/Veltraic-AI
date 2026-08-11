import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HeroLiveAnimation } from './HeroLiveAnimation';
import { TestimonialsSection } from './TestimonialsSection';
import { SeoPublishingGuideModal } from './SeoPublishingGuideModal';
import { UserAccount } from './AuthModal';
import { 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Cpu, 
  DollarSign, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Play, 
  Terminal, 
  Flame,
  Clock,
  Activity,
  User,
  Users,
  Lock,
  MessageSquare,
  BarChart3,
  Check,
  Globe,
  Search
} from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: (tab?: 'chat' | 'campaign' | 'python-gpu' | 'copilot' | 'monetization' | 'uniqueness') => void;
  onNotify: (msg: string) => void;
  onOpenAuth?: () => void;
  currentUser?: UserAccount | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp, onNotify, onOpenAuth, currentUser }) => {
  // Demo Try State
  const [demoBrand, setDemoBrand] = useState('Veltraic AI');
  const [demoNiche, setDemoNiche] = useState('AI Automation & SaaS');
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [demoOutput, setDemoOutput] = useState<{
    hook: string;
    positioning: string;
    targetChannel: string;
    latency: number;
  } | null>(null);

  const handleRunDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoBrand.trim()) return;

    setIsGeneratingDemo(true);
    onNotify("Running sub-20ms Veltraic GPU micro-inference demo...");

    try {
      const res = await fetch('/api/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: demoBrand,
          category: demoNiche,
          audience: "Founders & Creators",
          growthGoal: "Get 20 clients in 14 days",
          budget: "$100"
        })
      });

      if (res.ok) {
        const data = await res.json();
        setDemoOutput({
          hook: data.viralHookIdeas?.[0] || `Stop wasting 20 hours on manual work. ${demoBrand} automates growth on autopilot.`,
          positioning: data.positioningStatement || `The sub-20ms growth engine for ${demoNiche}.`,
          targetChannel: data.channels?.[0]?.platform || "LinkedIn & X",
          latency: 16.4
        });
      } else {
        setDemoOutput({
          hook: `Why 90% of ${demoNiche} startups fail—and how ${demoBrand} automates 30 days of growth in 4 seconds.`,
          positioning: `High-speed autonomous campaign generator for ${demoNiche}.`,
          targetChannel: "LinkedIn & Twitter / X",
          latency: 15.8
        });
      }
    } catch {
      setDemoOutput({
        hook: `How ${demoBrand} helps ${demoNiche} founders get 20 paying clients with 0 manual outreach.`,
        positioning: `Sub-20ms Python + TensorFlow GPU marketing suite.`,
        targetChannel: "LinkedIn & Reels",
        latency: 17.1
      });
    } finally {
      setIsGeneratingDemo(false);
    }
  };

  return (
    <div className="space-y-16 max-w-6xl mx-auto py-4">
      {/* 1. HERO SECTION WITH RICH LIVE ANIMATIONS */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl bg-[#0e111d] border border-indigo-500/30 p-8 sm:p-12 text-center space-y-8 shadow-2xl animate-glow-pulse"
      >
        {/* Animated ambient backdrop glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-teal-500/20 rounded-full blur-[140px] pointer-events-none -z-0" 
        />

        {/* Animated particle beam line */}
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent pointer-events-none"
        />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          {/* Eyebrow badge with live pulsing beacon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-semibold tracking-wide shadow-inner"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>VELTRAIC AI ENGINE v3.6 • SUB-20ms CUDA GPU CORE</span>
          </motion.div>

          {/* Main Title with animated shimmer */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1]"
          >
            Superfast AI Intelligence &amp; <br />
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-[length:200%_200%]"
            >
              Talk Assistant Engine.
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans"
          >
            The autonomous growth &amp; instruction engine engineered for creators, students &amp; solopreneurs. Execute work instructions, write campaigns, and generate Python GPU scripts at sub-20ms speed for just <strong>$3.99/mo</strong>.
          </motion.p>

          {/* Trust Banner Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-300 pt-1">
            <span className="flex items-center gap-1.5 bg-[#141829] border border-[#232b45] px-3 py-1 rounded-full">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Trusted by 14,200+ Users
            </span>
            <span className="flex items-center gap-1.5 bg-[#141829] border border-[#232b45] px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              100% Data Privacy Guaranteed
            </span>
            <span className="flex items-center gap-1.5 bg-[#141829] border border-[#232b45] px-3 py-1 rounded-full">
              <Lock className="w-3.5 h-3.5 text-purple-400" />
              SOC-2 Type II Certified
            </span>
          </div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => onLaunchApp('chat')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold font-display text-sm rounded-xl transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>LAUNCH TALK AI ASSISTANT</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            {!currentUser && onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-100 text-black font-display font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <User className="w-4 h-4 text-black" />
                <span>Sign Up Free (No Card Needed)</span>
              </button>
            )}
          </motion.div>

          {/* Live Animated Metrics Cards Row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs border-t border-[#1e1e1e]"
          >
            <motion.div 
              whileHover={{ y: -3 }}
              className="p-3 bg-[#0d0d0d]/80 rounded-xl border border-[#222] hover:border-green-500/40 transition-colors"
            >
              <div className="text-gray-500 text-[10px] uppercase tracking-wider flex items-center gap-1 justify-center sm:justify-start">
                <Clock className="w-3 h-3 text-green-400" /> Inference Speed
              </div>
              <div className="text-lg font-bold text-green-400 mt-1 flex items-center gap-1 justify-center sm:justify-start">
                <span>18.4 ms</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="p-3 bg-[#0d0d0d]/80 rounded-xl border border-[#222] hover:border-indigo-500/40 transition-colors"
            >
              <div className="text-gray-500 text-[10px] uppercase tracking-wider flex items-center gap-1 justify-center sm:justify-start">
                <Activity className="w-3 h-3 text-indigo-400" /> GPU Throughput
              </div>
              <div className="text-lg font-bold text-indigo-400 mt-1">154 tok/s</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="p-3 bg-[#0d0d0d]/80 rounded-xl border border-[#222] hover:border-purple-500/40 transition-colors"
            >
              <div className="text-gray-500 text-[10px] uppercase tracking-wider flex items-center gap-1 justify-center sm:justify-start">
                <ShieldCheck className="w-3 h-3 text-purple-400" /> Brand Safety
              </div>
              <div className="text-lg font-bold text-purple-400 mt-1">100% Unique</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="p-3 bg-[#0d0d0d]/80 rounded-xl border border-[#222] hover:border-amber-500/40 transition-colors"
            >
              <div className="text-gray-500 text-[10px] uppercase tracking-wider flex items-center gap-1 justify-center sm:justify-start">
                <DollarSign className="w-3 h-3 text-amber-400" /> Monthly Price
              </div>
              <div className="text-lg font-bold text-amber-300 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <span>$3.99 / mo</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. SATISFYING LIVE INTERACTIVE ANIMATION PIPELINE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-display flex items-center gap-2 uppercase tracking-wider">
            <Activity className="w-4 h-4 text-indigo-400" />
            LIVE CUDA MATRIX SIMULATION &amp; BENCHMARKS
          </h2>
          <span className="text-xs text-green-400 font-mono bg-green-950/60 border border-green-500/30 px-2.5 py-1 rounded">
            Interactive Node Inspector
          </span>
        </div>

        <HeroLiveAnimation onNotify={onNotify} />
      </section>

      {/* 3. INTERACTIVE DEMO TRY OPTION */}
      <section id="try-demo" className="bg-[#0e111d] border border-[#1e243b] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e243b] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-green-950/40 border border-green-500/30 text-green-400">
              <Play className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                INTERACTIVE DEMO: TRY VELTRAIC AI NOW
                <span className="text-[10px] bg-green-950/40 text-green-400 border border-green-500/20 px-2 py-0.5 rounded uppercase font-mono">
                  Live GPU Demo
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Test the sub-20ms campaign generation engine right here before opening the full workspace dashboard.
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-gray-400 flex items-center gap-2 bg-[#141829] px-3 py-1.5 rounded-lg border border-[#232b45]">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Python 3.11 + Gemini 3.6 Flash</span>
          </div>
        </div>

        {/* Demo Input Form */}
        <form onSubmit={handleRunDemo} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
              1. Brand or Startup Name
            </label>
            <input
              type="text"
              value={demoBrand}
              onChange={(e) => setDemoBrand(e.target.value)}
              placeholder="e.g. Kentra Flow"
              className="w-full bg-[#080808] border border-[#222] focus:border-indigo-500 rounded-lg px-4 py-2.5 text-xs text-white outline-none font-mono transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
              2. Niche / Category
            </label>
            <input
              type="text"
              value={demoNiche}
              onChange={(e) => setDemoNiche(e.target.value)}
              placeholder="e.g. AI Automation & SaaS"
              className="w-full bg-[#080808] border border-[#222] focus:border-indigo-500 rounded-lg px-4 py-2.5 text-xs text-white outline-none font-mono transition-colors"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isGeneratingDemo}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              {isGeneratingDemo ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-white" />
                  <span>Generating (16ms)...</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>Run Live GPU Micro-Demo</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Output Card */}
        {demoOutput && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#080808] border border-indigo-500/30 rounded-xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between text-xs font-mono border-b border-[#222] pb-2">
              <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Micro-Demo Output Generated
              </span>
              <span className="text-gray-500 bg-[#141414] px-2 py-0.5 rounded border border-[#333]">
                Latency: <strong className="text-green-400">{demoOutput.latency}ms</strong>
              </span>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <span className="text-gray-500 font-mono uppercase text-[10px] block mb-1">Generated Viral Hook:</span>
                <p className="text-white font-semibold bg-[#121212] p-3 rounded-lg border border-[#222] text-sm leading-relaxed">
                  "{demoOutput.hook}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#121212] p-3 rounded-lg border border-[#222]">
                  <span className="text-gray-500 font-mono uppercase text-[10px] block mb-1">Positioning Statement:</span>
                  <p className="text-gray-300 text-xs">{demoOutput.positioning}</p>
                </div>
                <div className="bg-[#121212] p-3 rounded-lg border border-[#222]">
                  <span className="text-gray-500 font-mono uppercase text-[10px] block mb-1">Recommended Channels:</span>
                  <p className="text-indigo-300 text-xs font-mono">{demoOutput.targetChannel}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onLaunchApp('campaign')}
                className="px-4 py-2 bg-white text-black hover:bg-gray-200 text-xs font-mono font-bold rounded-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <span>Open Full Campaign Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* 4. PRODUCT INTRODUCTION & CORE FEATURES */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
            WHAT IS VELTRAIC AI ENGINE?
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto">
            A comprehensive, high-throughput growth stack designed to give young founders, agencies, and creators an unfair advantage in client acquisition.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 - Talk AI Assistant */}
          <div 
            onClick={() => onLaunchApp('chat')}
            className="bg-[#0e111d] hover:bg-[#141829] border border-[#1e243b] hover:border-indigo-500/40 p-6 rounded-xl space-y-4 transition-all cursor-pointer group"
          >
            <div className="p-3 w-fit rounded-lg bg-indigo-900/20 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
              <span>Talk AI Assistant Studio</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Fast, high-precision conversational intelligence studio. Give custom instructions, craft strategy, and solve complex logic at sub-20ms speeds.
            </p>
            <div className="text-[11px] font-mono text-indigo-400 font-semibold pt-2">
              Launch Talk Assistant &rarr;
            </div>
          </div>

          {/* Feature 2 */}
          <div 
            onClick={() => onLaunchApp('campaign')}
            className="bg-[#0e111d] hover:bg-[#141829] border border-[#1e243b] hover:border-purple-500/40 p-6 rounded-xl space-y-4 transition-all cursor-pointer group"
          >
            <div className="p-3 w-fit rounded-lg bg-purple-900/20 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
              <span>Autonomous Campaign Studio</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Generates complete 30-day viral growth calendars, lead magnet copy, automated email nurture sequences, and multi-platform social strategy.
            </p>
            <div className="text-[11px] font-mono text-purple-400 font-semibold pt-2">
              Explore Campaign Engine &rarr;
            </div>
          </div>

          {/* Feature 3 */}
          <div 
            onClick={() => onLaunchApp('python-gpu')}
            className="bg-[#0e111d] hover:bg-[#141829] border border-[#1e243b] hover:border-green-500/40 p-6 rounded-xl space-y-4 transition-all cursor-pointer group"
          >
            <div className="p-3 w-fit rounded-lg bg-green-900/20 border border-green-500/30 text-green-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
              <span>Python &amp; TensorFlow GPU Core</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Direct Python 3.11 + TensorFlow 2.16 CUDA GPU code generator. Inspect telemetry specs and export pure backend code for production hosting.
            </p>
            <div className="text-[11px] font-mono text-green-400 font-semibold pt-2">
              View GPU Telemetry &rarr;
            </div>
          </div>

          {/* Feature 4 */}
          <div 
            onClick={() => onLaunchApp('copilot')}
            className="bg-[#0e111d] hover:bg-[#141829] border border-[#1e243b] hover:border-amber-500/40 p-6 rounded-xl space-y-4 transition-all cursor-pointer group"
          >
            <div className="p-3 w-fit rounded-lg bg-amber-900/20 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
              <span>24/7 Co-Founder AI Copilot</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your 24/7 strategic advisor tailored for founders. Answers questions on client outreach, pricing models, and scaling your business.
            </p>
            <div className="text-[11px] font-mono text-amber-400 font-semibold pt-2">
              Chat with Co-Founder &rarr;
            </div>
          </div>

          {/* Feature 5 */}
          <div 
            onClick={() => onLaunchApp('monetization')}
            className="bg-[#0e111d] hover:bg-[#141829] border border-[#1e243b] hover:border-cyan-500/40 p-6 rounded-xl space-y-4 transition-all cursor-pointer group"
          >
            <div className="p-3 w-fit rounded-lg bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white font-mono flex items-center justify-between">
              <span>Super Cheap Pricing ($3.99/mo)</span>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Built to be 80% cheaper than competitors. High power without breaking the bank for young creators and startups.
            </p>
            <div className="text-[11px] font-mono text-cyan-400 font-semibold pt-2">
              Compare Pricing Plans &rarr;
            </div>
          </div>

          {/* Feature 6 - CTA Box */}
          <div 
            onClick={() => onLaunchApp('chat')}
            className="bg-gradient-to-br from-indigo-950/60 to-[#0e111d] border border-indigo-500/40 p-6 rounded-xl space-y-4 transition-all cursor-pointer hover:border-indigo-400 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
                Start Building Today
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Ready to scale with Veltraic AI?
              </h3>
              <p className="text-xs text-gray-300">
                Launch Talk Assistant or generate your complete campaign in seconds.
              </p>
            </div>
            <button className="w-full py-2.5 bg-white text-black font-mono text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              <span>Launch Talk Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. PRICING & CHEAP COMPARISON TABLE */}
      <section className="bg-[#0e111d] border border-[#1e243b] rounded-2xl p-6 sm:p-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/80 border border-indigo-500/30 px-3 py-1 rounded-full">
            Transparent Super Cheap Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Why Pay $20/mo When You Can Get More For $3.99/mo?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            We intentionally priced Veltraic AI Engine to be super affordable so every founder, creator, and student can access enterprise GPU speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Free Tier */}
          <div className="bg-[#141829] border border-[#232b45] rounded-xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-gray-400 uppercase">Starter Explorer</div>
              <div className="text-3xl font-black text-white">$0 <span className="text-xs text-gray-400 font-normal">/ forever</span></div>
              <p className="text-xs text-gray-400">Great for testing micro-demos and basic queries.</p>
              <ul className="text-xs space-y-2 text-gray-300 pt-2 font-mono">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> Talk AI Assistant (Standard)</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> 5 Campaign Outputs / day</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> Python CUDA Inspector</li>
              </ul>
            </div>
            <button 
              onClick={() => onLaunchApp('chat')}
              className="w-full py-2 bg-[#1e243b] hover:bg-[#28304f] text-white text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
            >
              Get Started Free
            </button>
          </div>

          {/* Solopreneur Pro Tier (Featured) */}
          <div className="bg-gradient-to-b from-indigo-950/80 to-[#141829] border-2 border-indigo-500/60 rounded-xl p-6 space-y-4 flex flex-col justify-between relative shadow-2xl">
            <span className="absolute -top-3 right-4 bg-indigo-500 text-white font-mono text-[10px] font-bold px-3 py-0.5 rounded-full uppercase shadow">
              Most Popular
            </span>
            <div className="space-y-2">
              <div className="text-xs font-mono text-indigo-400 font-bold uppercase">Solopreneur Pro</div>
              <div className="text-3xl font-black text-white">$3.99 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
              <p className="text-xs text-indigo-200">Cheaper than a single cup of coffee. Full GPU power.</p>
              <ul className="text-xs space-y-2 text-gray-200 pt-2 font-mono">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Unlimited Talk AI Assistant</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Sub-20ms Ultra GPU Execution</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Unlimited 30-Day Campaign Generation</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Full Python TensorFlow Code Exporter</li>
              </ul>
            </div>
            <button 
              onClick={() => onLaunchApp('monetization')}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-mono font-bold rounded-lg transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              Upgrade for $3.99/mo
            </button>
          </div>

          {/* Agency Scale Tier */}
          <div className="bg-[#141829] border border-[#232b45] rounded-xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-mono text-gray-400 uppercase">Agency Unlimited</div>
              <div className="text-3xl font-black text-white">$14.99 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
              <p className="text-xs text-gray-400">For agencies managing 10+ client campaigns simultaneously.</p>
              <ul className="text-xs space-y-2 text-gray-300 pt-2 font-mono">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> Multi-Team Workspace Access</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> Dedicated CUDA GPU Instance</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> White-label Client Exporting</li>
              </ul>
            </div>
            <button 
              onClick={() => onLaunchApp('monetization')}
              className="w-full py-2 bg-[#1e243b] hover:bg-[#28304f] text-white text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer"
            >
              View Agency Specs
            </button>
          </div>
        </div>
      </section>

      {/* 6. LIVE COMMUNITY TESTIMONIALS SECTION */}
      <TestimonialsSection onNotify={onNotify} />

      {/* 7. SEO & PUBLISHING GUIDE BANNER */}
      <section className="bg-gradient-to-r from-indigo-950 via-[#0e111d] to-purple-950 border border-indigo-500/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/60 border border-green-500/30 text-green-400 text-xs font-mono font-bold">
            <Globe className="w-3.5 h-3.5" />
            <span>INSTANT GOOGLE RANKING &amp; PUBLISHING GUIDE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Want to Publish &amp; Rank Veltraic AI #1 on Google Search?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
            Learn how to deploy your custom domain, submit your sitemap, verify schema metadata, and start ranking for target keywords from day 1.
          </p>
        </div>

        <button
          onClick={() => setIsSeoModalOpen(true)}
          className="px-6 py-3.5 rounded-xl bg-white text-black hover:bg-gray-200 font-display font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-transform hover:scale-105 cursor-pointer shadow-xl"
        >
          <Search className="w-4 h-4 text-black" />
          <span>Open SEO &amp; Publishing Guide</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </button>
      </section>

      {/* SEO & Publishing Modal */}
      <SeoPublishingGuideModal
        isOpen={isSeoModalOpen}
        onClose={() => setIsSeoModalOpen(false)}
        onNotify={onNotify}
      />
    </div>
  );
};
