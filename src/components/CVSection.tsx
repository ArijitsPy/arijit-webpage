import React, { useState } from 'react';
import { 
  Download, FileText, Search, ExternalLink, Award, GraduationCap, 
  Briefcase, Wrench, Code2, BookOpen, Layers, CheckCircle2, ChevronDown, ChevronUp
} from 'lucide-react';
import { 
  PROFILE_DATA, 
  EDUCATION, 
  ACHIEVEMENTS, 
  PROJECTS, 
  EXPERIENCE, 
  SKILLS_CATEGORIES, 
  SCHOLARSHIPS 
} from '../data/cvData';

type CVTab = 'interactive' | 'pdf';
type CategoryFilter = 'all' | 'education' | 'achievements' | 'experience' | 'projects' | 'skills';

export const CVSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CVTab>('interactive');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCourses, setExpandedCourses] = useState<boolean>(false);

  const query = searchQuery.toLowerCase().trim();

  return (
    <section id="cv" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-700 dark:text-amber-400 uppercase">
              <span>Curriculum Vitae</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Academic Credentials</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>IIT Kharagpur</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-serif-heading">
              Curriculum Vitae & Scholarly Record
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Official academic trajectory, national competitive examinations, experimental & computational physics projects, and STEM teaching outreach.
            </p>
          </div>

          {/* Dual View Switch & Download CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab('interactive')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Interactive Digital CV
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'pdf'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                PDF Document Viewer
              </button>
            </div>

            <a
              href={PROFILE_DATA.cvPdfUrl}
              download="Arijit_Sikder_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 border border-slate-900 dark:border-slate-700 rounded-xl transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF (Direct)</span>
            </a>
          </div>
        </div>

        {/* Tab 1: Interactive Structured Digital CV */}
        {activeTab === 'interactive' && (
          <div className="space-y-10">
            
            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              
              {/* Category Segmented Controls */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'education', 'achievements', 'projects', 'experience', 'skills'] as CategoryFilter[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer capitalize ${
                      categoryFilter === cat
                        ? 'bg-slate-900 dark:bg-slate-800 text-white font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search CV (e.g. JEST, Python, S-Matrix)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Section 1: National Competitions & Achievements */}
            {(categoryFilter === 'all' || categoryFilter === 'achievements') && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>National Competitive Examinations & Ranks</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ACHIEVEMENTS.filter(a => !query || a.exam.toLowerCase().includes(query) || a.rank.toLowerCase().includes(query)).map((ach, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">
                          {ach.rank}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {ach.year}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {ach.exam}
                        </h4>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          {ach.percentileOrScore}
                        </p>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2: Education Trajectory */}
            {(categoryFilter === 'all' || categoryFilter === 'education') && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                  <GraduationCap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Educational Trajectory</span>
                </div>

                <div className="space-y-4">
                  {EDUCATION.filter(e => !query || e.degree.toLowerCase().includes(query) || e.institution.toLowerCase().includes(query)).map((edu, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 dark:text-white font-serif-heading">
                            {edu.degree}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {edu.institution} · <span className="text-slate-400">{edu.location}</span>
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-md">
                            {edu.cgpaOrPercentage}
                          </span>
                          <div className="text-[11px] text-slate-400 mt-1 font-mono">
                            {edu.duration}
                          </div>
                        </div>
                      </div>

                      {/* Coursework pill if M.Sc. */}
                      {edu.corePapers && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Core Papers & Postgraduate Curriculum ({edu.corePapers.length} Courses)
                            </span>
                            <button
                              type="button"
                              onClick={() => setExpandedCourses(!expandedCourses)}
                              className="text-xs text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>{expandedCourses ? "Show Less" : "View All Papers"}</span>
                              {expandedCourses ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {(expandedCourses ? edu.corePapers : edu.corePapers.slice(0, 6)).map((paper, pIdx) => (
                              <span
                                key={pIdx}
                                className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md"
                              >
                                {paper}
                              </span>
                            ))}
                            {!expandedCourses && edu.corePapers.length > 6 && (
                              <span className="text-xs text-slate-400 py-1 px-1">
                                +{edu.corePapers.length - 6} more
                              </span>
                            )}
                          </div>
                          {edu.audit && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                              <strong>Audited Course:</strong> {edu.audit}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Details bullets */}
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
                        {edu.details.map((d, dIdx) => (
                          <li key={dIdx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 3: Research, Fabrication & Software Projects */}
            {(categoryFilter === 'all' || categoryFilter === 'projects') && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                  <Wrench className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Research Theses, Hardware & Software Projects</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROJECTS.filter(p => !query || p.title.toLowerCase().includes(query) || p.tags.some(t => t.toLowerCase().includes(query))).map((proj, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[11px]">
                            {proj.category}
                          </span>
                          <span className="font-mono">{proj.duration}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {proj.summary}
                        </p>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 list-disc list-inside">
                          {proj.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map((t, tIdx) => (
                            <span key={tIdx} className="text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-700 dark:text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
                          >
                            <span>GitHub</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 4: Experience & Outreach Teaching */}
            {(categoryFilter === 'all' || categoryFilter === 'experience') && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                  <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Teaching Experience & Academic Outreach</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {EXPERIENCE.filter(e => !query || e.role.toLowerCase().includes(query) || e.organization.toLowerCase().includes(query)).map((exp, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {exp.role}
                          </h4>
                          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                            {exp.organization}
                          </p>
                          <p className="text-xs text-slate-400">
                            {exp.location}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>
                      <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 list-disc list-inside">
                        {exp.details.map((d, dIdx) => (
                          <li key={dIdx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: Technical Skills & Scientific Computing */}
            {(categoryFilter === 'all' || categoryFilter === 'skills') && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                  <Code2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Computational Physics, Languages & Laboratory Tools</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SKILLS_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        {cat.title}
                      </h4>
                      <div className="space-y-2.5">
                        {cat.skills.map((sk, sIdx) => (
                          <div key={sIdx} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-medium text-slate-800 dark:text-slate-200">{sk.name}</span>
                              <span className="text-slate-400 text-[11px] font-mono">{sk.level}</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-amber-600 dark:bg-amber-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${sk.proficiency}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 6: Scholarships */}
            <div className="bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Scholarships & Fellowships</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Recipient of Swami Vivekananda Merit-cum-Means Scholarship for M.Sc. (RKMVERI) and B.Sc. (Barasat Govt. College).
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={PROFILE_DATA.cvPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl transition-colors whitespace-nowrap"
                >
                  Verify via Document
                </a>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Embedded PDF Document Viewer */}
        {activeTab === 'pdf' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif-heading">
                  Official PDF Document Preview
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct rendering of <span className="font-mono text-slate-700 dark:text-slate-300">ArijitSikder_CV_ee895c15.pdf</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={PROFILE_DATA.cvPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Full Tab</span>
                </a>
                <a
                  href={PROFILE_DATA.cvPdfUrl}
                  download="Arijit_Sikder_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Embedded Iframe Container with Fallback */}
            <div className="w-full h-[750px] bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">
              <iframe
                src={`${PROFILE_DATA.cvPdfUrl}#toolbar=1&navpanes=0`}
                title="Arijit Sikder Curriculum Vitae PDF"
                className="w-full h-full border-0"
              />
            </div>
            
            <div className="text-center text-xs text-slate-400 pt-2">
              If the PDF preview is not rendered by your browser, please click the <strong>Download</strong> or <strong>Open in Full Tab</strong> button above.
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
