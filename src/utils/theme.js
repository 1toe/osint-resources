// Theme utilities - centralized theme management
export const createTheme = (isDarkMode) => ({
  bg: isDarkMode ? 'bg-slate-950' : 'bg-slate-50',
  sidebar: isDarkMode ? 'bg-slate-900/95 border-slate-800/50 backdrop-blur-sm' : 'bg-white/95 border-slate-200 backdrop-blur-sm',
  card: isDarkMode ? 'bg-slate-900/60 border-slate-800/50 hover:bg-slate-800/60' : 'bg-white/90 border-slate-200 hover:bg-slate-50/90 shadow-sm',
  textMain: isDarkMode ? 'text-slate-100' : 'text-slate-900',
  textSub: isDarkMode ? 'text-slate-400' : 'text-slate-600',
  input: isDarkMode ? 'bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-500',
  header: isDarkMode ? 'bg-slate-900/95 border-slate-800/50 backdrop-blur-md' : 'bg-white/95 border-slate-200 backdrop-blur-md',
  aiBox: isDarkMode ? 'bg-slate-950/80 border-slate-800/50' : 'bg-slate-50/80 border-slate-200',
  accent: 'from-osint-600 to-osint-500'
});

// Button variants
export const buttonVariants = {
  primary: (isDarkMode, isActive = false) => `
    ${isActive 
      ? 'bg-gradient-to-r from-osint-600 to-osint-500 text-white shadow-lg shadow-osint-500/25 scale-[1.02]' 
      : isDarkMode 
        ? 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100' 
        : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
    }
    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-2 group
  `,
  
  icon: (isDarkMode) => `
    p-2.5 rounded-xl transition-all hover:scale-105 
    ${isDarkMode ? 'bg-slate-800/70 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}
  `,
  
  themed: (isDarkMode, color = 'osint', isActive = false) => `
    ${isActive 
      ? `bg-gradient-to-r from-${color}-600 to-${color}-500 text-white shadow-lg shadow-${color}-500/25 scale-[1.02]` 
      : isDarkMode 
        ? `text-slate-400 hover:bg-${color}-600/10 hover:text-${color}-300 border border-transparent hover:border-${color}-500/20` 
        : `text-slate-600 hover:bg-${color}-50 hover:text-${color}-700 border border-transparent hover:border-${color}-200`
    }
    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-2 group
  `
};

// Storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently fail if localStorage is not available
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail if localStorage is not available
    }
  }
};

// Constants
export const STORAGE_KEYS = {
  THEME: 'osint-hub-theme',
  FAVORITES: 'osint-hub-favorites',
  SEARCH_HISTORY: 'osint-hub-search-history',
  LANGUAGE: 'osint-hub-language'
};

// Performance utilities
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};