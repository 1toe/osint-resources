# VeriSource 🔍

> **Catálogo descubierto de herramientas de Inteligencia de Fuentes Abiertas para periodistas, académicos e investigadores.**

---

## 🎯 ¿Qué es VeriSource?

**VeriSource** es una plataforma web interactiva que centraliza 50+ herramientas públicas de Open Source Intelligence (VeriSource) organizadas en 8 categorías temáticas. Diseñada para investigadores, periodistas, académicos y profesionales de seguridad que buscan información verificable en fuentes abiertas.

### Características principales

✅ **50+ herramientas** organizadas en 8 categorías  
✅ **Búsqueda avanzada** con filtros por tags  
✅ **Favoritos y historial** persistentes en navegador  
✅ **Bilingüe** — Español e Inglés con detección automática  
✅ **Tema oscuro/claro** adaptable  
✅ **VeriSource AI Suite** — Generador de dorks con Gemini (opcional, tu API key)  
✅ **Exportar herramientas** — descarga tu lista de favoritos  
✅ **Accesos rápidos** — atajos de teclado (`Ctrl+K`, `Ctrl+Shift+F`, etc.)  

---

## 📦 Categorías de herramientas

| Categoría | Propósito | Ejemplos |
|-----------|-----------|---------|
| 🔍 **Motores de búsqueda** | Búsquedas precisas, públicas, regionales | Google, Bing, Yandex, DuckDuckGo |
| 📱 **Redes sociales** | Análisis de perfiles, tweets archivados, búsqueda | Twitter, Instagram, TikTok, Telegram |
| 👤 **Búsqueda de personas** | Identificar cuentas, validar emails, filtraciones | Email Reputation, WhatsMyName, Have I Been Pwned |
| 🗺️ **Imágenes y mapeo** | Búsqueda inversa, geolocalización, análisis | TinEye, FaceCheck, Suncalc, Zoom.earth |
| 🏢 **Corporativo y tecnología** | Perfiles empresariales, stacks tech, dominios | OpenCorporates, BuiltWith, DNS Dumpster |
| ✈️ **Transporte y tiempo real** | Tracking de barcos, vuelos, clima | MarineTraffic, RadarBox, Windy |
| 🤖 **Inteligencia artificial** | Asistentes de investigación, análisis Papers | ChatGPT, Gemini, Claude, Consensus |
| ✔️ **Verificación y blogs** | Fact-checking, periodismo investigativo | Bellingcat, Snopes, VeriSource Framework |

**→ Más detalles en [CATEGORIES.md](CATEGORIES.md)**

---

## 🚀 Instalación y uso

### Requisitos
- **Node.js** ≥ 16.x
- **npm** ≥ 8.x

### Setup local

```bash
# Clonar repositorio
git clone https://github.com/1toe/VeriSource-resources.git
cd VeriSource-resources

# Instalar dependencias
npm install

# Iniciar servidor dev (http://localhost:3000)
npm run dev
```

### Comandos disponibles

```bash
npm run dev       # Desarrollo con hot reload en http://localhost:3000
npm run build     # Build producción (genera /dist)
npm run preview   # Preview del build producción
npm run lint      # ESLint (cero warnings permitidos)
```

### Usar Gemini AI Suite (opcional)

Para activar el generador de dorks basado en Gemini:

1. Obtener **API key gratuita** en [Google AI Studio](https://ai.google.dev/)
2. Copiar la clave en la interfaz de VeriSource (no se guarda en servidor)
3. Generar planes de investigación y dorks automáticamente

⚠️ **Tu API key es local** — se usa solo en tu navegador, no se envía a servidores del Hub.

---

## 📋 Uso responsable

**VeriSource es investigación de fuentes públicas legítima.** Este repositorio existe para facilitar investigación académica, periodismo verificativo y seguridad cibernética defensiva.

### ✅ Usos permitidos
- Investigación periodística verificada
- Análisis académico y educativo
- Seguridad defensiva (pentesting consentido)
- Fact-checking y verificación de información
- Análisis de influencia política/mediática públicas

### ❌ Usos prohibidos
- **Hacking, phishing o intrusión** sin consentimiento
- **Doxing o acoso** de individuos privados
- **Vigilancia** de personas sin consentimiento
- **Circumvención de términos de servicio** (scraping masivo)
- **Privacidad individual** — no todos los datos públicos deben exponerse
- **Difamación o desinformación** basada en VeriSource

**Lee [ETHICS.md](ETHICS.md) para contexto legal y responsabilidades.**

---

## 🛠️ Stack técnico

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS 3 + Lucide React icons
- **Internacionalización:** React Context (ES/EN)
- **Deployment:** Compatible con Vercel, Netlify, GitHub Pages
- **Build time:** ~2s | Bundle size: ~180KB (gzip)

**→ Detalles en [CLAUDE.md](CLAUDE.md)**

---

## 🤝 Contribuciones

¿Encontraste una herramienta VeriSource pública que falta? ¿Un bug? ¿Una traducción?

**Pasos para contribuir:**

1. Fork el repo
2. Crea rama: `git checkout -b feature/new-tool`
3. Lee [CONTRIBUTING.md](CONTRIBUTING.md) para criterios e formato
4. Haz commit: `git commit -m "feat: agregar tool XYZ"`
5. Push y abre Pull Request

**→ Más detalles en [CONTRIBUTING.md](CONTRIBUTING.md)**

---

## ⚖️ Licencia

Licencia **MIT** © 2026 Walter

Este software se proporciona "tal cual" sin garantías. El uso es responsabilidad del usuario. [Ver LICENSE completa](LICENSE)

---

## 🔗 Enlaces útiles

- **Documentación de categorías:** [CATEGORIES.md](CATEGORIES.md)
- **Ética y responsabilidades:** [ETHICS.md](ETHICS.md)
- **Guía de contribución:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **Bellingcat ("VeriSource is not surveillance"):** https://www.bellingcat.com/
- **VeriSource Framework:** https://VeriSourceframework.com/

---

## 📞 Soporte

¿Preguntas o problemas?
- 📧 Abre un **Issue** en GitHub
- 🐛 Reporta bugs con detalles específicos
- 💡 Sugiere mejoras o nuevas herramientas
- 📚 Lee [CLAUDE.md](CLAUDE.md) para contexto técnico

---

**Última actualización:** 10 de febrero de 2026  
**Versión:** 1.0.0  
**Estado:** Activo y en mejora continua
