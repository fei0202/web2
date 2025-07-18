import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types/language';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/20">
      <button
        onClick={() => setLanguage('zh')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'zh'
            ? 'bg-white text-primary shadow-md'
            : 'text-white/90 hover:text-white hover:bg-white/10'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-white text-primary shadow-md'
            : 'text-white/90 hover:text-white hover:bg-white/10'
        }`}
      >
        English
      </button>
    </div>
  );
}
