import React, { useState } from 'react';
import { DollarSign, Layers, CreditCard, Clock, AlertCircle, CheckCircle2, ShieldCheck, Zap, Sparkles, Award } from 'lucide-react';

interface StartupMonetizationProps {
  onNotify: (msg: string) => void;
}

export const StartupMonetization: React.FC<StartupMonetizationProps> = ({ onNotify }) => {
  const [starterPrice] = useState(3.99);
  const [proPrice] = useState(7.99);
  const [agencyPrice] = useState(12.99);

  const [starterUsers, setStarterUsers] = useState(25);
  const [proUsers, setProUsers] = useState(15);
  const [agencyUsers, setAgencyUsers] = useState(8);

  const monthlyRevenue = (starterPrice * starterUsers) + (proPrice * proUsers) + (agencyPrice * agencyUsers);
  const annualRevenue = monthlyRevenue * 12;

  const handleComingSoonClick = (tierName: string) => {
    onNotify(`[PREVIEW MODE] ${tierName} selected! Live Stripe checkout is currently in setup mode. Join waitlist now for early VIP access.`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2 font-sans">
      {/* Super Cheap Pricing Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-[#0f0a1c] to-purple-950/80 border-2 border-indigo-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30 shrink-0">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                  SUPER CHEAP AI PRICING GUARANTEE
                </h2>
                <span className="text-[10px] bg-green-500/20 text-green-300 border border-green-500/40 px-2 py-0.5 rounded-full font-mono uppercase font-bold">
                  80% - 90% Cheaper
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                While competitors cost <strong>$20/mo</strong> or <strong>$49/mo</strong>, Kentra AI Engine starts at just <strong className="text-green-400">$3.99/mo</strong> with sub-20ms speed!
              </p>
            </div>
          </div>

          <button
            onClick={() => onNotify("Super cheap pricing tiers active! Select any plan below.")}
            className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-display font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer shrink-0"
          >
            Claim Cheap Access
          </button>
        </div>
      </div>

      {/* Revenue Simulator Header */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-900/20 border border-green-500/30 rounded-xl text-green-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display flex items-center gap-2 tracking-tight">
                MENGO AI ENGINE REVENUE &amp; MRR SIMULATOR
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-900/20 px-2 py-0.5 rounded border border-indigo-500/30 uppercase tracking-wider">
                  Growth Model
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Model your projected monthly recurring revenue (MRR) offering Mengo AI Engine subscriptions to clients and businesses.
              </p>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#222] p-3 rounded-xl text-center font-mono">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Projected MRR</div>
            <div className="text-xl font-bold text-green-400">${monthlyRevenue.toFixed(2)}<span className="text-xs font-normal text-gray-500">/mo</span></div>
            <div className="text-[10px] text-indigo-400 mt-0.5">${annualRevenue.toFixed(2)} ARR / year</div>
          </div>
        </div>

        {/* Dynamic Calculator Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {/* Solopreneur Tier */}
          <div className="bg-[#080808] border border-[#222] p-4 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-white font-bold font-display">
              <span>SOLOPRENEUR PRO</span>
              <span className="text-indigo-400">${starterPrice}/mo</span>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Target Subscribers: {starterUsers}</label>
              <input
                type="range"
                min="0"
                max="200"
                value={starterUsers}
                onChange={(e) => setStarterUsers(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
            <div className="text-gray-400 text-[11px] border-t border-[#222] pt-2 flex justify-between">
              <span>Subtotal:</span>
              <strong className="text-white">${(starterPrice * starterUsers).toFixed(2)}/mo</strong>
            </div>
          </div>

          {/* Business Pro Tier */}
          <div className="bg-[#080808] border border-indigo-500/50 p-4 rounded-xl space-y-3 relative">
            <div className="flex justify-between items-center text-white font-bold font-display">
              <span className="text-indigo-400">BUSINESS ENGINE</span>
              <span className="text-indigo-400">${proPrice}/mo</span>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Target Subscribers: {proUsers}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={proUsers}
                onChange={(e) => setProUsers(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
            <div className="text-gray-400 text-[11px] border-t border-[#222] pt-2 flex justify-between">
              <span>Subtotal:</span>
              <strong className="text-white">${(proPrice * proUsers).toFixed(2)}/mo</strong>
            </div>
          </div>

          {/* VIP Founder Pass */}
          <div className="bg-[#080808] border border-[#222] p-4 rounded-xl space-y-3">
            <div className="flex justify-between items-center text-white font-bold font-display">
              <span>FOUNDER UNLIMITED</span>
              <span className="text-green-400">${agencyPrice}/mo</span>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Target Clients: {agencyUsers}</label>
              <input
                type="range"
                min="0"
                max="50"
                value={agencyUsers}
                onChange={(e) => setAgencyUsers(parseInt(e.target.value))}
                className="w-full accent-green-500 cursor-pointer"
              />
            </div>
            <div className="text-gray-400 text-[11px] border-t border-[#222] pt-2 flex justify-between">
              <span>Subtotal:</span>
              <strong className="text-white">${(agencyPrice * agencyUsers).toFixed(2)}/mo</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Competitor Price Comparison Table */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white font-display flex items-center gap-2 uppercase tracking-wider">
          <Award className="w-4 h-4 text-indigo-400" />
          WHY MENGO AI BEATS ALL COMPETITORS ON PRICE &amp; SPEED
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300 border-collapse">
            <thead className="bg-[#141414] text-gray-400 font-mono border-b border-[#222] uppercase">
              <tr>
                <th className="p-3">Platform</th>
                <th className="p-3">Monthly Cost</th>
                <th className="p-3">Average Latency</th>
                <th className="p-3">Python GPU Pipeline</th>
                <th className="p-3">Value Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              <tr>
                <td className="p-3 font-semibold text-white">ChatGPT Plus</td>
                <td className="p-3 text-red-400 font-mono">$20.00 / mo</td>
                <td className="p-3 text-gray-400">~2,500 ms</td>
                <td className="p-3 text-gray-500">No Direct Script Export</td>
                <td className="p-3 text-gray-400">Standard</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Claude Pro</td>
                <td className="p-3 text-red-400 font-mono">$20.00 / mo</td>
                <td className="p-3 text-gray-400">~3,000 ms</td>
                <td className="p-3 text-gray-500">No GPU Pipeline</td>
                <td className="p-3 text-gray-400">Standard</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Jasper AI</td>
                <td className="p-3 text-red-400 font-mono">$49.00 / mo</td>
                <td className="p-3 text-gray-400">~3,500 ms</td>
                <td className="p-3 text-gray-500">No Script Export</td>
                <td className="p-3 text-gray-400 font-mono">Expensive</td>
              </tr>
              <tr className="bg-indigo-950/30 border-l-4 border-indigo-500">
                <td className="p-3 font-black text-white font-display flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" /> MENGO AI ENGINE
                </td>
                <td className="p-3 text-green-400 font-mono font-bold text-sm">$3.99 / mo</td>
                <td className="p-3 text-indigo-400 font-mono font-bold">&lt; 20 ms (CUDA Core)</td>
                <td className="p-3 text-green-400 font-semibold">100% Full Open TensorFlow Code</td>
                <td className="p-3 text-green-400 font-bold font-mono">🏆 10x ROI (Save 80%+)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-indigo-400" />
            AFFORDABLE MENGO SUBSCRIPTION PLANS
          </h3>
          <span className="text-xs text-green-400 font-mono bg-green-950/60 border border-green-500/30 px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 14-Day Money Back Guarantee
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Solopreneur Pro */}
          <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 space-y-4 flex flex-col justify-between relative">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-900/20 px-2.5 py-1 rounded border border-indigo-500/30 uppercase tracking-wider">
                  SOLOPRENEUR PRO
                </span>
                <span className="text-[10px] font-mono text-green-400 uppercase font-bold">
                  Save 80%
                </span>
              </div>
              <div className="text-3xl font-black text-white font-display">
                ${starterPrice} <span className="text-xs text-gray-500 font-normal font-sans">/ month</span>
              </div>
              <p className="text-xs text-gray-400">Super cheap AI power for creators, students, and freelancers.</p>

              <ul className="space-y-2 text-xs text-gray-300 pt-2 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Full ChatGPT AI Chat Studio
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Sub-20ms Speed Guarantee
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Unlimited Work Instructions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Standard Email Support
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleComingSoonClick("Solopreneur Pro ($3.99/mo)")}
              className="w-full py-3 bg-[#141414] hover:bg-[#1f1f1f] text-white font-display text-xs font-bold rounded-xl border border-[#333] cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Get Started for $3.99/mo</span>
            </button>
          </div>

          {/* Business Engine */}
          <div className="bg-[#0a0a0a] border-2 border-indigo-500 rounded-2xl p-6 space-y-4 flex flex-col justify-between relative shadow-xl shadow-indigo-600/10">
            <div className="absolute -top-3 right-6 bg-indigo-600 text-white font-mono text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              POPULAR BEST VALUE
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-900/20 px-2.5 py-1 rounded border border-indigo-500/30 uppercase tracking-wider">
                  BUSINESS ENGINE
                </span>
                <span className="text-[10px] font-mono text-green-400 uppercase font-bold">
                  Save 85%
                </span>
              </div>
              <div className="text-3xl font-black text-white font-display">
                ${proPrice} <span className="text-xs text-gray-500 font-normal font-sans">/ month</span>
              </div>
              <p className="text-xs text-gray-400">Complete AI engine for startups, local businesses, and agencies.</p>

              <ul className="space-y-2 text-xs text-gray-300 pt-2 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Everything in Solopreneur
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Gemini 3.6 Deep Logic Thinking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Autonomous Campaign Studio
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Python TensorFlow Code Export
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleComingSoonClick("Business Engine ($7.99/mo)")}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-display text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30"
            >
              <span>Get Started for $7.99/mo</span>
            </button>
          </div>

          {/* Founder Unlimited */}
          <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 space-y-4 flex flex-col justify-between relative">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-green-400 bg-green-900/20 px-2.5 py-1 rounded border border-green-500/30 uppercase tracking-wider">
                  VIP FOUNDER PASS
                </span>
                <span className="text-[10px] font-mono text-green-400 uppercase font-bold">
                  Unlimited
                </span>
              </div>
              <div className="text-3xl font-black text-white font-display">
                ${agencyPrice} <span className="text-xs text-gray-500 font-normal font-sans">/ month</span>
              </div>
              <p className="text-xs text-gray-400">Unlimited priority CUDA pipeline access for agencies &amp; power users.</p>

              <ul className="space-y-2 text-xs text-gray-300 pt-2 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Priority CUDA GPU Core Queue
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> 1-on-1 Founder Setup Support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> White-label Campaign Exports
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> 100% Commercial Use Rights
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleComingSoonClick("VIP Founder Pass ($12.99/mo)")}
              className="w-full py-3 bg-green-600 hover:bg-green-500 text-black font-display text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-green-600/20"
            >
              <span>Get Founder Pass $12.99/mo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Badges */}
      <div className="bg-[#080808] border border-[#222] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
        <div className="flex items-center gap-3 p-2">
          <ShieldCheck className="w-6 h-6 text-green-400 shrink-0" />
          <div>
            <h4 className="font-bold text-white font-display">100% Data Privacy Guarantee</h4>
            <p className="text-gray-400 text-[11px]">Your prompts are strictly confidential &amp; never trained on.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <Clock className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <h4 className="font-bold text-white font-display">99.99% Uptime SLA</h4>
            <p className="text-gray-400 text-[11px]">Sub-20ms speed maintained around the clock.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <CreditCard className="w-6 h-6 text-purple-400 shrink-0" />
          <div>
            <h4 className="font-bold text-white font-display">Cancel Anytime with 1 Click</h4>
            <p className="text-gray-400 text-[11px]">No contracts, no hidden fees, instant refunds.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
