import React from 'react';
import { Download, FileText, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const ExportTools = ({ favorites, searchHistory, isDarkMode }) => {
  const { t } = useLanguage();
  
  const exportFavorites = () => {
    const data = {
      type: 'VeriSource-hub-favorites',
      version: '1.0',
      exportDate: new Date().toISOString(),
      favorites: favorites,
      count: favorites.length
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VeriSource-hub-favorites-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareConfig = () => {
    const config = {
      theme: isDarkMode ? 'dark' : 'light',
      favoriteCount: favorites.length,
      exportDate: new Date().toISOString()
    };
    
    if (navigator.share) {
      navigator.share({
        title: 'Mi configuración de VeriSource',
        text: `Tengo ${favorites.length} herramientas favoritas en VeriSource`,
        url: window.location.href
      });
    } else {
      // Fallback: copiar al clipboard
      navigator.clipboard.writeText(
        `🕵️ Mi setup de VeriSource:\n- ${favorites.length} herramientas favoritas\n- Tema: ${isDarkMode ? 'Oscuro' : 'Claro'}\n\n${window.location.href}`
      );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Exportar Datos</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={exportFavorites}
          className="flex items-center gap-3 p-4 rounded-xl border border-VeriSource-500/20 hover:bg-VeriSource-500/10 transition-all group"
        >
          <Download className="w-5 h-5 text-VeriSource-500 group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="font-medium">Exportar Favoritos</div>
            <div className="text-sm opacity-70">{favorites.length} herramientas</div>
          </div>
        </button>
        
        <button
          onClick={shareConfig}
          className="flex items-center gap-3 p-4 rounded-xl border border-VeriSource-500/20 hover:bg-VeriSource-500/10 transition-all group"
        >
          <Share2 className="w-5 h-5 text-VeriSource-500 group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="font-medium">Compartir Setup</div>
            <div className="text-sm opacity-70">Configuración actual</div>
          </div>
        </button>
      </div>
    </div>
  );
};