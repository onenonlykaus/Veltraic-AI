import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  CheckCircle, 
  ArrowRight, 
  X, 
  Copy, 
  Sparkles, 
  Code, 
  ExternalLink,
  ShieldCheck,
  Zap,
  TrendingUp,
  FileCode
} from 'lucide-react';

interface SeoPublishingGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const SeoPublishingGuideModal: React.FC<SeoPublishingGuideProps> = ({
  isOpen,
  onClose,
  onNotify
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copySnippet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    onNotify('Copied code snippet to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      num: '01',
      title: 'Publish & Deploy Your AI Studio Applet',
      desc: 'Publish your applet with 1 click using the Share / Deploy options in AI Studio or deploy directly to Cloud Run / custom server.',
      detail: 'In the AI Studio top bar, click "Share" or go to Settings to get your public production URL (e.g. veltraic.ai or Cloud Run domain).',
      badge: 'Step 1: One-Click Deploy'
    },
    {
      num: '02',
      title: 'Attach a Custom Domain (e.g. veltraic.ai)',
      desc: 'Point your domain DNS CNAME or A records to your hosted instance for high brand trust.',
      detail: 'Add CNAME or A records in Namecheap, GoDaddy, or Cloudflare pointing your custom domain directly to your app endpoint.',
      badge: 'Step 2: Custom DNS'
    },
    {
      num: '03',
      title: 'Verify Built-In Meta, OpenGraph & JSON-LD Schema',
      desc: 'We automatically embedded SoftwareApplication structured schema, OpenGraph previews, and canonical links into index.html!',
      detail: 'Google crawlers read the embedded JSON-LD schema to show star ratings (4.9/5) and pricing ($3.99/mo) directly in search engine snippets.',
      badge: 'Step 3: Schema Pre-Built'
    },
    {
      num: '04',
      title: 'Submit Your Site to Google Search Console',
      desc: 'Go to search.google.com/search-console, add your URL, and submit your automated sitemap endpoint.',
      detail: 'Submit your sitemap URL: https://veltraic.ai/sitemap.xml — Google will index your pages within 24 to 48 hours!',
      badge: 'Step 4: Indexing'
    },
    {
      num: '05',
      title: 'Rank #1 via High-Converting Keyword Content',
      desc: 'Use Veltraic Talk AI Assistant & Campaign Studio to generate SEO blog articles and B2B landing pages targeting high-intent keywords.',
      detail: 'Target keywords like "Sub-20ms AI Marketing Engine", "$3.99/mo AI Copilot", and "Python TensorFlow CUDA Micro-Inference".',
      badge: 'Step 5: Ranking'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0e111d] border border-[#232b45] rounded-2xl p-6 sm:p-8 max-w-3xl w-full my-8 space-y-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1e243b] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/60 border border-green-500/30 text-green-400 text-xs font-mono font-bold">
            <Globe className="w-3.5 h-3.5" />
            <span>SEO &amp; INSTANT PUBLISHING PLAYBOOK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            How to Publish &amp; Rank Veltraic AI #1 on Google
          </h2>

          <p className="text-xs sm:text-sm text-gray-400">
            Follow this exact 5-step roadmap to publish your application, connect your domain, submit your sitemap, and start ranking on search engines.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-[#141829] border border-[#232b45] space-y-2 relative"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                    {step.num}
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base font-display">
                    {step.title}
                  </h3>
                </div>

                <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 border border-indigo-500/30 px-2.5 py-0.5 rounded-full uppercase shrink-0">
                  {step.badge}
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed pl-9">
                {step.desc}
              </p>

              <div className="text-[11px] text-gray-400 bg-[#0e111d] p-2.5 rounded-lg border border-[#1e243b] ml-9 font-mono">
                💡 <strong className="text-indigo-300">Action:</strong> {step.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Technical SEO Copy Snippets */}
        <div className="bg-[#141829] p-4 rounded-xl border border-[#232b45] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
            <span className="flex items-center gap-1.5 font-bold">
              <FileCode className="w-4 h-4 text-green-400" />
              Your Automated Sitemap URL for Google Search Console:
            </span>
            <button
              onClick={() => copySnippet('https://veltraic.ai/sitemap.xml', 99)}
              className="text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedIndex === 99 ? 'Copied!' : 'Copy Sitemap URL'}</span>
            </button>
          </div>
          <div className="bg-[#0e111d] p-3 rounded-lg border border-[#1e243b] text-xs font-mono text-green-400 overflow-x-auto">
            <code>https://veltraic.ai/sitemap.xml</code>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex items-center justify-between border-t border-[#1e243b] text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1.5 text-green-400">
            <CheckCircle className="w-4 h-4" /> SEO Schema &amp; Sitemap Active
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Got It, Let's Rank!
          </button>
        </div>
      </div>
    </div>
  );
};
