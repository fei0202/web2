import { useLanguage } from '../hooks/useLanguage';
import { content } from '../data/content';

export function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero-background text-white py-20 min-h-screen flex items-center relative">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-shadow-lg">
            {t('title', content.hero)}
          </h1>
          <div className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-shadow">
            <p>{t('subtitle', content.hero)}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('about')}
              className="bg-accent hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {t('learnMore', content.hero)}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {t('joinUs', content.hero)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
