import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ExternalLink, 
  Globe, 
  Shield, 
  User, 
  Map, 
  Image as ImageIcon, 
  Database, 
  Camera, 
  MessageSquare, 
  Activity, 
  Briefcase, 
  Lock, 
  Cpu, 
  FileText, 
  ChevronRight,
  Menu,
  X,
  Anchor,
  Cloud,
  CheckCircle,
  Zap,
  Sparkles,
  Loader2,
  Terminal,
  Send,
  Sun,
  Moon,
  Languages,
  Star,
  StarOff,
  Download,
  Filter,
  TrendingUp,
  Eye,
  Compass,
  Target,
  History,
  Heart
} from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext';
import { SearchHistory } from './components/SearchHistory';

const VeriSource_DATA = [
  {
    category: "searchEngines",
    icon: <Search className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    items: [
      { 
        name: "Google", 
        url: "https://www.google.com/", 
        descKey: "google",
        tags: ["general", "popular", "worldwide"] 
      },
      { 
        name: "Google Advanced Search", 
        url: "https://www.google.com/advanced_search", 
        descKey: "googleAdvanced",
        tags: ["advanced", "filters", "precise"] 
      },
      { 
        name: "Google Hacking Database", 
        url: "https://www.exploit-db.com/google-hacking-database", 
        descKey: "googleHacking",
        tags: ["security", "dorks", "vulnerabilities"] 
      },
      { 
        name: "Bing", 
        url: "https://www.bing.com/", 
        descKey: "bing",
        tags: ["microsoft", "alternative", "images"] 
      },
      { 
        name: "Yandex", 
        url: "https://yandex.com/", 
        descKey: "yandex",
        tags: ["russia", "cyrillic", "regional"] 
      },
      { 
        name: "Baidu", 
        url: "https://www.baidu.com/", 
        descKey: "baidu",
        tags: ["china", "chinese", "regional"] 
      },
      { 
        name: "DuckDuckGo", 
        url: "https://duckduckgo.com/", 
        descKey: "duckduckgo",
        tags: ["privacy", "anonymous", "no-tracking"] 
      },
      { 
        name: "Startpage", 
        url: "https://www.startpage.com/", 
        descKey: "startpage",
        tags: ["privacy", "google-proxy", "anonymous"] 
      }
    ]
  },
  {
    category: "socialMedia",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "from-pink-500 to-rose-500",
    items: [
      { 
        name: "Twitonomy", 
        url: "https://www.twitonomy.com/", 
        descKey: "twitonomy",
        tags: ["twitter", "analytics", "statistics"] 
      },
      { 
        name: "Bot Sentinel", 
        url: "https://botsentinel.com/", 
        descKey: "botSentinel",
        tags: ["bots", "automation", "detection"] 
      },
      { 
        name: "Wayback Tweets", 
        url: "https://waybacktweets.streamlit.app/", 
        descKey: "waybackTweets",
        tags: ["archive", "deleted", "history"] 
      },
      { 
        name: "Instagram Explorer", 
        url: "https://www.VeriSourcecombine.com/free-VeriSource-tools/instagram-explorer", 
        descKey: "instagramExplorer",
        tags: ["instagram", "profiles", "analysis"] 
      },
      { 
        name: "Picuki", 
        url: "https://www.picuki.com/", 
        descKey: "picuki",
        tags: ["instagram", "viewer", "anonymous"] 
      },
      { 
        name: "TikTok Quick Search", 
        url: "https://www.VeriSourcecombine.com/free-VeriSource-tools/tiktok-quick-search", 
        descKey: "tiktokSearch",
        tags: ["tiktok", "videos", "search"] 
      },
      { 
        name: "Telegago", 
        url: "https://cse.google.com/cse?&cx=006368593537057042503:efxu7xprihg", 
        descKey: "telegago",
        tags: ["telegram", "channels", "search"] 
      },
      { 
        name: "Graph.tips", 
        url: "http://graph.tips/beta/", 
        descKey: "graphTips",
        tags: ["facebook", "search", "filters"] 
      }
    ]
  },
  {
    category: "personSearch",
    icon: <User className="w-5 h-5" />,
    color: "from-purple-500 to-indigo-500",
    items: [
      { 
        name: "Email Reputation", 
        url: "https://emailrep.io/", 
        descKey: "emailRep",
        tags: ["email", "validation", "reputation"] 
      },
      { 
        name: "Epieos Tools", 
        url: "https://tools.epieos.com/google-account.php", 
        descKey: "epieos",
        tags: ["gmail", "google", "accounts"] 
      },
      { 
        name: "Hunter.io", 
        url: "https://hunter.io/", 
        descKey: "hunter",
        tags: ["email", "finder", "business"] 
      },
      { 
        name: "Instant Username", 
        url: "https://instantusername.com/", 
        descKey: "instantUsername",
        tags: ["username", "social", "availability"] 
      },
      { 
        name: "WhatsMyName", 
        url: "https://whatsmyname.app/", 
        descKey: "whatsmyname",
        tags: ["username", "comprehensive", "platforms"] 
      },
      { 
        name: "Have I Been Pwned", 
        url: "https://haveibeenpwned.com/", 
        descKey: "haveibeenpwned",
        tags: ["breach", "security", "passwords"] 
      },
      { 
        name: "Pipl", 
        url: "https://pipl.com/", 
        descKey: "pipl",
        tags: ["people", "global", "deep-web"] 
      },
      {
        name: "ThatsThem",
        url: "https://thatsthem.com/people-search",
        descKey: "thatsthem",
        tags: ["reverse", "phone", "address"]
      },
      {
        name: "IDCrawl",
        url: "https://www.idcrawl.com/",
        descKey: "idcrawl",
        tags: ["people", "reverse", "search"]
      }
    ]
  },
  {
    category: "imageMapping",
    icon: <Map className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-500",
    items: [
      { 
        name: "Tineye", 
        url: "https://tineye.com/", 
        descKey: "tineye",
        tags: ["reverse", "image", "search"] 
      },
      { 
        name: "FaceCheck.id", 
        url: "https://facecheck.id/", 
        descKey: "facecheck",
        tags: ["face", "recognition", "ai"] 
      },
      { 
        name: "Suncalc", 
        url: "https://www.suncalc.org/", 
        descKey: "suncalc",
        tags: ["geolocation", "shadow", "time"] 
      },
      { 
        name: "FotoForensics", 
        url: "https://fotoforensics.com/", 
        descKey: "fotoforensics",
        tags: ["metadata", "forensics", "analysis"] 
      },
      { 
        name: "Dual Maps", 
        url: "https://www.mapchannels.com/DualMaps.aspx", 
        descKey: "dualmaps",
        tags: ["streetview", "comparison", "maps"] 
      },
      { 
        name: "Zoom Earth", 
        url: "https://zoom.earth/", 
        descKey: "zoomearth",
        tags: ["satellite", "weather", "live"] 
      },
      { 
        name: "PeakFinder", 
        url: "https://www.peakfinder.org/", 
        descKey: "peakfinder",
        tags: ["mountains", "geography", "identification"] 
      }
    ]
  },
  {
    category: "corporateTech",
    icon: <Briefcase className="w-5 h-5" />,
    color: "from-orange-500 to-red-500",
    items: [
      { 
        name: "OpenCorporates", 
        url: "https://opencorporates.com/", 
        descKey: "opencorporates",
        tags: ["companies", "corporate", "database"] 
      },
      { 
        name: "ICIJ Offshore Leaks", 
        url: "http://offshoreleaks.icij.org/", 
        descKey: "offshoreleaks",
        tags: ["panama-papers", "offshore", "financial"] 
      },
      { 
        name: "BuiltWith", 
        url: "https://builtwith.com/", 
        descKey: "builtwith",
        tags: ["technology", "stack", "website"] 
      },
      { 
        name: "Urlscan.io", 
        url: "https://urlscan.io/", 
        descKey: "urlscan",
        tags: ["url", "analysis", "security"] 
      },
      { 
        name: "DNS Dumpster", 
        url: "https://dnsdumpster.com/", 
        descKey: "dnsdumpster",
        tags: ["dns", "domain", "infrastructure"] 
      },
      { 
        name: "CyberChef", 
        url: "https://gchq.github.io/CyberChef/", 
        descKey: "cyberchef",
        tags: ["encoding", "decoding", "analysis"] 
      }
    ]
  },
  {
    category: "transportLive",
    icon: <Activity className="w-5 h-5" />,
    color: "from-yellow-500 to-amber-500",
    items: [
      { 
        name: "MarineTraffic", 
        url: "https://www.marinetraffic.com/", 
        descKey: "marinetraffic",
        tags: ["ships", "maritime", "tracking"] 
      },
      { 
        name: "RadarBox", 
        url: "https://www.radarbox24.com/", 
        descKey: "radarbox",
        tags: ["flights", "aircraft", "live"] 
      },
      { 
        name: "OpenRailwayMap", 
        url: "https://www.openrailwaymap.org/", 
        descKey: "openrailway",
        tags: ["railway", "trains", "infrastructure"] 
      },
      { 
        name: "Broadcastify", 
        url: "https://www.broadcastify.com/listen/", 
        descKey: "broadcastify",
        tags: ["radio", "scanner", "emergency"] 
      },
      { 
        name: "Windy", 
        url: "https://www.windy.com/", 
        descKey: "windy",
        tags: ["weather", "webcams", "live"] 
      }
    ]
  },
  {
    category: "artificialIntelligence",
    icon: <Cpu className="w-5 h-5" />,
    color: "from-violet-500 to-purple-500",
    items: [
      { 
        name: "ChatGPT", 
        url: "https://chatgpt.com/", 
        descKey: "chatgpt",
        tags: ["openai", "language", "assistant"] 
      },
      { 
        name: "Gemini", 
        url: "https://gemini.google.com/", 
        descKey: "gemini",
        tags: ["google", "multimodal", "ai"] 
      },
      { 
        name: "Claude", 
        url: "https://claude.ai/", 
        descKey: "claude",
        tags: ["anthropic", "helpful", "harmless"] 
      },
      { 
        name: "Consensus", 
        url: "https://consensus.app/", 
        descKey: "consensus",
        tags: ["research", "papers", "scientific"] 
      },
      { 
        name: "Undetectable AI", 
        url: "https://undetectable.ai/", 
        descKey: "undetectable",
        tags: ["detection", "humanizer", "bypass"] 
      }
    ]
  },
  {
    category: "verificationBlogs",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
    items: [
      { 
        name: "Bellingcat", 
        url: "https://www.bellingcat.com/", 
        descKey: "bellingcat",
        tags: ["journalism", "investigation", "verification"] 
      },
      { 
        name: "Snopes", 
        url: "https://www.snopes.com/", 
        descKey: "snopes",
        tags: ["fact-check", "debunking", "rumors"] 
      },
      { 
        name: "VeriSource Framework", 
        url: "https://VeriSourceframework.com/", 
        descKey: "VeriSourceframework",
        tags: ["directory", "comprehensive", "tools"] 
      },
      { 
        name: "IntelTechniques", 
        url: "https://inteltechniques.com/", 
        descKey: "inteltechniques",
        tags: ["michael-bazzell", "methods", "training"] 
      },
      { 
        name: "Sector035", 
        url: "https://sector035.nl/", 
        descKey: "sector035",
        tags: ["weekly", "blog", "updates"] 
      }
    ]
  }
];

