
import React, { useState } from 'react';
import type { NavLink } from '../types';
import { MenuIcon, CloseIcon } from './icons';

type Language = 'en' | 'vn';

interface LanguageSwitcherProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, onLanguageChange }) => (
  <div className="flex items-center border border-gray-300 rounded-full p-0.5">
    <button
      onClick={() => onLanguageChange('en')}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${language === 'en' ? 'bg-brand-green text-white' : 'text-brand-text-secondary hover:bg-gray-100'}`}
    >
      EN
    </button>
    <button
      onClick={() => onLanguageChange('vn')}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${language === 'vn' ? 'bg-brand-green text-white' : 'text-brand-text-secondary hover:bg-gray-100'}`}
    >
      VN
    </button>
  </div>
);


interface HeaderProps {
    isAdmin: boolean;
    language: Language;
    onLanguageChange: (lang: Language) => void;
    navLinks: NavLink[];
    onAdminLoginClick: () => void;
    adminLoginText: string;
    onSave: () => void;
    onCancel: () => void;
    saveText: string;
    cancelText: string;
}

const Header: React.FC<HeaderProps> = ({ 
    isAdmin, language, onLanguageChange, navLinks,
    onAdminLoginClick, adminLoginText, onSave, onCancel, saveText, cancelText 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu on navigation
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const headerElement = document.querySelector('header');
        const headerOffset = headerElement ? headerElement.offsetHeight : 80; // Dynamically get header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };
    
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl font-serif font-bold text-brand-text">Tri Nguyen</a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-brand-text-secondary hover:text-brand-text transition-colors duration-300">{link.text}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
            {isAdmin ? (
                <div className="flex items-center space-x-2">
                    <button onClick={onSave} className="bg-blue-600 text-white font-medium py-2 px-5 rounded-full hover:bg-blue-700 transition-colors duration-300">
                        {saveText}
                    </button>
                    <button onClick={onCancel} className="bg-gray-500 text-white font-medium py-2 px-5 rounded-full hover:bg-gray-600 transition-colors duration-300">
                        {cancelText}
                    </button>
                </div>
            ) : (
                <button onClick={onAdminLoginClick} className="bg-brand-green text-white font-medium py-2 px-5 rounded-full hover:opacity-90 transition-opacity duration-300">
                  {adminLoginText}
                </button>
            )}
            <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(true)} className="text-brand-text focus:outline-none" aria-label="Open menu">
                <MenuIcon className="w-7 h-7" />
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-brand-background z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
             <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl font-serif font-bold text-brand-text">Tri Nguyen</a>
             <button onClick={() => setIsMenuOpen(false)} className="text-brand-text" aria-label="Close menu">
                <CloseIcon className="w-7 h-7" />
             </button>
          </div>
          <nav className="flex flex-col items-center justify-center h-full -mt-16 space-y-8 text-center">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-3xl font-serif text-brand-text-secondary hover:text-brand-text transition-colors duration-300">{link.text}</a>
            ))}
             <div className="absolute bottom-24 flex flex-col items-center space-y-6">
                {isAdmin ? (
                    <div className="flex flex-col items-center space-y-4">
                        <button onClick={() => { onSave(); setIsMenuOpen(false); }} className="bg-blue-600 text-white font-medium py-3 px-8 text-lg rounded-full">
                            {saveText}
                        </button>
                        <button onClick={() => { onCancel(); setIsMenuOpen(false); }} className="bg-gray-500 text-white font-medium py-3 px-8 text-lg rounded-full">
                            {cancelText}
                        </button>
                    </div>
                ) : (
                    <button onClick={() => { onAdminLoginClick(); setIsMenuOpen(false); }} className="bg-brand-green text-white font-medium py-3 px-8 text-lg rounded-full">
                      {adminLoginText}
                    </button>
                )}
                <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />
             </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
