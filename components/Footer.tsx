import React from 'react';
import type { NavLink } from '../types';

interface FooterProps {
    navLinks: NavLink[];
}

const Footer: React.FC<FooterProps> = ({ navLinks }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer className="bg-brand-background border-t border-gray-200">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl font-serif font-bold text-brand-text">Tri Nguyen</a>
            <p className="text-sm text-brand-text-secondary mt-1">&copy; {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          <div className="flex items-center space-x-6">
            {navLinks.map(link => (
                 <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-brand-text-secondary hover:text-brand-text">{link.text}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;