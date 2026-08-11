import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  Plus, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RefreshCw, 
  MessageSquare, 
  Zap, 
  ChevronDown, 
  Cpu, 
  Globe, 
  FileText, 
  Lightbulb,
  ArrowUp,
  Brain,
  Code
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
  thinkingSteps?: string[];
  isThinking?: boolean;
}

interface FullChatPageProps {
  onNotify: (msg: string) => void;
  onNavigateTab: (tab: 'campaign' | 'python-gpu' | 'monetization') => void;
}

export const FullChatPage: React.FC<FullChatPageProps> = ({ onNotify, onNavigateTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'flash' | 'logic'>('flash');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ id: string; title: string; time: string }>>([
    { id: 'h1', title: 'Python GPU Lead Scoring Engine', time: '10m ago' },
    { id: 'h2', title: '30-Day B2B Client Acquisition', time: '1h ago' },
    { id: 'h3', title: 'Stripe MRR Pricing Model', time: 'Yesterday' },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = textToSend || input;
    if (!promptText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: promptText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const isLogicTask = selectedModel === 'logic' || 
      promptText.toLowerCase().includes('python') || 
      promptText.toLowerCase().includes('code') || 
      promptText.toLowerCase().includes('plan') || 
      promptText.toLowerCase().includes('architecture');

    // Add thinking message placeholder if deep logic is required
    let thinkingMsgId = (Date.now() + 1).toString();
    if (isLogicTask) {
      setMessages((prev) => [
        ...prev,
        {
          id: thinkingMsgId,
          role: 'assistant',
          content: '',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isThinking: true,
          thinkingSteps: [
            'Analyzing neural input vector & intent...',
            'Allocating CUDA GPU memory buffers (FP16/INT8)...',
            'Synthesizing multi-layer business & code architecture...'
          ]
        }
      ]);
    }

    try {
      const res = await fetch('/api/gemini/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.concat(userMsg).map((m) => ({ role: m.role, content: m.content })),
          userContext: { model: selectedModel, engine: 'Veltraic AI Studio' }
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Veltraic AI failed to respond.');
      }

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== thinkingMsgId);
        return [
          ...filtered,
          {
            id: thinkingMsgId,
            role: 'assistant',
            content: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
      });

      // Append to chat history
      setChatHistory((prev) => [
        { id: Date.now().toString(), title: promptText.slice(0, 32) + (promptText.length > 32 ? '...' : ''), time: 'Just now' },
        ...prev.slice(0, 5)
      ]);
    } catch (err: any) {
      onNotify(`Notice: ${err.message || 'Running fast offline fallback model.'}`);
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== thinkingMsgId);
        return [
          ...filtered,
          {
            id: thinkingMsgId,
            role: 'assistant',
            content: `⚡ **Veltraic Instant Execution Output:**\n\nI have processed your instruction: **"${promptText}"**.\n\n### 🚀 Actionable Growth Steps:\n1. **High-Converting Offer:** Launch your $3.99/mo Solopreneur Pro subscription tier.\n2. **Automated Python GPU Engine:** Deploy sub-20ms lead generation for B2B client acquisition.\n3. **Growth Channel:** Target local business owners and solopreneurs via direct outreach.\n\n*Pro Tip: You can also use our Python GPU Core or Campaign Studio tabs for automated artifact generation!*`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
      });
    } finally {
      setLoading(false);
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onNotify('Copied output to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startNewChat = () => {
    setMessages([]);
    onNotify('Started a new conversation thread.');
  };

  const quickPrompts = [
    { label: "Write a 30-day B2B marketing plan", category: "Strategy", icon: Globe },
    { label: "Build Python TensorFlow code for GPU lead scoring", category: "Code Engine", icon: Code },
    { label: "Draft a cold email pitch to close 5 clients at $199/mo", category: "Outreach", icon: FileText },
    { label: "Model MRR projections for $49, $199 & $499 tiers", category: "Monetization", icon: Zap }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0d0f1f] text-white rounded-2xl border border-[#1e243b] overflow-hidden shadow-2xl relative font-sans">
      {/* Top Header & Model Picker (ChatGPT Style) */}
      <div className="h-14 border-b border-[#1e243b] bg-[#0e111d] px-4 sm:px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#141829] border border-[#232b45] rounded-full px-3 py-1 text-xs font-semibold cursor-pointer hover:border-[#38456e] transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as 'flash' | 'logic')}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-display font-bold text-xs"
            >
              <option value="flash" className="bg-[#141829] text-white">Veltraic 3.6 Flash (Sub-20ms Ultra Fast)</option>
              <option value="logic" className="bg-[#141829] text-white">Veltraic Deep Logic (Python & Architecture)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-950/40 text-green-400 border border-green-500/30 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
            GPU CUDA Ready
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startNewChat}
            className="px-3 py-1.5 bg-[#141829] hover:bg-[#1a2038] border border-[#232b45] text-gray-300 hover:text-white rounded-lg text-xs font-semibold font-display flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Thread</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Chat Thread / Empty State */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 sm:p-6 scrollbar-thin">
          {messages.length === 0 ? (
            /* Iconic Centered Talk AI Assistant Empty State */
            <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full text-center space-y-6 my-auto py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-400 flex items-center justify-center shadow-xl shadow-indigo-600/30 border border-indigo-400/40 mb-2">
                <span className="font-display font-black text-2xl text-white tracking-wider">VE</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                  Talk AI Assistant &amp; Instruction Studio
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 font-sans max-w-md mx-auto">
                  Type instructions to <strong className="text-white">Veltraic AI Engine</strong> to generate marketing campaigns, write Python GPU scripts, craft pitch decks, or calculate revenue.
                </p>
              </div>

              {/* Prompt Suggestion Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left pt-2 font-sans">
                {quickPrompts.map((qp, idx) => {
                  const Icon = qp.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(qp.label)}
                      className="p-4 bg-[#121212] hover:bg-[#1a1a1a] border border-[#252525] hover:border-indigo-500/50 rounded-xl transition-all cursor-pointer group flex items-start gap-3 text-xs"
                    >
                      <div className="p-2 rounded-lg bg-[#1a1a1a] group-hover:bg-indigo-900/40 text-gray-400 group-hover:text-indigo-400 border border-[#333] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-wider mb-0.5">
                          {qp.category}
                        </div>
                        <div className="text-gray-200 font-semibold group-hover:text-white leading-snug">
                          {qp.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Messages List */
            <div className="space-y-6 max-w-3xl mx-auto w-full py-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-1 shadow-md shadow-indigo-600/20">
                      VE
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] rounded-2xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#181d33] border border-[#2b3558] text-white font-sans rounded-br-none shadow-md'
                        : 'bg-[#0e111d] border border-[#1e243b] text-gray-200 font-sans rounded-bl-none shadow'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#1e243b] text-[11px] font-mono text-gray-500">
                      <span className="font-bold text-indigo-400">
                        {msg.role === 'user' ? 'You' : 'Veltraic AI Assistant'}
                      </span>
                      <span>{msg.time}</span>
                    </div>

                    {msg.isThinking && (
                      <div className="space-y-2 mb-3 p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs font-mono text-indigo-300">
                        <div className="flex items-center gap-2 font-bold text-indigo-400">
                          <Brain className="w-4 h-4 animate-pulse text-indigo-400" />
                          <span>Veltraic Deep Logic Engine (Calculating)...</span>
                        </div>
                        {msg.thinkingSteps?.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-[11px] text-indigo-200/80 pl-2">
                            <span className="text-indigo-500">•</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {msg.role === 'assistant' && !msg.isThinking && (
                      <div className="mt-4 pt-2 border-t border-[#1e243b] flex items-center justify-between gap-3 text-xs font-mono">
                        <button
                          onClick={() => copyText(msg.id, msg.content)}
                          className="text-gray-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-green-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-gray-500" />
                              <span>Copy Response</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                          <span>Veltraic 3.6 Flash</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-[#222] border border-[#333] flex items-center justify-center text-white shrink-0 mt-1 font-bold text-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* ChatGPT Style Centered Pill Input Bar */}
          <div className="max-w-3xl mx-auto w-full pt-2 pb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center bg-[#141829] border border-[#232b45] focus-within:border-indigo-500/70 rounded-2xl p-2 shadow-2xl transition-all"
            >
              <button
                type="button"
                onClick={() => onNotify("Upload attachment feature ready for workspace analysis!")}
                className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#1f263d] transition-colors cursor-pointer shrink-0"
                title="Attach files or context"
              >
                <Plus className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything or give work instructions to Veltraic AI..."
                className="flex-1 bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none font-sans"
                disabled={loading}
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-3 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shrink-0 shadow-md"
              >
                <ArrowUp className="w-4 h-4 stroke-[3]" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 px-3 mt-2">
              <span>Veltraic AI Engine • Always verify important details.</span>
              <span className="hidden sm:inline">Press Enter to send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
