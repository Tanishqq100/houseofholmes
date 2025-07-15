import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <img src="/Outlook-tac4py3p.jpeg" alt={t('header.title') + ' Logo'} />
      <h1>{t('header.title')}</h1>
      {/* Optionally add subtitle: <p>{t('header.subtitle')}</p> */}
    </header>
  );
};

export default Header; 