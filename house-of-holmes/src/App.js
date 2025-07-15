import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import Header from './components/Header';
import Nav from './components/Nav';
// import Hero from './components/Hero';
import Services from './components/Services';
import Reviews from './components/Reviews';
import About from './components/About';
import ConsultationForm from './components/ConsultationForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import ServicesPage from './components/ServicesPage';
import './App.css';

function MainSite() {
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

  return (
    <div>
      <Banner />
      <Header />
      <Nav />
      {/* <Hero /> */}
      <Services />
      <Reviews />
      <About />
      <ConsultationForm />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
