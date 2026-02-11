// OSINT Tools Data - Lazy loaded to reduce initial bundle size
import {
  Search,
  MessageSquare,
  User,
  Globe,
  Shield,
  Map,
  Image as ImageIcon,
  Database,
  Camera,
  Activity,
  Briefcase,
  Lock,
  Cpu,
  FileText,
  CheckCircle
} from 'lucide-react';

export const OSINT_DATA = [
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
        url: "https://www.osintcombine.com/free-osint-tools/instagram-explorer", 
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
        url: "https://www.osintcombine.com/free-osint-tools/tiktok-quick-search", 
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
        name: "OSINT Framework", 
        url: "https://osintframework.com/", 
        descKey: "osintframework",
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