import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useTranslation();

  return (
    <button
      className="lang-toggle"
      onClick={toggleLanguage}
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={language === 'es' ? 'lang-toggle__active' : ''}>ES</span>
      <span className="lang-toggle__separator">|</span>
      <span className={language === 'en' ? 'lang-toggle__active' : ''}>EN</span>
    </button>
  );
};

export default LanguageToggle;
