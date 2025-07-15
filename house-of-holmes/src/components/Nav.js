import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { href: '/', label: 'nav.home', isRoute: true },
  { href: '/services', label: 'nav.services', isRoute: true },
  { href: '/pricing', label: 'nav.pricing', isRoute: true },
  { href: '#about', label: 'about.title' },
  { href: '#consultation', label: 'consultation.title' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'it', name: 'Italiano' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();
  const { t, i18n } = useTranslation();

  const handleToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Trap focus inside nav when open (mobile)
  useEffect(() => {
    if (!menuOpen) return;
    const focusable = navRef.current.querySelectorAll('a,button');
    if (focusable.length) focusable[0].focus();
  }, [menuOpen]);

  return (
    <nav className="main-nav" aria-label="Main Navigation" ref={navRef}>
      <button
        className={`nav-toggle${menuOpen ? ' open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={handleToggle}
      >
        <span className="hamburger"></span>
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.href}>
            {link.isRoute ? (
              <Link to={link.href} onClick={handleLinkClick} tabIndex={menuOpen || window.innerWidth > 700 ? 0 : -1}>
                {t(link.label)}
              </Link>
            ) : (
              <a href={link.href} onClick={handleLinkClick} tabIndex={menuOpen || window.innerWidth > 700 ? 0 : -1}>
                {t(link.label)}
              </a>
            )}
          </li>
        ))}
        <li>
          <select
            aria-label={t('language')}
            value={i18n.language}
            onChange={handleLanguageChange}
            style={{
              marginLeft: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1.5px solid #d4af37',
              background: '#181818',
              color: '#d4af37',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Nav; 