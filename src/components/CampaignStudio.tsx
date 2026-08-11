import React, { useState } from 'react';
import { Sparkles, Play, Calendar, Share2, Mail, Rocket, CheckCircle2, Copy, Download, RefreshCw, AlertCircle, DollarSign, Layers } from 'lucide-react';
import { CampaignData } from '../types';
import { DEFAULT_CAMPAIGN } from '../data/defaultTemplates';

interface CampaignStudioProps {
  campaign: CampaignData;
  setCampaign: React.Dispatch<React.SetStateAction<CampaignData>>;
  onNotify: (msg: string) => void;
}

export const CampaignStudio: React.FC<CampaignStudioProps> = ({ campaign, setCampaign, onNotify }) => {
  const [brandName, setBrandName] = useState('Kentra Growth Co');
  const [businessCategory, setBusinessCategory] = useState('AI Marketing & Lead Automation');
  const [targetAudience, setTargetAudience] = useState('B2B Founders, Agencies & Solopreneurs');
  const [goal, setGoal] = useState('Gain 50 paying clients at $199/mo in 30 days');
  const [budget, setBudget] = useState('$100');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'30day' | 'channels' | 'funnel' | 'hooks'>('30day');

  const handleGenerateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          businessCategory,
          targetAudience,
          goal,
          budget,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate campaign.');
      }

      setCampaign(data.campaign);
      onNotify('⚡ Campaign successfully generated with Gemini 3.6 Flash!');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error communicating with server.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onNotify(`Copied ${label} to clipboard!`);
  };

  const downloadCampaignJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(campaign, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${brandName.toLowerCase().replace(/\s+/g, '_')}_nyxvel_campaign.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onNotify('Downloaded complete Campaign Pack JSON!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Input Generator Form */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-900/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-mono tracking-tight">AUTONOMOUS CAMPAIGN ENGINE</h2>
              <p className="text-xs text-gray-400">
                Powered by Gemini 3.6 Flash Server Engine • Ultra-fast multi-channel generation
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-indigo-400 bg-[#141414] px-3 py-1.5 rounded-lg border border-[#222]">
            <Layers className="w-4 h-4 text-indigo-400" /> Auto-Generated Strategy
          </div>
        </div>

        <form onSubmit={handleGenerateCampaign} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-1.5">Brand / Startup Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-[#080808] border border-[#222] rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Nyxvel Growth Co"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-1.5">Business Category / Niche</label>
            <input
              type="text"
              value={businessCategory}
              onChange={(e) => setBusinessCategory(e.target.value)}
              className="w-full bg-[#080808] border border-[#222] rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. AI Marketing & Automation"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-1.5">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-[#080808] border border-[#222] rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Small business owners, solopreneurs"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-1.5">Primary Growth Goal</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-[#080808] border border-[#222] rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Get 50 paying users in 30 days"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold mb-1.5">Monthly Marketing Budget</label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-[#080808] border border-[#222] rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. $100/mo or Organic ($0)"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[42px] bg-white hover:bg-gray-200 text-black font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Generating Campaign...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black text-black" />
                  <span>LAUNCH ZYVRAN GENERATOR</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-rose-900/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Campaign Results View */}
      {campaign && (
        <div className="space-y-6">
          {/* Header Summary Banner */}
          <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-900/10 px-2.5 py-1 rounded border border-indigo-500/20 uppercase tracking-widest">
                  30-DAY AUTONOMOUS SYSTEM
                </span>
                <h3 className="text-xl font-bold text-white font-mono mt-2">{campaign.brandHeadline}</h3>
                <p className="text-gray-400 text-xs mt-1 max-w-3xl leading-relaxed">{campaign.positioningStatement}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#141414] border border-[#222] p-3 rounded-lg text-center font-mono">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Est. Monthly MRR</div>
                  <div className="text-lg font-bold text-green-400">${campaign.estimatedMonthlyRevenueUSD.toLocaleString()}/mo</div>
                </div>

                <button
                  onClick={downloadCampaignJSON}
                  className="px-3.5 py-2.5 bg-[#1a1a1a] hover:bg-[#222] text-gray-200 text-xs font-mono font-medium rounded-lg border border-[#333] flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-indigo-400" />
                  <span>Export Pack</span>
                </button>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="flex space-x-2 border-b border-[#222] pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('30day')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === '30day' ? 'bg-[#1a1a1a] text-white border border-[#333]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> 30-Day Growth Roadmap
              </button>

              <button
                onClick={() => setActiveTab('channels')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'channels' ? 'bg-[#1a1a1a] text-white border border-[#333]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-400" /> Multi-Channel Copy
              </button>

              <button
                onClick={() => setActiveTab('funnel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'funnel' ? 'bg-[#1a1a1a] text-white border border-[#333]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" /> Lead Magnet &amp; Email Sequence
              </button>

              <button
                onClick={() => setActiveTab('hooks')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'hooks' ? 'bg-[#1a1a1a] text-white border border-[#333]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Rocket className="w-3.5 h-3.5 text-indigo-400" /> Viral Organic Hooks
              </button>
            </div>

            {/* Tab Contents */}
            <div className="mt-6">
              {activeTab === '30day' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campaign.growth30DayPlan.map((phase, idx) => (
                    <div key={idx} className="bg-[#080808] border border-[#222] p-4 rounded-lg space-y-3">
                      <div className="flex items-center justify-between border-b border-[#222] pb-2">
                        <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-900/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          WEEK {phase.week}
                        </span>
                        <span className="text-xs text-white font-semibold font-mono">{phase.phaseName}</span>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-300">
                        {phase.actionItems.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'channels' && (
                <div className="space-y-4">
                  {campaign.channels.map((chan, idx) => (
                    <div key={idx} className="bg-[#080808] border border-[#222] p-5 rounded-lg space-y-3 font-mono">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white bg-[#1a1a1a] px-3 py-1 rounded border border-[#333]">
                            {chan.platform}
                          </span>
                          <span className="text-xs text-gray-500">({chan.postFrequency})</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(chan.samplePost, `${chan.platform} Post`)}
                          className="px-2.5 py-1 bg-[#141414] hover:bg-[#222] text-gray-300 text-xs rounded border border-[#222] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-indigo-400" /> Copy
                        </button>
                      </div>

                      <p className="text-xs text-indigo-400 font-sans">
                        <strong>Strategy:</strong> {chan.strategy}
                      </p>

                      <div className="p-3 bg-[#111] rounded-lg border border-[#222] text-xs text-gray-300 font-sans whitespace-pre-wrap leading-relaxed">
                        {chan.samplePost}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'funnel' && (
                <div className="space-y-4">
                  <div className="bg-[#080808] border border-[#222] p-4 rounded-lg space-y-2">
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">LEAD MAGNET TITLE</span>
                    <h4 className="text-base font-bold text-white font-mono">{campaign.leadMagnetFunnel.title}</h4>
                    <p className="text-xs text-gray-300">{campaign.leadMagnetFunnel.hookCopy}</p>
                  </div>

                  <div className="space-y-3 font-mono">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Automated Email Nurture Sequence</h4>
                    {campaign.leadMagnetFunnel.emailSequence.map((email, idx) => (
                      <div key={idx} className="bg-[#080808] border border-[#222] p-4 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-purple-400 bg-purple-900/10 px-2 py-0.5 rounded border border-purple-500/20">
                            DAY {email.day} EMAIL
                          </span>
                          <button
                            onClick={() => copyToClipboard(email.bodySnippet, `Day ${email.day} Email`)}
                            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3 h-3 text-indigo-400" /> Copy Body
                          </button>
                        </div>
                        <div className="text-xs font-bold text-white">Subject: {email.subject}</div>
                        <div className="text-xs text-gray-500">Preview: {email.previewText}</div>
                        <div className="p-3 bg-[#111] border border-[#222] rounded-lg text-xs text-gray-300 font-sans leading-relaxed">
                          {email.bodySnippet}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'hooks' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                  {campaign.viralHookIdeas.map((hook, idx) => (
                    <div key={idx} className="bg-[#080808] border border-[#222] p-4 rounded-lg flex items-start justify-between gap-3">
                      <div className="flex gap-2">
                        <span className="text-indigo-400 font-bold">#{idx + 1}</span>
                        <p className="text-xs text-gray-300 font-sans leading-relaxed">{hook}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(hook, `Viral Hook #${idx + 1}`)}
                        className="p-1.5 text-gray-400 hover:text-white bg-[#141414] rounded border border-[#222] shrink-0 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-indigo-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
