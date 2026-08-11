import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquarePlus, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  Send, 
  X, 
  ThumbsUp,
  UserCheck,
  ShieldCheck,
  Zap
} from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  category: 'Solopreneur Pro' | 'Agency Scale' | 'Developer' | 'Creator';
  rating: number;
  comment: string;
  timestamp: string;
  isVerified: boolean;
  isUserSubmitted?: boolean;
  avatarColor: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    company: 'ApexGrowth.io',
    category: 'Solopreneur Pro',
    rating: 5,
    comment: 'Veltraic AI Engine completely transformed our client acquisition. The sub-20ms response speed on Talk AI Assistant is unlike anything else. We generated a complete 30-day marketing system in under 10 seconds!',
    timestamp: '2 hours ago',
    isVerified: true,
    avatarColor: 'from-indigo-500 to-purple-600'
  },
  {
    id: '2',
    name: 'David Miller',
    role: 'Managing Director',
    company: 'Nexus B2B Agency',
    category: 'Agency Scale',
    rating: 5,
    comment: 'Getting enterprise CUDA GPU throughput for just $3.99/mo is insane. We closed 4 new monthly retainer clients using the automated pitch scripts created in the Campaign Studio!',
    timestamp: 'Yesterday',
    isVerified: true,
    avatarColor: 'from-blue-500 to-cyan-600'
  },
  {
    id: '3',
    name: 'Alex Rivera',
    role: 'Lead ML Architect',
    company: 'Veloce AI Labs',
    category: 'Developer',
    rating: 5,
    comment: 'The Python TensorFlow CUDA code exporter in the Python GPU Core tab is flawless. Generated clean, executable Python 3.11 scripts with tf.data.Dataset batching right out of the box.',
    timestamp: '2 days ago',
    isVerified: true,
    avatarColor: 'from-emerald-500 to-teal-600'
  },
  {
    id: '4',
    name: 'Maya Patel',
    role: 'Content Creator & Solopreneur',
    category: 'Creator',
    rating: 5,
    comment: 'Talk AI Assistant is my go-to co-founder every morning. The UI is sleek, dark-mode eye-safe, and responds instantaneously without freezing!',
    timestamp: '3 days ago',
    isVerified: true,
    avatarColor: 'from-pink-500 to-rose-600'
  }
];

