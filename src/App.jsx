import React, { useState, useMemo, useEffect, Suspense, lazy, memo, useCallback } from 'react';
// Optimized imports - only load needed icons
import Search from 'lucide-react/dist/esm/icons/search';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Globe from 'lucide-react/dist/esm/icons/globe';
import Shield from 'lucide-react/dist/esm/icons/shield';
import User from 'lucide-react/dist/esm/icons/user';
import Map from 'lucide-react/dist/esm/icons/map';
import ImageIcon from 'lucide-react/dist/esm/icons/image';
import Database from 'lucide-react/dist/esm/icons/database';
import Camera from 'lucide-react/dist/esm/icons/camera';
import MessageSquare from 'lucide-react/dist/esm/icons/message-square';
import Activity from 'lucide-react/dist/esm/icons/activity';
import Briefcase from 'lucide-react/dist/esm/icons/briefcase';
import Lock from 'lucide-react/dist/esm/icons/lock';
import Cpu from 'lucide-react/dist/esm/icons/cpu';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import BookOpen from 'lucide-react/dist/esm/icons/book-open';
import Anchor from 'lucide-react/dist/esm/icons/anchor';
import Cloud from 'lucide-react/dist/esm/icons/cloud';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import Terminal from 'lucide-react/dist/esm/icons/terminal';
import Send from 'lucide-react/dist/esm/icons/send';
import Sun from 'lucide-react/dist/esm/icons/sun';
import Moon from 'lucide-react/dist/esm/icons/moon';
import Languages from 'lucide-react/dist/esm/icons/languages';
import Star from 'lucide-react/dist/esm/icons/star';
import StarOff from 'lucide-react/dist/esm/icons/star-off';
import Download from 'lucide-react/dist/esm/icons/download';
import Filter from 'lucide-react/dist/esm/icons/filter';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Eye from 'lucide-react/dist/esm/icons/eye';
import Compass from 'lucide-react/dist/esm/icons/compass';
import Target from 'lucide-react/dist/esm/icons/target';
import Settings from 'lucide-react/dist/esm/icons/settings';
import History from 'lucide-react/dist/esm/icons/history';
import Presentation from 'lucide-react/dist/esm/icons/presentation';
import Keyboard from 'lucide-react/dist/esm/icons/keyboard';
import Heart from 'lucide-react/dist/esm/icons/heart';
import { useLanguage } from './i18n/LanguageContext';

// Lazy load heavy components and data
const ExportTools = lazy(() => import('./components/ExportTools').then(m => ({ default: m.ExportTools })));
const SearchHistory = lazy(() => import('./components/SearchHistory').then(m => ({ default: m.SearchHistory })));
const OSINTData = lazy(() => import('./data/osint-data').then(m => ({ default: () => m.OSINT_DATA })));

// Loading component for Suspense
const LoadingSpinner = memo(({ text = "Cargando..." }) => (
  <div className="flex items-center justify-center py-8">
    <Loader2 className="w-6 h-6 animate-spin text-osint-500 mr-3" />
    <span className="text-slate-500">{text}</span>
  </div>
));

