import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Banner from './components/Banner';
import Header from './components/Header';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Services from './components/Services';
import Reviews from './components/Reviews';
import About from './components/About';
import ConsultationForm from './components/ConsultationForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import ServicesPage from './components/ServicesPage';
import MissionValues from './components/MissionValues';
import OdooTest from './components/OdooTest';
import Calendar from './components/Calendar';
import SocialFeed from './components/SocialFeed';
import OutlookIntegration from './components/OutlookIntegration';
import './App.css';

function MainSite() {
  const { i18n } = useTranslation();
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Language state
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };
  
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const revealSection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new window.IntersectionObserver(revealSection, {
      threshold: 0.15
    });
    sections.forEach(section => {
      section.classList.add('section-hidden');
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Set initial language
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [i18n, currentLanguage]);

  return (
    <div>
      <Banner />
      <Header onToggleDarkMode={handleDarkModeToggle} isDarkMode={darkMode} />
      <Nav currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
      <Hero />
      <Services />
      <OdooTest />
      <Calendar />
      <SocialFeed />
      <OutlookIntegration />
      <Reviews />
      <About />
      <MissionValues />
      <ConsultationForm />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();
  
  // Language state for other routes
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleDarkModeToggle = () => {
    const currentDarkMode = localStorage.getItem('darkMode') === 'true';
    const newDarkMode = !currentDarkMode;
    localStorage.setItem('darkMode', newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // Set initial language
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [i18n, currentLanguage]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/pricing" element={
          <>
            <Banner />
            <Header onToggleDarkMode={handleDarkModeToggle} isDarkMode={isDarkMode} />
            <Nav currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
            <Pricing />
            <Footer />
          </>
        } />
        <Route path="/services" element={
          <>
            <Banner />
            <Header onToggleDarkMode={handleDarkModeToggle} isDarkMode={isDarkMode} />
            <Nav currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
            <ServicesPage />
            <Footer />
          </>
        } />
        <Route path="/mission-values" element={
          <>
            <Banner />
            <Header onToggleDarkMode={handleDarkModeToggle} isDarkMode={isDarkMode} />
            <Nav currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
            <MissionValues />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;