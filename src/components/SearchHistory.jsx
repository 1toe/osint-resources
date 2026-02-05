import React from 'react';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Search from 'lucide-react/dist/esm/icons/search';

export const SearchHistory = ({ history, onClearHistory, onSearchFromHistory, isDarkMode }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-500">No hay búsquedas recientes</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Búsquedas Recientes
        </h3>
        <button
          onClick={onClearHistory}
          className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Limpiar
        </button>
      </div>
      
      <div className="space-y-2">
        {history.slice(0, 10).map((item, index) => (
          <button
            key={index}
            onClick={() => onSearchFromHistory(item.query)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all hover:scale-[1.02] group ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50' 
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4 text-osint-500 group-hover:scale-110 transition-transform" />
            <div className="flex-1 text-left">
              <div className="font-medium truncate">{item.query}</div>
              <div className="text-xs opacity-60">
                {new Date(item.timestamp).toLocaleDateString()} • {item.results} resultados
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};