import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../hooks/useLanguage";
import { content } from "../data/content";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-primary">FRC</span>{" "}
              <span className="text-secondary">10390</span>
            </div>
            <div className="ml-2 text-sm text-gray-600 hidden sm:block">
              {t("zh") === "zh" ? "TW All-Female Team" : "TW All-Female Team"}
            </div>
          </div>

          {/* Language Toggle */}
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              {t("home", content.navigation)}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              {t("about", content.navigation)}
            </button>
            <button
              onClick={() => scrollToSection("robots")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              {t("robots", content.navigation)}
            </button>
            <button
              onClick={() => scrollToSection("awards")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              {t("awards", content.navigation)}
            </button>
            <button
              onClick={() => scrollToSection("sponsors")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              {t("sponsors", content.navigation)}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              {t("contact", content.navigation)}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <div className="mb-4">
                <LanguageToggle />
              </div>
              <button
                onClick={() => scrollToSection("home")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors text-left"
              >
                {t("home", content.navigation)}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors text-left"
              >
                {t("about", content.navigation)}
              </button>
              <button
                onClick={() => scrollToSection("robots")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors text-left"
              >
                {t("robots", content.navigation)}
              </button>
              <button
                onClick={() => scrollToSection("awards")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors text-left"
              >
                {t("awards", content.navigation)}
              </button>
              <button
                onClick={() => scrollToSection("sponsors")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors text-left"
              >
                {t("sponsors", content.navigation)}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors text-left"
              >
                {t("contact", content.navigation)}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
