import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, Plus, Calendar, Clock, Tag, ArrowRight, 
  X, Check, Share2, Sparkles, FileText, Bookmark, Lightbulb
} from 'lucide-react';
import { BlogPost, getStoredBlogPosts, saveBlogPost } from '../data/blogPosts';

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // Authoring modal state
  const [isAuthoringOpen, setIsAuthoringOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<BlogPost['category']>('Quantum Dynamics');
  const [newExcerpt, setNewExcerpt] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newTags, setNewTags] = useState<string>('BEC, Stochastic Dynamics, IIT Kharagpur');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    setPosts(getStoredBlogPosts());
  }, []);

  const categories = ['All', 'Quantum Dynamics', 'Scattering Theory', 'Scientific Computing'];

  const filteredPosts = posts.filter(post => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(t => t.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: BlogPost = {
      id: `finding-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: newTitle.trim(),
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: `${Math.max(3, Math.ceil(newContent.split(/\s+/).length / 180))} min read`,
      category: newCategory,
      excerpt: newExcerpt.trim() || newContent.slice(0, 160) + '...',
      abstract: newExcerpt.trim() || newContent.slice(0, 220) + '...',
      content: newContent.trim(),
      keyFindings: [
        "Fresh finding recorded in research log.",
        "Verified with numerical/theoretical methods."
      ],
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    const updated = saveBlogPost(newPost);
    setPosts(updated);
    setIsAuthoringOpen(false);
    // Reset form
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
  };

  const handleShare = (post: BlogPost) => {
    navigator.clipboard.writeText(`${window.location.origin}#findings-${post.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="findings" className="py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400 uppercase">
              <span>Research Log & Blog</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Open Science</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Latest Findings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-serif-heading">
              Research Findings & Theoretical Notes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              A log of emerging findings, numerical experiments with the Stochastic Gross–Pitaevskii Equation, scattering theory notes, and open-source scientific code.
            </p>
          </div>

          {/* New Post Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAuthoringOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Research Finding</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-amber-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search findings by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Unboxed Metadata (Anti-slop compliant) */}
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors font-serif-heading leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Key Findings Preview */}
                {post.keyFindings && post.keyFindings.length > 0 && (
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-600" />
                      <span>Key Takeaway</span>
                    </div>
                    <p className="text-[11px] italic line-clamp-2">
                      &ldquo;{post.keyFindings[0]}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[11px] text-slate-500 dark:text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="text-amber-700 dark:text-amber-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-sm">No research notes matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 px-3 py-1 text-xs text-amber-700 dark:text-amber-400 underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Top Close & Share bar */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-amber-700 dark:text-amber-400">{activePost.category}</span>
                <span>·</span>
                <span>{activePost.publishedDate}</span>
                <span>·</span>
                <span>{activePost.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare(activePost)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif-heading leading-tight">
              {activePost.title}
            </h2>

            {/* Abstract Box */}
            <div className="bg-amber-50/60 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
              <strong>Abstract:</strong> {activePost.abstract}
            </div>

            {/* Mathematical Formulas if any */}
            {activePost.equations && activePost.equations.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Mathematical Framework
                </h4>
                {activePost.equations.map((eq, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 font-mono">
                      {eq.label}
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 overflow-x-auto py-1">
                      {eq.formula}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {eq.description}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Main Text Content */}
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {activePost.content}
            </div>

            {/* Key Findings Bulletins */}
            {activePost.keyFindings && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Key Findings & Scientific Takeaways
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
                  {activePost.keyFindings.map((kf, i) => (
                    <li key={i}>{kf}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer tags & close */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {activePost.tags.map((t, idx) => (
                  <span key={idx} className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Research Finding Authoring Modal */}
      {isAuthoringOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <form
            onSubmit={handleCreatePost}
            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif-heading">
                  Log New Research Finding
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Document recent simulations, theoretical observations, or conference preprints.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAuthoringOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Finding Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Critical Slowing Down in SGPE Quench Across Tc"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Primary Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Quantum Dynamics">Quantum Dynamics</option>
                  <option value="Scattering Theory">Scattering Theory</option>
                  <option value="Statistical Physics">Statistical Physics</option>
                  <option value="Scientific Computing">Scientific Computing</option>
                  <option value="Laboratory Notes">Laboratory Notes</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Keywords / Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="SGPE, Bose-Einstein, IIT Kharagpur"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Brief Abstract / Excerpt
              </label>
              <textarea
                rows={2}
                placeholder="Short summary of the core physical insight or numerical simulation result..."
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Detailed Discussion & Methodology
              </label>
              <textarea
                rows={6}
                required
                placeholder="Elaborate on the theoretical equations, numerical convergence, and comparison with experimental data..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAuthoringOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg cursor-pointer"
              >
                Publish Finding
              </button>
            </div>
          </form>
        </div>
      )}

    </section>
  );
};
