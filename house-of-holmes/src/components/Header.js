import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ onToggleDarkMode, isDarkMode }) => {
  const { t } = useTranslation();

  return (
    <header>
      <div className="header-content">
        <img src="/images/owl-logo.JPG" alt="House of Holmes Logo" />
        <div className="header-text">
          <h1>{t('header.title')}</h1>
          <p>{t('header.subtitle')}</p>
        </div>
      </div>
      <div className="dark-mode-toggle" onClick={onToggleDarkMode}>
        <label htmlFor="dark-mode">
          {t('darkMode')}
        </label>
        <input
          type="checkbox"
          id="dark-mode"
          checked={isDarkMode}
          onChange={onToggleDarkMode}
        />
      </div>
    </header>
  );
};

export default Header;