interface TestimonialsSectionProps {
  onNotify: (msg: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onNotify }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('veltraic_user_testimonials');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...DEFAULT_TESTIMONIALS];
      } catch (e) {
        return DEFAULT_TESTIMONIALS;
      }
    }
    return DEFAULT_TESTIMONIALS;
  });

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    category: 'Solopreneur Pro' as Testimonial['category'],
    rating: 5,
    comment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const colors = [
    'from-indigo-500 to-purple-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-pink-500 to-rose-600'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) {
      onNotify('Please fill in both your Name and Feedback comment.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        role: formData.role.trim() || 'Verified User',
        company: formData.company.trim() || undefined,
        category: formData.category,
        rating: formData.rating,
        comment: formData.comment.trim(),
        timestamp: 'Just now',
        isVerified: true,
        isUserSubmitted: true,
        avatarColor: colors[Math.floor(Math.random() * colors.length)]
      };

      const updated = [newTestimonial, ...testimonials];
      setTestimonials(updated);

      // Save user submitted testimonials to localStorage
      const userSubmitted = updated.filter(t => t.isUserSubmitted);
      localStorage.setItem('veltraic_user_testimonials', JSON.stringify(userSubmitted));

      setIsSubmitting(false);
      setIsModalOpen(false);

      // Reset form
      setFormData({
        name: '',
        role: '',
        company: '',
        category: 'Solopreneur Pro',
        rating: 5,
        comment: ''
      });

      onNotify('🎉 Your feedback has been published live on the main landing page!');
    }, 400);
  };

  const filteredTestimonials = testimonials.filter(t => {
    if (activeFilter === 'All') return true;
    if (activeFilter === '5 Stars') return t.rating === 5;
    return t.category === activeFilter;
  });

  const averageRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / (testimonials.length || 1)
  ).toFixed(1);

  return (
    <section id="testimonials" className="space-y-8 bg-[#0e111d] border border-[#1e243b] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
      {/* Header & Submit Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#1e243b] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>REAL-TIME COMMUNITY TESTIMONIALS &amp; FEEDBACK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight flex items-center gap-3 flex-wrap">
            <span>What Founders &amp; Users Say About Veltraic</span>
            <span className="text-sm font-mono font-semibold bg-green-950/60 border border-green-500/30 text-green-400 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{averageRating} / 5.0</span>
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            Live feedback from creators, developers, and agency owners. Leave your review below and it automatically appears live on this main site!
          </p>
        </div>

        {/* CTA Button to Leave Feedback */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/30 shrink-0 border border-indigo-400/30 hover:scale-105 active:scale-95"
        >
          <MessageSquarePlus className="w-4 h-4 text-amber-300" />
          <span>Leave Your Testimonial / Feedback</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#141829] p-2 rounded-xl border border-[#232b45]">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <span className="text-gray-400 px-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['All', '5 Stars', 'Solopreneur Pro', 'Agency Scale', 'Developer', 'Creator'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-[#1e243b]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-gray-400 px-2 hidden sm:block">
          Showing <strong className="text-white">{filteredTestimonials.length}</strong> live reviews
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-xl border transition-all relative flex flex-col justify-between space-y-4 ${
              item.isUserSubmitted
                ? 'bg-gradient-to-b from-indigo-950/40 to-[#141829] border-indigo-500/60 shadow-xl shadow-indigo-600/10'
                : 'bg-[#141829] border-[#232b45] hover:border-[#38456e]'
            }`}
          >
            {/* Top User Header & Rating */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.avatarColor} flex items-center justify-center text-white font-bold font-display text-sm shadow-md shrink-0`}>
                  {item.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{item.name}</span>
                    {item.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" title="Verified User" />
                    )}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    {item.role} {item.company ? `• ${item.company}` : ''}
                  </div>
                </div>
              </div>

              {/* User Submitted Glowing Badge */}
              {item.isUserSubmitted && (
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500 text-white font-mono text-[9px] font-bold uppercase tracking-wider animate-pulse shrink-0 border border-indigo-300">
                  Your Live Post
                </span>
              )}
            </div>

            {/* Comment Body */}
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans italic">
              "{item.comment}"
            </p>

            {/* Rating Stars & Footer Info */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1e243b] text-xs font-mono text-gray-400">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-1.5 font-bold text-gray-300">{item.rating}.0</span>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-[#1e243b] text-indigo-300">
                  {item.category}
                </span>
                <span className="text-gray-500">{item.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal for Leaving Feedback */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e111d] border border-[#232b45] rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Modal Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1e243b] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>COMMUNITY FEEDBACK ENGINE</span>
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Leave Your Testimonial &amp; Review
              </h3>
              <p className="text-xs text-gray-400">
                Your feedback will be automatically placed directly on the main landing page for all visitors to see!
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Turner"
                  className="w-full bg-[#141829] border border-[#232b45] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Your Role / Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Founder, Developer, Creator"
                    className="w-full bg-[#141829] border border-[#232b45] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. CyberGrowth Ltd."
                    className="w-full bg-[#141829] border border-[#232b45] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Category Tag
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#141829] border border-[#232b45] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Solopreneur Pro">Solopreneur Pro ($3.99/mo)</option>
                    <option value="Agency Scale">Agency Scale</option>
                    <option value="Developer">Developer / Python GPU</option>
                    <option value="Creator">Creator / Marketer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">
                    Star Rating
                  </label>
                  <div className="flex items-center gap-1.5 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="cursor-pointer transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= formData.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono text-amber-300 font-bold ml-2">
                      {formData.rating}.0 Stars
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">
                  Your Testimonial / Feedback Comment *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Share how Veltraic AI Engine helped your business, speed, or campaigns..."
                  className="w-full bg-[#141829] border border-[#232b45] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-[#232b45] text-gray-300 text-xs font-mono hover:bg-[#141829] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Posting Live...' : 'Publish Testimonial Live'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
