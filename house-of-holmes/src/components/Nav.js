import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const Nav = ({ currentLanguage, onLanguageChange }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/services', label: t('nav.services') },
    { path: '/pricing', label: t('nav.pricing') },
    { path: '/mission-values', label: t('nav.missionValues') },
    { path: '/#contact', label: t('nav.contact') }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ru', name: 'Русский' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'zh', name: '中文' }
  ];

  return (
    <nav className="main-nav">
      <ul className="nav-links">
        {navLinks.map((link, index) => (
          <li key={index}>
            {link.path.includes('#') ? (
              <a 
                href={link.path}
                className={location.pathname === '/' && location.hash === '#contact' ? 'active' : ''}
              >
                {link.label}
              </a>
            ) : (
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
        <li>
          <select 
            value={currentLanguage} 
            onChange={(e) => onLanguageChange(e.target.value)}
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