export default function App() {
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('VeriSource-hub-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('VeriSource-hub-search-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // Gemini AI States
  const [isAiActive, setIsAiActive] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMode, setAiMode] = useState("plan"); // 'plan' or 'dork'

  // Toggle favorites
  const toggleFavorite = (tool) => {
    const newFavorites = favorites.find(f => f.url === tool.url)
      ? favorites.filter(f => f.url !== tool.url)
      : [...favorites, tool];
    
    setFavorites(newFavorites);
    localStorage.setItem('VeriSource-hub-favorites', JSON.stringify(newFavorites));
  };

  // Search history management
  const addToSearchHistory = (query, results) => {
    if (query.trim()) {
      const newHistory = [{
        query,
        results,
        timestamp: Date.now()
      }, ...searchHistory.filter(h => h.query !== query)].slice(0, 20);
      
      setSearchHistory(newHistory);
      localStorage.setItem('VeriSource-hub-search-history', JSON.stringify(newHistory));
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('VeriSource-hub-search-history');
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

      // Ctrl/Cmd + Shift + D para cambiar tema
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsDarkMode(!isDarkMode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFavorites, showHistory, isDarkMode]);

  // Auto-save theme preference
  useEffect(() => {
    localStorage.setItem('VeriSource-hub-theme', isDarkMode ? 'dark' : 'light');
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
        ? `Eres un investigador VeriSource experto. Basándote en la pista proporcionada, genera un plan de investigación paso a paso. Sugiere categorías de herramientas específicas. Sé conciso y profesional. Responde en español.`
        : `You are an expert VeriSource investigator. Based on the lead provided, generate a step-by-step investigation plan. Suggest specific tool categories. Be concise and professional.`;
    } else {
      systemPrompt = currentLanguage === 'es'
        ? `Eres un especialista en Google Dorking. Convierte la solicitud en lenguaje natural del usuario en una cadena de Google Dork válida. Proporciona el Dork claramente, seguido de una breve explicación. Responde en español.`
        : `You are a Google Dorking specialist. Convert the user's natural language request into a valid Google Dork string. Provide the Dork itself clearly, followed by a brief explanation.`;
    }
    callGemini(aiInput, systemPrompt);
  };

  const filteredData = useMemo(() => {
    let results = VeriSource_DATA;
    
    // Show only favorites if in favorites view
    if (showFavorites) {
      results = results.map(cat => ({
        ...cat,
        items: cat.items.filter(item => favorites.some(f => f.url === item.url))
      })).filter(cat => cat.items.length > 0);
    }
    
    if (!showFavorites && !showHistory && !isAiActive && activeCategory !== "all") {
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
  }, [searchQuery, activeCategory, t, showFavorites, showHistory, isAiActive, favorites]);

  const categories = ["all", ...VeriSource_DATA.map(c => c.category)];

  // Tag color mapping
  const getTagColor = (tag) => {
    const colorMap = {
      // Search engines
      'general': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'popular': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'worldwide': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'advanced': 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
      'filters': 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
      'precise': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'security': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'dorks': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      'vulnerabilities': 'bg-red-600/20 text-red-300 border border-red-600/30',
      'microsoft': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'alternative': 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
      'images': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'russia': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'cyrillic': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'regional': 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      'china': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'chinese': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'privacy': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'anonymous': 'bg-green-600/20 text-green-300 border border-green-600/30',
      'no-tracking': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'google-proxy': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      // Social Media
      'twitter': 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
      'analytics': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'statistics': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'bots': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'automation': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      'detection': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      'archive': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'deleted': 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
      'history': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'instagram': 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
      'profiles': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'analysis': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'viewer': 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
      'anonymous': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'tiktok': 'bg-black/30 text-white border border-slate-500/30',
      'videos': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'search': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'telegram': 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
      'channels': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'facebook': 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
      'filters': 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
      // Person Search
      'email': 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      'validation': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'reputation': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'gmail': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'google': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'accounts': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'finder': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      'business': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'username': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'social': 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
      'availability': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'comprehensive': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'platforms': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'breach': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'passwords': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      'people': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'global': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'deep-web': 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
      'reverse': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'phone': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'address': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      // Image & Mapping
      'image': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'face': 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
      'recognition': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'ai': 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
      'geolocation': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'shadow': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'time': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      'metadata': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'forensics': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'streetview': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'comparison': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'maps': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'satellite': 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
      'weather': 'bg-cyan-600/20 text-cyan-300 border border-cyan-600/30',
      'live': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'mountains': 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      'geography': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'identification': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      // Corporate & Tech
      'companies': 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
      'corporate': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'database': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'panama-papers': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'offshore': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'financial': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'technology': 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
      'stack': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      'website': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'url': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'domain': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'infrastructure': 'bg-orange-600/20 text-orange-300 border border-orange-600/30',
      'dns': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'encoding': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'decoding': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      // Transport & Live
      'ships': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'maritime': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'tracking': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'flights': 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
      'aircraft': 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
      'railway': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      'trains': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'radio': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'scanner': 'bg-red-600/20 text-red-300 border border-red-600/30',
      'emergency': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'webcams': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      // AI
      'openai': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'language': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'assistant': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'multimodal': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'anthropic': 'bg-purple-600/20 text-purple-300 border border-purple-600/30',
      'helpful': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'harmless': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'research': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'papers': 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
      'scientific': 'bg-green-600/20 text-green-300 border border-green-600/30',
      'humanizer': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'bypass': 'bg-red-500/20 text-red-400 border border-red-500/30',
      // Verification & Blogs
      'journalism': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'investigation': 'bg-red-500/20 text-red-400 border border-red-500/30',
      'verification': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'fact-check': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
      'debunking': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'rumors': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      'directory': 'bg-blue-600/20 text-blue-300 border border-blue-600/30',
      'tools': 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
      'michael-bazzell': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'methods': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      'training': 'bg-green-500/20 text-green-400 border border-green-500/30',
      'weekly': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      'blog': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      'updates': 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    };

    return colorMap[tag] || 'bg-slate-700/40 text-slate-300 border border-slate-600/30';
  };

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
    accent: 'from-VeriSource-600 to-VeriSource-500'
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textMain} font-sans selection:bg-VeriSource-500/30 transition-all duration-500`}>
      {/* Header with improved styling */}
      <header className={`flex items-center justify-between p-3 sm:p-4 sticky top-0 z-50 ${theme.header} border-b lg:px-8`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-6 sm:w-7 h-6 sm:h-7 text-VeriSource-500 animate-pulse" />
            <div className="absolute -inset-1 bg-gradient-to-r from-VeriSource-500/20 to-transparent rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="font-bold text-lg sm:text-xl tracking-tight">
              {t('header.title')} <span className="text-VeriSource-500 font-display">HUB</span>
            </h1>
            <p className={`text-xs ${theme.textSub} hidden sm:block`}>{t('header.subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Language Selector */}
          <div className="relative group hidden sm:block">
            <button
              className={`p-2 sm:p-2.5 rounded-xl transition-all ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'} group-hover:scale-105`}
            >
              <Languages className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <div className={`absolute right-0 top-full mt-2 w-32 py-2 rounded-xl border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${theme.sidebar}`}>
              {availableLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors ${currentLanguage === lang ? 'text-VeriSource-500 font-semibold' : theme.textSub} hover:bg-slate-100 dark:hover:bg-slate-800`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 sm:p-2.5 rounded-xl transition-all hover:scale-105 ${isDarkMode ? 'bg-slate-800/70 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            title={isDarkMode ? t('header.lightMode') : t('header.darkMode')}
          >
            {isDarkMode ? <Sun className="w-4 sm:w-5 h-4 sm:h-5" /> : <Moon className="w-4 sm:w-5 h-4 sm:h-5" />}
          </button>
          
          {/* Mobile Menu */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`lg:hidden p-2 sm:p-2.5 rounded-xl transition-all hover:scale-105 ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 lg:top-[73px] left-0 z-40 h-[calc(100vh-73px)] w-full sm:w-80 lg:w-72 ${theme.sidebar} border-r transition-all duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="px-4 py-6 overflow-y-auto h-full custom-scrollbar">
            <div className="mb-6">
              <p className={`px-3 mb-3 text-xs font-semibold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {t('nav.categories')}
              </p>
              {categories.map((cat) => {
                const categoryData = VeriSource_DATA.find(d => d.category === cat);
                const isActive = !isAiActive && !showFavorites && !showHistory && activeCategory === cat;
                
                return (
                  <button
                    key={cat}
                    onClick={() => { 
                      setActiveCategory(cat); 
                      setIsSidebarOpen(false); 
                      setIsAiActive(false);
                      setShowFavorites(false);
                      setShowHistory(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-2 group
                      ${isActive
                        ? 'bg-gradient-to-r from-VeriSource-600 to-VeriSource-500 text-white shadow-lg shadow-VeriSource-500/25 scale-[1.02]' 
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

            </div>

            {/* Stats */}
            <div className={`mt-6 p-4 rounded-xl border ${isDarkMode ? 'bg-slate-800/30 border-slate-800/50' : 'bg-slate-50/50 border-slate-200'}`}>
              <div className="flex items-center justify-between text-xs">
                <span className={theme.textSub}>{t('search.results')}</span>
                <span className="font-mono text-VeriSource-500">
                  {filteredData.reduce((acc, curr) => acc + curr.items.length, 0)}
                </span>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8">
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
                            className={`p-2 rounded-lg transition-all hover:scale-110 ${isDarkMode ? 'text-slate-600 hover:text-VeriSource-400' : 'text-slate-300 hover:text-VeriSource-600'}`}
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
          ) : !isAiActive ? (
            <div className="animate-fade-in">
              {/* Enhanced Search Bar */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-VeriSource-400' : 'text-slate-400 group-focus-within:text-VeriSource-600'}`} />
                  </div>
                  <input
                    type="text"
                    placeholder={t('search.placeholder')}
                    className={`block w-full pl-12 pr-20 py-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-VeriSource-500/30 text-lg ${theme.input} ${isDarkMode ? 'focus:border-VeriSource-500 shadow-lg shadow-slate-900/10' : 'focus:border-VeriSource-400 shadow-lg shadow-slate-200/20'}`}
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
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {category.items.map((item, idx) => {
                          const isFavorite = favorites.some(f => f.url === item.url);
                          
                          return (
                            <div
                              key={idx}
                              className={`group relative p-6 rounded-2xl border transition-all duration-300 card-hover backdrop-blur-sm ${theme.card} hover:border-VeriSource-500/40 hover:shadow-xl hover:shadow-VeriSource-500/5`}
                              style={{ animationDelay: `${(categoryIndex * 100) + (idx * 50)}ms` }}
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex-1 min-w-0">
                                  <h3 className={`font-semibold transition-colors truncate pr-4 text-lg ${isDarkMode ? 'text-slate-100 group-hover:text-white' : 'text-slate-800 group-hover:text-VeriSource-600'}`}>
                                    {item.name}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-2">
                                    {item.tags.slice(0, 2).map(tag => (
                                      <span key={tag} className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${getTagColor(tag)}`}>
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
                                    {isFavorite ? <Star className="w-4 h-4 fill-current" /> : <Star className="w-4 h-4" />}
                                  </button>
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg transition-all hover:scale-110 ${isDarkMode ? 'text-slate-600 hover:text-VeriSource-400' : 'text-slate-300 hover:text-VeriSource-600'}`}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                              <p className={`text-sm line-clamp-2 leading-relaxed ${theme.textSub}`}>
                                {t(`tools.${item.descKey}`)}
                              </p>
                              
                              {/* Subtle hover effect */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-VeriSource-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
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
                      className="px-6 py-2 bg-VeriSource-500 text-white rounded-lg hover:bg-VeriSource-600 transition-colors"
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