import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw, Lightbulb, Brain } from 'lucide-react';
import { ChatMessage } from '../types';

interface CopilotChatProps {
  onNotify: (msg: string) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hey! I'm **Veltraic AI Copilot**, your AI startup co-founder! 🚀\n\nI see you're ready to launch your own high-speed AI business using Python, TensorFlow, and Gemini AI. You're building a **sub-20ms GPU marketing & instruction engine**!\n\nHere are 3 ways I can help you earn your first revenue this month:\n1. **Find 10 Paying B2B Clients** for AI Marketing Automation ($3.99/mo tier)\n2. **Setup Your Subscription Pricing & Waitlist**\n3. **Write Cold Outreach Messages to Small Businesses**\n\nWhat would you like to build or discuss first?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

export const CopilotChat: React.FC<CopilotChatProps> = ({ onNotify }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [logicPhase, setLogicPhase] = useState<string | null>(null);
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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const isComplex = promptText.length > 50 || 
      promptText.toLowerCase().includes('python') || 
      promptText.toLowerCase().includes('plan') || 
      promptText.toLowerCase().includes('strategy');

    if (isComplex) {
      setLogicPhase('Synthesizing deep business logic & neural framework...');
    } else {
      setLogicPhase('Veltraic 3.6 Fast Execution...');
    }

    try {
      const response = await fetch('/api/gemini/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userContext: { platform: 'Veltraic AI Copilot' },
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to get copilot advice.');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      onNotify(`Notice: ${err.message || 'Copilot running fast fallback.'}`);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `⚡ **Veltraic Instant Advisor Output:**\n\nHere is your strategy for: **"${promptText}"**:\n\n1. **Target Persona:** Local business owners & creators.\n2. **Offer:** Sub-20ms automated marketing & chat instructions at $3.99/mo.\n3. **Action:** Send 10 personalized DMs daily using our automated scripts!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
      setLogicPhase(null);
    }
  };

  const quickPrompts = [
    "How do I get my first 5 paying clients?",
    "Write a cold LinkedIn DM pitch to sell Veltraic AI to small businesses",
    "Why is Veltraic AI ($3.99/mo) so much cheaper than competitors ($20/mo)?",
    "Explain how our Python + TensorFlow GPU engine works to a client"
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Copilot Header Card */}
      <div className="bg-[#0e111d] border border-[#1e243b] rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-900/10 border border-indigo-500/20 text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 tracking-tight">
              VELTRAIC CO-FOUNDER AI COPILOT
              <span className="text-[10px] bg-indigo-900/20 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded uppercase font-mono">
                Sub-20ms Intelligence Engine
              </span>
            </h2>
            <p className="text-xs text-gray-400">
              Interactive 24/7 business advisor on client acquisition, pricing, outreach, and scaling.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-green-400 bg-green-950/40 px-3 py-1.5 rounded-lg border border-green-500/30">
          <Sparkles className="w-4 h-4 text-green-400" /> Powered by Gemini 3.6 Flash
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp)}
            className="p-3 bg-[#141829] hover:bg-[#1a2038] border border-[#232b45] hover:border-[#38456e] rounded-lg text-gray-300 hover:text-white text-left transition-all cursor-pointer flex items-center gap-2"
          >
            <Lightbulb className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">{qp}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#0e111d] border border-[#1e243b] rounded-xl p-6 space-y-4 shadow-2xl flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-md bg-[#181d33] border border-[#2b3558] flex items-center justify-center shrink-0 text-indigo-400 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#181d33] border border-[#2b3558] text-white font-sans rounded-br-none shadow'
                    : 'bg-[#141829] border border-[#232b45] text-gray-300 font-sans rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between mb-1 opacity-70 text-[10px] font-mono border-b border-[#232b45] pb-1">
                  <span>{msg.role === 'user' ? 'You' : 'Veltraic Copilot'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-md bg-[#181d33] border border-[#2b3558] flex items-center justify-center shrink-0 text-white mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-md bg-[#181d33] border border-[#2b3558] flex items-center justify-center text-indigo-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 bg-[#141829] border border-[#232b45] rounded-xl text-xs font-mono text-gray-300 flex items-center gap-2">
                <Brain className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
                <span>{logicPhase || 'Veltraic AI Logic Engine calculating response...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-3 border-t border-[#1e243b] flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Veltraic Copilot anything about starting &amp; scaling your AI business..."
            className="flex-1 bg-[#141829] border border-[#232b45] rounded-lg px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500 font-sans"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline font-mono text-xs">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

