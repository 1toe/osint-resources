// Preload utility for performance optimization
export const preloadComponent = (componentImport) => {
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        componentImport().catch(() => {
          // Silently fail if preload fails
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        componentImport().catch(() => {
          // Silently fail if preload fails
        });
      }, 100);
    }
  }
};

// Preload strategies
export const preloadStrategies = {
  onHover: (componentImport) => {
    const preload = () => preloadComponent(componentImport);
    return {
      onMouseEnter: preload,
      onFocus: preload
    };
  },
  
  onIdle: (componentImport) => {
    preloadComponent(componentImport);
  },
  
  afterDelay: (componentImport, delay = 2000) => {
    setTimeout(() => preloadComponent(componentImport), delay);
  }
};