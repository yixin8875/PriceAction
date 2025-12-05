import React, { useState, useMemo, useEffect } from 'react';
import { terms } from './data';
import { Category, Term } from './types';
import { Search, X, BookOpen, BarChart2, TrendingUp, AlertTriangle, ArrowRight, Moon, Sun, Monitor, Percent, Microscope } from 'lucide-react';
import CandleVisualizer from './components/CandleVisualizer';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Initialize theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const categories = ['All', ...Object.values(Category)];

  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      const matchesSearch =
        term.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.fullName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.TREND: return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20';
      case Category.REVERSAL: return 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-400/10 border-rose-200 dark:border-rose-400/20';
      case Category.PATTERN: return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20';
      case Category.BREAKOUT: return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20';
      default: return 'text-slate-500';
    }
  };

  const getProbabilityColor = (prob: string | undefined) => {
    if (!prob) return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    
    // Simple checks for number ranges in the string
    if (prob.includes('70') || prob.includes('80') || prob.includes('90')) {
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
    }
    if (prob.includes('60')) {
       return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-800';
    }
    if (prob.includes('50')) {
       return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
    }
    
    return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 font-sans selection:bg-blue-500/30 transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              PA
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight hidden sm:block">
              Price Action <span className="text-slate-500 font-normal">Master</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsDark(!isDark)}
               className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
               title="Toggle Theme"
             >
               {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        
        {/* Intro Section */}
        <section className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Decode the Markets</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A comprehensive reference for the Al Brooks Price Action trading system. 
            Master the setups, understand the logic, and trade the charts naked.
          </p>
        </section>

        {/* Controls */}
        <section className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search acronyms (e.g., MTR, H1)..."
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-lg leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as Category | 'All')}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200
                    ${selectedCategory === cat 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => setSelectedTerm(term)}
              className={`group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-900/10 transition-all duration-300 ${term.highlight ? 'ring-1 ring-blue-500/20 dark:ring-blue-500/10' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getCategoryColor(term.category)}`}>
                   {term.category === Category.TREND ? 'Trend' : term.category === Category.REVERSAL ? 'Reversal' : term.category === Category.PATTERN ? 'Pattern' : 'Breakout'}
                 </span>
                 {term.highlight && <TrendingUp className="w-4 h-4 text-amber-500 dark:text-yellow-500/70" />}
              </div>
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-mono group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {term.acronym}
                </h3>
                <p className="text-xs text-slate-500 font-medium truncate">
                  {term.fullName}
                </p>
              </div>

              {/* Concept Preview */}
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 h-[3rem]">
                {term.concept}
              </p>

              {/* Probability Tag */}
              <div className={`mb-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border ${getProbabilityColor(term.probability)}`}>
                <Percent className="w-3 h-3" />
                {term.probability || '未知'}
              </div>

              <div className="flex items-center text-xs text-blue-600 dark:text-blue-500 font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 mt-auto">
                Details <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          ))}
        </div>
        
        {filteredTerms.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 mb-4">
              <Search className="h-8 w-8 text-slate-400 dark:text-slate-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No signals found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or category filter.</p>
          </div>
        )}

      </main>

      {/* Detail Modal */}
      {selectedTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-slate-900/20 dark:bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedTerm(null)}
          />
          <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col my-auto animate-in fade-in zoom-in duration-200 max-h-[95vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 rounded-t-2xl">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm">
                    {selectedTerm.acronym}
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{selectedTerm.fullName}</h2>
                   <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getCategoryColor(selectedTerm.category)}`}>
                        {selectedTerm.category}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${getProbabilityColor(selectedTerm.probability)}`}>
                        <Percent className="w-3 h-3" /> {selectedTerm.probability || '未知'}
                      </span>
                   </div>
                 </div>
              </div>
              <button 
                onClick={() => setSelectedTerm(null)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-transparent">
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                
                {/* Left Column: Visuals & Logic (2/5) */}
                <div className="lg:col-span-2 space-y-6">
                   {/* Visualizer Card */}
                   <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-1 shadow-sm overflow-hidden">
                      <div className="border-b border-slate-100 dark:border-slate-800/50 px-3 py-2 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                           <BarChart2 className="w-3.5 h-3.5" /> Schematic
                         </div>
                         <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                            <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                         </div>
                      </div>
                      <CandleVisualizer term={selectedTerm} isDark={isDark} />
                   </div>

                   {/* Logic Card */}
                   <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                      <div className="mb-3 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">
                          <AlertTriangle className="w-4 h-4" /> Market Logic
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
                        {selectedTerm.logic}
                      </p>
                   </div>
                   
                   {/* LTF / Microscope Card (New) */}
                   {selectedTerm.ltfLogic && (
                     <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20 p-5 shadow-sm">
                        <div className="mb-3 flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                            <Microscope className="w-4 h-4" /> Lower Timeframe
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium italic">
                          {selectedTerm.ltfLogic}
                        </p>
                     </div>
                   )}
                </div>

                {/* Right Column: Strategy & Content (3/5) */}
                <div className="lg:col-span-3 space-y-6">
                   
                   {/* Concept Header */}
                   <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                         <BookOpen className="w-3.5 h-3.5" /> Core Concept
                      </div>
                      <p className="text-slate-900 dark:text-slate-100 text-lg leading-relaxed font-medium">
                        {selectedTerm.concept}
                      </p>
                   </div>

                   <hr className="border-slate-200 dark:border-slate-800" />

                   {/* Strategy Section */}
                   <div className="grid grid-cols-1 gap-6">
                      
                      {/* Strategy Box */}
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition duration-500 blur"></div>
                        <div className="relative bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h4 className="text-blue-600 dark:text-blue-400 font-bold text-base mb-4 flex items-center gap-2">
                               <span className="flex items-center justify-center w-6 h-6 rounded bg-blue-100 dark:bg-blue-500/20 text-xs">🛠</span>
                               Execution Strategy
                            </h4>
                            <div className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-line leading-7 pl-1">
                              {selectedTerm.strategy}
                            </div>
                        </div>
                      </div>

                      {/* Example Box */}
                      <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-6 border border-emerald-100 dark:border-emerald-500/20">
                          <h4 className="text-emerald-700 dark:text-emerald-400 font-bold text-base mb-3 flex items-center gap-2">
                             <span className="flex items-center justify-center w-6 h-6 rounded bg-emerald-100 dark:bg-emerald-500/20 text-xs">💡</span>
                             Real-World Setup
                          </h4>
                          <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-line leading-relaxed italic">
                            "{selectedTerm.example}"
                          </p>
                      </div>

                   </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 text-center rounded-b-2xl backdrop-blur">
               <span className="text-xs text-slate-500 dark:text-slate-600 font-medium">Disclaimer: Trading involves substantial risk of loss. This educational tool does not constitute financial advice.</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default App;