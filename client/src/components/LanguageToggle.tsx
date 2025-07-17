import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types/language';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
      <button
        onClick={() => setLanguage('zh')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'zh'
            ? 'bg-white text-primary shadow-md'
            : 'text-white hover:text-white/80'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-white text-primary shadow-md'
            : 'text-white hover:text-white/80'
        }`}
      >
        English
      </button>
    </div>
  );
}
