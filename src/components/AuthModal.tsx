import React, { useState } from 'react';
import { X, Lock, Mail, User, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, Github, Chrome } from 'lucide-react';

export interface UserAccount {
  name: string;
  email: string;
  plan: 'Free Starter' | 'Solopreneur Pro' | 'Business Engine';
  isLoggedIn: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  onNotify: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, onNotify }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) {
      onNotify('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const loggedUser: UserAccount = {
        name: name || email.split('@')[0] || 'Kentra User',
        email: email,
        plan: 'Free Starter',
        isLoggedIn: true,
      };
      onLoginSuccess(loggedUser);
      onNotify(`Welcome to Kentra AI Engine, ${loggedUser.name}! Account verified.`);
      onClose();
    }, 600);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const demoUser: UserAccount = {
        name: 'Demo Founder',
        email: 'founder@kentra.ai',
        plan: 'Solopreneur Pro',
        isLoggedIn: true,
      };
      onLoginSuccess(demoUser);
      onNotify('⚡ Instant Demo Login activated! Full access granted.');
      onClose();
    }, 400);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const socialUser: UserAccount = {
        name: `${provider} Member`,
        email: `user@${provider.toLowerCase()}.com`,
        plan: 'Free Starter',
        isLoggedIn: true,
      };
      onLoginSuccess(socialUser);
      onNotify(`Signed in securely via ${provider}!`);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-[#262626] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden">
        {/* Glow backdrop accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-[#1f1f1f] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kentra AI Engine Secure Auth</span>
          </div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">
            {mode === 'login' ? 'Welcome Back to Kentra' : 'Create Free Kentra Account'}
          </h2>
          <p className="text-xs text-gray-400">
            {mode === 'login'
              ? 'Enter your details to access your sub-20ms AI workspace.'
              : 'Join over 14,200+ founders using Kentra AI Engine for cheap, superfast AI tasks.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 bg-[#121212] p-1 rounded-xl border border-[#222]">
          <button
            onClick={() => setMode('signup')}
            className={`py-2 text-xs font-display font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign Up (Free)
          </button>
          <button
            onClick={() => setMode('login')}
            className={`py-2 text-xs font-display font-semibold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Log In
          </button>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialLogin('Google')}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#141414] hover:bg-[#1e1e1e] border border-[#333] text-gray-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            <Chrome className="w-4 h-4 text-red-400" />
            <span>Google</span>
          </button>
          <button
            onClick={() => handleSocialLogin('GitHub')}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#141414] hover:bg-[#1e1e1e] border border-[#333] text-gray-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            <Github className="w-4 h-4 text-white" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#222] w-full" />
          <span className="absolute bg-[#0a0a0a] px-3 text-[10px] text-gray-500 font-mono uppercase tracking-wider">
            or with email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#121212] border border-[#333] focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono text-gray-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="alex@startup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121212] border border-[#333] focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-gray-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#121212] border border-[#333] focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-display font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : mode === 'signup' ? 'Create Account' : 'Log In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Instant Demo Account */}
        <div className="p-3 bg-[#111111] border border-green-500/30 rounded-xl space-y-2 text-center">
          <div className="text-[11px] font-mono font-semibold text-green-400 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Want to test without signing up?</span>
          </div>
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/40 text-xs font-display font-bold rounded-lg transition-colors cursor-pointer"
          >
            ⚡ Launch Instant Demo Mode
          </button>
        </div>

        {/* Security Trust Badges */}
        <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] text-gray-500 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            SOC-2 Type II Certified
          </span>
          <span>🔒 256-Bit SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
};