// Memoized tool card component to prevent unnecessary re-renders
const ToolCard = memo(({ item, favorites, onToggleFavorite, theme, t }) => {
  const isFavorite = favorites.some(f => f.url === item.url);
  
  const handleToggleFavorite = useCallback((e) => {
    e.preventDefault();
    onToggleFavorite(item);
  }, [item, onToggleFavorite]);
  
  return (
    <div className={`group relative p-6 rounded-2xl border transition-all duration-300 card-hover backdrop-blur-sm ${theme.card} hover:border-osint-500/40 hover:shadow-xl hover:shadow-osint-500/5`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold transition-colors truncate pr-4 text-lg ${theme.textMain} group-hover:text-osint-500`}>
            {item.name}
          </h3>
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-osint-500/10 text-osint-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-lg transition-all hover:scale-110 ${isFavorite ? 'text-pink-500 hover:text-pink-400' : 'text-slate-400 hover:text-pink-500'}`}
          >
            {isFavorite ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
          </button>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-all hover:scale-110 ${theme.textSub} hover:text-osint-500`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
      <p className={`text-sm line-clamp-2 leading-relaxed ${theme.textSub}`}>
        {t(`tools.${item.descKey}`)}
      </p>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-osint-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
});

// Memoized category section
const CategorySection = memo(({ category, theme, t }) => (
  <div className="mb-8 animate-fade-in">
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
        {category.icon}
      </div>
      <div>
        <h2 className={`text-2xl font-bold ${theme.textMain}`}>
          {t(`categories.${category.category}`)}
        </h2>
        <p className={`text-sm ${theme.textSub}`}>
          {category.items.length} herramientas disponibles
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.items.map((item, idx) => (
        <ToolCard 
          key={`${item.url}-${idx}`}
          item={item}
          favorites={[]}
          onToggleFavorite={() => {}}
          theme={theme}
          t={t}
        />
      ))}
    </div>
  </div>
));

export default function App() {
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  
  // Lazy load OSINT_DATA
  const [osintData, setOsintData] = useState(null);
  
  // Load OSINT data on mount
  useEffect(() => {
    import('./data/osint-data').then(module => {
      setOsintData(module.OSINT_DATA);
    });
  }, []);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('osint-hub-theme');
    return saved ? saved === 'dark' : true;
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('osint-hub-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('osint-hub-search-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  
  // Gemini AI States
  const [isAiActive, setIsAiActive] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMode, setAiMode] = useState("plan"); // 'plan' or 'dork'

  // Optimized toggle favorites with useCallback
  const toggleFavorite = useCallback((tool) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.find(f => f.url === tool.url)
        ? prevFavorites.filter(f => f.url !== tool.url)
        : [...prevFavorites, tool];
      
      localStorage.setItem('osint-hub-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Search history management
  const addToSearchHistory = (query, results) => {
    if (query.trim()) {
      const newHistory = [{
        query,
        results,
        timestamp: Date.now()
      }, ...searchHistory.filter(h => h.query !== query)].slice(0, 20);
      
      setSearchHistory(newHistory);
      localStorage.setItem('osint-hub-search-history', JSON.stringify(newHistory));
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('osint-hub-search-history');
  };

  const searchFromHistory = (query) => {
    setSearchQuery(query);
    setShowHistory(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K para focus en search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        searchInput?.focus();
      }
      
      // Escape para cerrar modales
      if (e.key === 'Escape') {
        setShowSettings(false);
        setShowFavorites(false);
        setShowHistory(false);
        setIsSidebarOpen(false);
      }
      
      // Ctrl/Cmd + Shift + F para favoritos
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        setShowFavorites(!showFavorites);
      }

      // Ctrl/Cmd + Shift + H para historial
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'H') {
        e.preventDefault();
        setShowHistory(!showHistory);
      }

      // Ctrl/Cmd + Shift + P para modo presentación
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setPresentationMode(!presentationMode);
      }

      // Ctrl/Cmd + Shift + D para cambiar tema
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsDarkMode(!isDarkMode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFavorites, showHistory, presentationMode, isDarkMode]);

  // Auto-save theme preference
  useEffect(() => {
    localStorage.setItem('osint-hub-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const callGemini = async (prompt, systemInstruction) => {
    const apiKey = ""; // Usuario debe agregar su API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    if (!apiKey) {
      setAiOutput("Error: Por favor configura tu API key de Gemini en el código fuente.");
      setAiLoading(false);
      return;
    }
    
    setAiLoading(true);
    setAiOutput("");

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    let retries = 0;
    const maxRetries = 3;

    const executeRequest = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        setAiOutput(text || "No se recibió respuesta.");
      } catch (error) {
        if (retries < maxRetries) {
          retries++;
          const delay = Math.pow(2, retries) * 500;
          setTimeout(executeRequest, delay);
        } else {
          setAiOutput(t('ai.error'));
        }
      } finally {
        setAiLoading(false);
      }
    };

    executeRequest();
  };

  const handleAiAction = () => {
    if (!aiInput.trim()) return;
    let systemPrompt = "";
    if (aiMode === "plan") {
      systemPrompt = currentLanguage === 'es' 
        ? `Eres un investigador OSINT experto. Basándote en la pista proporcionada, genera un plan de investigación paso a paso. Sugiere categorías de herramientas específicas. Sé conciso y profesional. Responde en español.`
        : `You are an expert OSINT investigator. Based on the lead provided, generate a step-by-step investigation plan. Suggest specific tool categories. Be concise and professional.`;
    } else {
      systemPrompt = currentLanguage === 'es'
        ? `Eres un especialista en Google Dorking. Convierte la solicitud en lenguaje natural del usuario en una cadena de Google Dork válida. Proporciona el Dork claramente, seguido de una breve explicación. Responde en español.`
        : `You are a Google Dorking specialist. Convert the user's natural language request into a valid Google Dork string. Provide the Dork itself clearly, followed by a brief explanation.`;
    }
    callGemini(aiInput, systemPrompt);
  };

  const filteredData = useMemo(() => {
    if (!osintData) return [];
    
    let results = osintData;
    
    // Show only favorites if in favorites view
    if (showFavorites) {
      results = results.map(cat => ({
        ...cat,
        items: cat.items.filter(item => favorites.some(f => f.url === item.url))
      })).filter(cat => cat.items.length > 0);
    }
    
    if (activeCategory !== "all") {
      results = results.filter(cat => cat.category === activeCategory);
    }
    if (searchQuery) {
      results = results.map(cat => ({
        ...cat,
        items: cat.items.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t(`tools.${item.descKey}`).toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          t(`categories.${cat.category}`).toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.items.length > 0);
      
      // Add to search history
      const totalResults = results.reduce((acc, curr) => acc + curr.items.length, 0);
      if (searchQuery.length > 2) {
        setTimeout(() => addToSearchHistory(searchQuery, totalResults), 1000);
      }
    }
    return results;
  }, [searchQuery, activeCategory, t, showFavorites, favorites, osintData]);

  const categories = useMemo(() => {
    if (!osintData) return ["all"];
    return ["all", ...osintData.map(c => c.category)];
  }, [osintData]);

  // Theme colors - More organic and warm
  const theme = {
    bg: isDarkMode ? 'bg-slate-950' : 'bg-slate-50',
    sidebar: isDarkMode ? 'bg-slate-900/95 border-slate-800/50 backdrop-blur-sm' : 'bg-white/95 border-slate-200 backdrop-blur-sm',
    card: isDarkMode ? 'bg-slate-900/60 border-slate-800/50 hover:bg-slate-800/60' : 'bg-white/90 border-slate-200 hover:bg-slate-50/90 shadow-sm',
    textMain: isDarkMode ? 'text-slate-100' : 'text-slate-900',
    textSub: isDarkMode ? 'text-slate-400' : 'text-slate-600',
    input: isDarkMode ? 'bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-500',
    header: isDarkMode ? 'bg-slate-900/95 border-slate-800/50 backdrop-blur-md' : 'bg-white/95 border-slate-200 backdrop-blur-md',
    aiBox: isDarkMode ? 'bg-slate-950/80 border-slate-800/50' : 'bg-slate-50/80 border-slate-200',
    accent: 'from-osint-600 to-osint-500'
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textMain} font-sans selection:bg-osint-500/30 transition-all duration-500`}>
      {/* Header with improved styling */}
      <header className={`flex items-center justify-between p-4 sticky top-0 z-50 ${theme.header} border-b lg:px-8`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-7 h-7 text-osint-500 animate-pulse" />
            <div className="absolute -inset-1 bg-gradient-to-r from-osint-500/20 to-transparent rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">
              {t('header.title')} <span className="text-osint-500 font-display">HUB</span>
            </h1>
            <p className={`text-xs ${theme.textSub} hidden sm:block`}>{t('header.subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Language Selector */}
          <div className="relative group">
            <button 
              className={`p-2.5 rounded-xl transition-all ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'} group-hover:scale-105`}
            >
              <Languages className="w-5 h-5" />
            </button>
            <div className={`absolute right-0 top-full mt-2 w-32 py-2 rounded-xl border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${theme.sidebar}`}>
              {availableLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors ${currentLanguage === lang ? 'text-osint-500 font-semibold' : theme.textSub} hover:bg-slate-100 dark:hover:bg-slate-800`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl transition-all hover:scale-105 ${isDarkMode ? 'bg-slate-800/70 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            title={isDarkMode ? t('header.lightMode') : t('header.darkMode')}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {/* Mobile Menu */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className={`lg:hidden p-2.5 rounded-xl transition-all hover:scale-105 ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 lg:top-[73px] left-0 z-40 h-[calc(100vh-73px)] w-72 ${theme.sidebar} border-r transition-all duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="px-4 py-6 overflow-y-auto h-full custom-scrollbar">
            <div className="mb-6">
              <p className={`px-3 mb-3 text-xs font-semibold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {t('nav.categories')}
              </p>
              {categories.map((cat) => {
                const categoryData = osintData?.find(d => d.category === cat);
                const isActive = !isAiActive && activeCategory === cat;
                
                return (
                  <button
                    key={cat}
                    onClick={() => { 
                      setActiveCategory(cat); 
                      setIsSidebarOpen(false); 
                      setIsAiActive(false); 
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-2 group
                      ${isActive
                        ? 'bg-gradient-to-r from-osint-600 to-osint-500 text-white shadow-lg shadow-osint-500/25 scale-[1.02]' 
                        : isDarkMode 
                          ? 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100' 
                          : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                      }
                    `}
                  >
                    <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-white/20' : 'bg-slate-100/10'}`}>
                      {cat === "all" ? <Globe className="w-4 h-4" /> : (categoryData?.icon || <ChevronRight className="w-4 h-4" />)}
                    </div>
                    {t(`categories.${cat}`)}
                    {!isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />}
                  </button>
                );
              })}
            </div>

            <div className={`pt-6 border-t ${isDarkMode ? 'border-slate-800/50' : 'border-slate-200/50'}`}>
              <button
                onClick={() => { setShowFavorites(!showFavorites); setIsAiActive(false); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-2 group
                  ${showFavorites 
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/25 scale-[1.02]' 
                    : isDarkMode 
                      ? 'text-slate-400 hover:bg-pink-600/10 hover:text-pink-300 border border-transparent hover:border-pink-500/20' 
                      : 'text-slate-600 hover:bg-pink-50 hover:text-pink-700 border border-transparent hover:border-pink-200'
                  }
                `}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${showFavorites ? 'bg-white/20' : 'bg-pink-500/10'}`}>
                  <Heart className="w-4 h-4" />
                </div>
                ⭐ {t('nav.favorites')} ({favorites.length})
              </button>

              <button
                onClick={() => { setShowHistory(!showHistory); setIsAiActive(false); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-2 group
                  ${showHistory 
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25 scale-[1.02]' 
                    : isDarkMode 
                      ? 'text-slate-400 hover:bg-amber-600/10 hover:text-amber-300 border border-transparent hover:border-amber-500/20' 
                      : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-transparent hover:border-amber-200'
                  }
                `}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${showHistory ? 'bg-white/20' : 'bg-amber-500/10'}`}>
                  <History className="w-4 h-4" />
                </div>
                📜 Historial ({searchHistory.length})
              </button>

              <button
                onClick={() => { setIsAiActive(true); setIsSidebarOpen(false); setShowFavorites(false); setShowHistory(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mb-2 group
                  ${isAiActive 
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 scale-[1.02]' 
                    : isDarkMode 
                      ? 'text-slate-400 hover:bg-gradient-to-r hover:from-violet-600/10 hover:to-purple-600/10 hover:text-violet-300 border border-transparent hover:border-violet-500/20' 
                      : 'text-slate-600 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 hover:text-violet-700 border border-transparent hover:border-violet-200'
                  }
                `}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${isAiActive ? 'bg-white/20' : 'bg-violet-500/10'}`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                ✨ {t('ai.title')}
                {!isAiActive && <div className="ml-auto w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>}
              </button>

              <button
                onClick={() => { setShowSettings(!showSettings); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-2 group
                  ${showSettings 
                    ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg' 
                    : isDarkMode 
                      ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${showSettings ? 'bg-white/20' : 'bg-slate-500/10'}`}>
                  <Settings className="w-4 h-4" />
                </div>
                ⚙️ {t('nav.settings')}
              </button>
            </div>

            {/* Stats */}
            <div className={`mt-6 p-4 rounded-xl border ${isDarkMode ? 'bg-slate-800/30 border-slate-800/50' : 'bg-slate-50/50 border-slate-200'}`}>
              <div className="flex items-center justify-between text-xs">
                <span className={theme.textSub}>{t('search.results')}</span>
                <span className="font-mono text-osint-500">
                  {filteredData.reduce((acc, curr) => acc + curr.items.length, 0)}
                </span>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 lg:p-8">
          {showFavorites ? (
            /* Favorites View */
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    ⭐ {t('nav.favorites')}
                  </h2>
                  <p className={theme.textSub}>
                    {favorites.length} herramientas marcadas como favoritas
                  </p>
                </div>
                <button
                  onClick={() => setShowFavorites(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {favorites.length === 0 ? (
                <div className={`text-center py-20 rounded-3xl border border-dashed ${isDarkMode ? 'bg-slate-900/20 border-slate-800' : 'bg-slate-100/50 border-slate-200'}`}>
                  <Star className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-2">No tienes favoritos aún</h3>
                  <p className={theme.textSub}>Marca herramientas como favoritas para acceso rápido</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((item, idx) => (
                    <div
                      key={idx}
                      className={`group relative p-6 rounded-2xl border transition-all duration-300 card-hover backdrop-blur-sm ${theme.card} hover:border-pink-500/40 hover:shadow-xl hover:shadow-pink-500/5`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold transition-colors truncate pr-4 text-lg ${isDarkMode ? 'text-slate-100 group-hover:text-white' : 'text-slate-800 group-hover:text-pink-600'}`}>
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(item);
                            }}
                            className="p-2 rounded-lg transition-all hover:scale-110 text-pink-500 hover:text-pink-400"
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-lg transition-all hover:scale-110 ${isDarkMode ? 'text-slate-600 hover:text-osint-400' : 'text-slate-300 hover:text-osint-600'}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <p className={`text-sm line-clamp-2 leading-relaxed ${theme.textSub}`}>
                        {t(`tools.${item.descKey}`)}
                      </p>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : showHistory ? (
            /* History View */
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    📜 Historial de Búsquedas
                  </h2>
                  <p className={theme.textSub}>
                    Tus {searchHistory.length} búsquedas más recientes
                  </p>
                </div>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <SearchHistory 
                history={searchHistory}
                onClearHistory={clearSearchHistory}
                onSearchFromHistory={searchFromHistory}
                isDarkMode={isDarkMode}
              />
            </div>
          ) : showSettings ? (
            /* Settings View */
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    ⚙️ {t('nav.settings')}
                  </h2>
                  <p className={theme.textSub}>
                    Configuración y herramientas de exportación
                  </p>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-8">
                <ExportTools 
                  favorites={favorites}
                  searchHistory={searchHistory}
                  isDarkMode={isDarkMode}
                />
                
                {/* Keyboard Shortcuts */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Keyboard className="w-5 h-5" />
                    Atajos de Teclado
                  </h3>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl border ${theme.card}`}>
                    {[
                      { keys: ['Ctrl/Cmd', 'K'], desc: 'Enfocar búsqueda' },
                      { keys: ['Ctrl/Cmd', 'Shift', 'F'], desc: 'Ver favoritos' },
                      { keys: ['Ctrl/Cmd', 'Shift', 'H'], desc: 'Ver historial' },
                      { keys: ['Ctrl/Cmd', 'Shift', 'D'], desc: 'Cambiar tema' },
                      { keys: ['Escape'], desc: 'Cerrar modales' }
                    ].map((shortcut, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm">{shortcut.desc}</span>
                        <div className="flex gap-1">
                          {shortcut.keys.map(key => (
                            <kbd key={key} className={`px-2 py-1 text-xs font-mono rounded border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-300'}`}>
                              {key}
                            </kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Presentation Mode */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Presentation className="w-5 h-5" />
                    Modo Presentación
                  </h3>
                  <button
                    onClick={() => setPresentationMode(!presentationMode)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${presentationMode ? 'border-osint-500 bg-osint-500/10' : 'border-slate-300 dark:border-slate-700 hover:border-osint-500/50'}`}
                  >
                    <Presentation className="w-5 h-5 text-osint-500" />
                    <div className="text-left">
                      <div className="font-medium">
                        {presentationMode ? 'Desactivar' : 'Activar'} Modo Presentación
                      </div>
                      <div className="text-sm opacity-70">
                        Interfaz limpia para demostraciones
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : !isAiActive ? (
            <div className="animate-fade-in">
              {/* Enhanced Search Bar */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-osint-400' : 'text-slate-400 group-focus-within:text-osint-600'}`} />
                  </div>
                  <input
                    type="text"
                    placeholder={t('search.placeholder')}
                    className={`block w-full pl-12 pr-20 py-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-osint-500/30 text-lg ${theme.input} ${isDarkMode ? 'focus:border-osint-500 shadow-lg shadow-slate-900/10' : 'focus:border-osint-400 shadow-lg shadow-slate-200/20'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-5 flex items-center">
                    <div className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg ${isDarkMode ? 'text-slate-500 bg-slate-800/50' : 'text-slate-400 bg-slate-100/80'}`}>
                      <TrendingUp className="w-3 h-3" />
                      {filteredData.reduce((acc, curr) => acc + curr.items.length, 0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid with improved animations */}
              <div className="max-w-6xl mx-auto space-y-12">
                {filteredData.length > 0 ? (
                  filteredData.map((category, categoryIndex) => (
                    <section 
                      key={category.category} 
                      className="animate-slide-in-from-bottom"
                      style={{ animationDelay: `${categoryIndex * 100}ms` }}
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`relative p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                          {category.icon}
                          <div className="absolute inset-0 rounded-xl bg-white/20 blur-sm"></div>
                        </div>
                        <div>
                          <h2 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {t(`categories.${category.category}`)}
                          </h2>
                          <p className={`text-sm ${theme.textSub} mt-1`}>
                            {category.items.length} {category.items.length === 1 ? 'herramienta' : 'herramientas'}
                          </p>
                        </div>
                        <div className={`h-px flex-1 ml-6 hidden md:block bg-gradient-to-r ${category.color} opacity-30`}></div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.items.map((item, idx) => {
                          const isFavorite = favorites.some(f => f.url === item.url);
                          
                          return (
                            <div
                              key={idx}
                              className={`group relative p-6 rounded-2xl border transition-all duration-300 card-hover backdrop-blur-sm ${theme.card} hover:border-osint-500/40 hover:shadow-xl hover:shadow-osint-500/5`}
                              style={{ animationDelay: `${(categoryIndex * 100) + (idx * 50)}ms` }}
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex-1 min-w-0">
                                  <h3 className={`font-semibold transition-colors truncate pr-4 text-lg ${isDarkMode ? 'text-slate-100 group-hover:text-white' : 'text-slate-800 group-hover:text-osint-600'}`}>
                                    {item.name}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-2">
                                    {item.tags.slice(0, 2).map(tag => (
                                      <span key={tag} className={`px-2 py-1 rounded-md text-xs font-mono ${isDarkMode ? 'bg-slate-800/60 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      toggleFavorite(item);
                                    }}
                                    className={`p-2 rounded-lg transition-all hover:scale-110 ${isFavorite ? 'text-yellow-500 hover:text-yellow-400' : 'text-slate-400 hover:text-yellow-500'}`}
                                  >
                                    {isFavorite ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                                  </button>
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg transition-all hover:scale-110 ${isDarkMode ? 'text-slate-600 hover:text-osint-400' : 'text-slate-300 hover:text-osint-600'}`}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                              <p className={`text-sm line-clamp-2 leading-relaxed ${theme.textSub}`}>
                                {t(`tools.${item.descKey}`)}
                              </p>
                              
                              {/* Subtle hover effect */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-osint-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ))
                ) : (
                  <div className={`text-center py-24 rounded-3xl border-2 border-dashed transition-all ${isDarkMode ? 'bg-slate-900/20 border-slate-800 hover:border-slate-700' : 'bg-slate-100/50 border-slate-200 hover:border-slate-300'}`}>
                    <Database className="w-16 h-16 text-slate-400 mx-auto mb-6 animate-float" />
                    <h3 className="text-xl font-semibold mb-2">{t('search.noResults')}</h3>
                    <p className={`${theme.textSub} mb-6`}>{t('search.noResultsDesc')}</p>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="px-6 py-2 bg-osint-500 text-white rounded-lg hover:bg-osint-600 transition-colors"
                    >
                      Limpiar búsqueda
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Enhanced AI View */
            <div className="max-w-5xl mx-auto animate-fade-in">
              <div className="mb-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="relative">
                    <Sparkles className="w-8 h-8 text-violet-500 animate-pulse" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full animate-ping"></div>
                  </div>
                  <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {t('ai.title')}
                  </h2>
                </div>
                <p className={`${theme.textSub} text-lg max-w-2xl mx-auto`}>
                  {t('ai.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Mode Selector */}
                <div className="flex justify-center">
                  <div className={`flex p-1.5 rounded-2xl border shadow-lg ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                    {[
                      { key: 'plan', icon: <Target className="w-4 h-4" />, label: t('ai.investigatorPlan') },
                      { key: 'dork', icon: <Search className="w-4 h-4" />, label: t('ai.dorkGenerator') }
                    ].map(mode => (
                      <button 
                        key={mode.key}
                        onClick={() => setAiMode(mode.key)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${aiMode === mode.key 
                          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' 
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                      >
                        {mode.icon}
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Section */}
                <div className={`border rounded-3xl p-8 shadow-2xl backdrop-blur-sm ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
                  <div className="flex items-center gap-3 mb-6 text-violet-500 font-mono text-sm uppercase tracking-widest">
                    <Terminal className="w-5 h-5" />
                    <span>{aiMode === 'plan' ? t('ai.leadAnalysis') : t('ai.querySynthesis')}</span>
                  </div>
                  <textarea
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder={aiMode === 'plan' ? t('ai.planPlaceholder') : t('ai.dorkPlaceholder')}
                    className={`w-full border rounded-2xl p-6 transition-all outline-none focus:ring-2 focus:ring-violet-500/30 h-40 resize-none mb-6 text-lg ${theme.input} ${isDarkMode ? 'focus:border-violet-500' : 'focus:border-violet-400'}`}
                  />
                  <button
                    onClick={handleAiAction}
                    disabled={aiLoading || !aiInput.trim()}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
                  >
                    {aiLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <Send className="w-6 h-6" />
                    )}
                    {aiMode === 'plan' ? t('ai.generatePlan') : t('ai.synthesizeDork')}
                  </button>
                </div>

                {/* Results Section */}
                {(aiOutput || aiLoading) && (
                  <div className={`border rounded-3xl p-8 shadow-2xl backdrop-blur-sm animate-slide-in-from-bottom ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 text-emerald-500 font-mono text-sm uppercase tracking-widest">
                        <CheckCircle className="w-5 h-5" />
                        <span>{t('ai.results')}</span>
                      </div>
                      {aiOutput && (
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(aiOutput);
                          }}
                          className="text-xs text-slate-500 hover:text-violet-600 flex items-center gap-2 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Download className="w-4 h-4" />
                          {t('ai.copy')}
                        </button>
                      )}
                    </div>
                    <div className={`p-6 rounded-2xl border font-mono text-sm leading-relaxed whitespace-pre-wrap min-h-32 ${theme.aiBox}`}>
                      {aiLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="flex items-center gap-3 text-violet-500">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="font-sans">{t('ai.loading')}</span>
                          </div>
                        </div>
                      ) : (
                        aiOutput
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}