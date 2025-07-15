import React from 'react';
import { useTranslation } from 'react-i18next';

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" style={{marginRight: '0.5em', verticalAlign: 'middle'}}>
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.9S388.6 1.7 353.3 0C317.7-1.7 130.3-1.7 94.7 0 59.4 1.7 28 9.9 1.7 36.2S1.7 123.4 0 158.7C-1.7 194.3-1.7 381.7 0 417.3c1.7 35.3 9.9 66.7 36.2 92.9s57.6 34.5 92.9 36.2c35.6 1.7 223 1.7 258.6 0 35.3-1.7 66.7-9.9 92.9-36.2s34.5-57.6 36.2-92.9c1.7-35.6 1.7-223 0-258.6zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5C121.1 24.6 190.9 27.2 224 27.2s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.7 102.9-9 132.3z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 320 512" fill="currentColor" aria-hidden="true" style={{marginRight: '0.5em', verticalAlign: 'middle'}}>
    <path d="M279.14 288l14.22-92.66h-88.91V127.91c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.5 0 225.36 0c-73.22 0-121.09 44.38-121.09 124.72v70.62H22.89V288h81.38v224h100.2V288z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" style={{marginRight: '0.5em', verticalAlign: 'middle'}}>
    <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340.7C24.09 107.3 0 83.2 0 53.6A53.6 53.6 0 0 1 53.6 0a53.6 53.6 0 0 1 53.6 53.6c0 29.6-24.09 53.7-53.6 53.7zM447.8 448h-92.4V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.9-43.7 31.3-2.3 5.6-2.8 13.4-2.8 21.2V448h-92.4s1.2-242.1 0-267.1h92.4v37.9c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.7 39.8 106.7 125.4V448z"/>
  </svg>
);

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="footer-social">
        <a href="https://www.instagram.com/hofh.houseofholmes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <InstagramIcon /> Instagram
        </a>
        <a href="https://facebook.com/houseofholmes" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FacebookIcon /> Facebook
        </a>
        <a href="https://linkedin.com/company/houseofholmes" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon /> LinkedIn
        </a>
      </div>
      <span className="footer-rights">{t('footer.rights')}</span>
    </footer>
  );
};

export default Footer; 