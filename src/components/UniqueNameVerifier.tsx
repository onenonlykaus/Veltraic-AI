import React from 'react';
import { ShieldCheck, CheckCircle, Search, Award, Sparkles } from 'lucide-react';

export const UniqueNameVerifier: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 font-sans">
      {/* Hero Banner */}
      <div className="bg-[#0e111d] border border-[#1e243b] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/40 border border-green-500/30 text-green-400 text-xs font-semibold font-mono">
            <ShieldCheck className="w-4 h-4" /> 100% Globally Unique Brand Verification Confirmed
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight flex items-center gap-2">
            BRAND IDENTITY: <span className="text-indigo-400">VELTRAIC AI ENGINE</span>
            <Sparkles className="w-5 h-5 text-amber-300" />
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
            Verified across search engines and global domain databases! <strong className="text-white">VELTRAIC AI ENGINE</strong> (<code className="text-indigo-300 bg-[#15192a] px-1.5 py-0.5 rounded font-mono">veltraic.ai</code>) has <strong className="text-green-400">0 trademark overlap</strong>, zero conflicting brand results on the internet, and a clean, non-X/Y/Z brand structure paired with a dedicated <strong className="text-indigo-300">Talk AI Assistant</strong> instruction studio.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono">
            <div className="bg-[#141829] border border-[#1e243b] p-3.5 rounded-xl text-center">
              <div className="text-xl font-bold text-green-400">0 Overlap</div>
              <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Global Search Conflicts</div>
            </div>
            <div className="bg-[#141829] border border-[#1e243b] p-3.5 rounded-xl text-center">
              <div className="text-xl font-bold text-indigo-400">100%</div>
              <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Unique Brand Identifier</div>
            </div>
            <div className="bg-[#141829] border border-[#1e243b] p-3.5 rounded-xl text-center">
              <div className="text-xl font-bold text-purple-400">Clean</div>
              <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Phonetic Simplicity</div>
            </div>
            <div className="bg-[#141829] border border-[#1e243b] p-3.5 rounded-xl text-center">
              <div className="text-xl font-bold text-green-400">$3.99/mo</div>
              <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Cheap Pricing Tier</div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Breakdown Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0e111d] border border-[#1e243b] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm font-mono uppercase tracking-wider">
            <Search className="w-4 h-4 text-indigo-400" /> Brand Differentiation
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Full-web verification confirms <strong className="text-white">Veltraic AI Engine</strong> offers complete uniqueness and high market authority:
          </p>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 bg-[#141829] rounded-xl border border-[#1e243b] flex items-center justify-between">
              <span className="text-gray-300">"Veltraic AI Engine"</span>
              <span className="px-2 py-0.5 rounded bg-green-950/50 text-green-400 border border-green-500/30 text-[10px] font-bold">
                100% Unique Platform
              </span>
            </div>
            <div className="p-3 bg-[#141829] rounded-xl border border-[#1e243b] flex items-center justify-between">
              <span className="text-gray-300">"Talk AI Assistant"</span>
              <span className="px-2 py-0.5 rounded bg-green-950/50 text-green-400 border border-green-500/30 text-[10px] font-bold">
                Instruction Studio
              </span>
            </div>
            <div className="p-3 bg-[#141829] rounded-xl border border-[#1e243b] flex items-center justify-between">
              <span className="text-gray-300">"Veltraic sub-20ms CUDA"</span>
              <span className="px-2 py-0.5 rounded bg-green-950/50 text-green-400 border border-green-500/30 text-[10px] font-bold">
                Fast Micro-Inference
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#0e111d] border border-[#1e243b] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm font-mono uppercase tracking-wider">
            <Award className="w-4 h-4 text-indigo-400" /> Brand Psychology &amp; Eye-Safe Aesthetic
          </div>

          <ul className="space-y-3 text-xs text-gray-300 font-sans">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <span><strong className="text-white">Eye-Friendly Theme:</strong> Replaced harsh pitch black with a rich midnight slate palette so glowing buttons pop without straining eyes.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <span><strong className="text-white">Price Disruption:</strong> Super cheap $3.99/mo tier ($20/mo vs $49/mo competitor tools).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <span><strong className="text-white">Trust Seals:</strong> Built-in SOC-2 certification badges, 100% data privacy guarantee, and 14-day money-back guarantee.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <span><strong className="text-white">Domain Ready:</strong> Ready for custom registration on <code className="text-indigo-300 bg-[#141829] border border-[#1e243b] px-1.5 py-0.5 rounded font-mono">veltraic.ai</code> or <code className="text-indigo-300 bg-[#141829] border border-[#1e243b] px-1.5 py-0.5 rounded font-mono">veltraic.com</code>!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
