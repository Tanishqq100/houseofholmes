import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ServicesPage.css';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'CUSTOM CLOTHING',
    subtitle: 'Manufacturing and Design Consultations',
    summary: 'Our Manufacturing and Design Consultations are tailored to empower businesses seeking to optimize their production processes and enhance product design.',
    details: `Our Manufacturing and Design Consultations are tailored to empower businesses seeking to optimize their production processes and enhance product design. Whether you're a startup navigating the complexities of manufacturing or an established company aiming to revitalize your product line, our consultations provide expert guidance at every stage.`,
    image: '/images/CUSTOM CLOTHING.jpg',
  },
  {
    title: 'ILLUSTRATOR/PHOTOSHOP-BASED',
    subtitle: 'Artwork and Technical Design Services',
    summary: 'From design to production, House of Holmes helps you create your vision from the simplest sketches.',
    details: `From design to production, House of Holmes helps you create your vision from the simplest sketches. Whether you're creating mood boards, garment flats, or tech packs, our design services ensure that your product development process is streamlined, detailed, and visually compelling.`,
    image: '/images/ILLUSTRATOR:PHOTOSHOP-BASED.jpg',
  },
  {
    title: 'DEVELOPMENT AND PRODUCTION',
    subtitle: 'Fabric and Trims Sourcing',
    summary: 'Embark on a seamless journey from concept to completion with our fabric and trims sourcing services tailored for development and production.',
    details: `Embark on a seamless journey from concept to completion with our Fabric and Trims Sourcing services tailored for development and production. We understand that the right materials are the foundation of exceptional products. Whether you're launching a new line or seeking to optimize your supply chain, our dedicated sourcing team is committed to identifying, procuring, and delivering high-quality fabrics, trims, and materials to meet your unique specifications.`,
    image: '/images/DEVELOPMENT AND PRODUCTION.jpg',
  },
  {
    title: 'REVERSE ENGINEERING SERVICES',
    subtitle: 'Draping, Digitizing, Patternmaking, and Grading',
    summary: 'Our skilled team is dedicated to providing you with a seamless and collaborative experience, ensuring your designs come to life with impeccable accuracy and craftsmanship.',
    details: `Embark on a transformative journey from concept to production with our comprehensive range of services in draping, digitizing, patternmaking, grading, and reverse engineering. At House of Holmes, we understand that precision and innovation are the cornerstones of exceptional garment design and production. Our skilled team is dedicated to providing you with a seamless and collaborative experience, ensuring your designs come to life with impeccable accuracy and craftsmanship.`,
    image: '/images/REVERSE ENGINEERING SERVICES.jpg',
  },
  {
    title: 'CLOTHING PROTOTYPE SERVICES',
    subtitle: 'Sample Making',
    summary: 'Our Sample Making service is the crucial bridge between your design concepts and tangible prototypes.',
    details: `Our Sample Making service is the crucial bridge between your design concepts and tangible prototypes. At House of Holmes, we specialize in transforming your creative visions into physical samples that capture the essence of your designs. This service is the first step in bringing your ideas to life, allowing you to visualize and assess the feasibility of your concepts.`,
    image: '/images/CLOTHING PROTOTYPE SERVICES.jpg',
  },
  {
    title: 'TECH PACKS AND',
    subtitle: 'Technical Design Services',
    summary: 'Our Tech Packs and Technical Design Services offer a comprehensive solution to transform your design concepts into production-ready specifications.',
    details: `Our Tech Packs and Technical Design Services offer a comprehensive solution to transform your design concepts into production-ready specifications. At House of Holmes, we understand the importance of precision in the garment industry, and our services are designed to provide detailed documentation that streamlines the manufacturing process around the globe.`,
    image: '/images/TECH PACKS AND.jpg',
  },
  {
    title: 'PATTERN',
    subtitle: 'Marker Making Services',
    summary: 'Our Marker Making service is the precision-driven solution that optimizes fabric utilization in the garment production process.',
    details: `Our Marker Making service is the precision-driven solution that optimizes fabric utilization in the garment production process. At House of Holmes, we specialize in creating efficient markers, the templates that guide the cutting of fabric pieces, ultimately maximizing material usage and minimizing waste.`,
    image: '/images/PATTERN.jpg',
  },
  {
    title: 'CUT AND SEW',
    subtitle: 'Manufacturing Services',
    summary: 'At House of Holmes, we specialize in the meticulous process of creating garments from raw fabric, providing end-to-end manufacturing solutions for your fashion or textile products.',
    details: `Our Cut and Sew Manufacturing service is the cornerstone of bringing your garment designs to life. At House of Holmes, we specialize in the meticulous process of creating garments from raw fabric, providing end-to-end manufacturing solutions for your fashion or textile products.`,
    image: '/images/CUT AND SEW.jpg',
  },
  {
    title: 'QUALITY CONTROL STANDARDS SERVICES',
    subtitle: 'Quality Control Standards',
    summary: 'Our Quality Control Standards service is dedicated to upholding the highest levels of quality in every aspect of your production process.',
    details: `Our Quality Control Standards service is dedicated to upholding the highest levels of quality in every aspect of your production process. At House of Holmes, we implement rigorous standards and protocols to ensure that your products meet or exceed industry benchmarks, delivering excellence to your customers.`,
    image: '/images/QUALITY CONTROL STANDARDS SERVICE.jpg',
  },
  {
    title: 'STEAMING, PRESSING, PACKAGING, AND PACKING',
    subtitle: 'Finishing Services',
    summary: 'Our comprehensive suite of services goes beyond the creation of garments; it extends to the meticulous finishing touches that elevate your products to the highest standards.',
    details: `Our comprehensive suite of services goes beyond the creation of garments; it extends to the meticulous finishing touches that elevate your products to the highest standards. At House of Holmes, we offer Finishing, Steaming, Pressing, Packaging, and Packing services to ensure that every item leaving our facility is not only impeccably crafted but also presented with care and attention to detail.`,
    image: '/images/STEAMING, PRESSING, PACKAGING, PACKING.jpg',
  },
  {
    title: 'STRATEGIC PARTNER SERVICES',
    subtitle: 'Screen Printing, Embroidery, Sublimation, Washing/Dyeing',
    summary: 'To provide you with a comprehensive array of services, we proudly partner with esteemed manufacturers specializing in screen printing, embroidery, sublimation, and washing/dyeing.',
    details: `At House of Holmes, we believe in the power of collaboration and expanding possibilities. To provide you with a comprehensive array of services, we proudly partner with esteemed manufacturers specializing in screen printing, embroidery, sublimation, and washing/dyeing. These strategic alliances allow us to offer an extensive range of customization options and finishes, ensuring your products are not only expertly crafted but also tailored to your unique specifications.`,
    image: '/images/STRATEGIC PARTNER SERVICES.jpg',
  },
];

const ServicesPage = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  
  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };
  
  return (
    <div className="services-page">
      <Link to="/" className="back-home-btn">&larr; Back to Home</Link>
      <h1 className="services-title">{t('nav.services')}</h1>
      {services.map((service, idx) => (
        <div className={`service-section-row ${idx % 2 === 0 ? 'row-normal' : 'row-reverse'}`} key={idx}>
          {service.image && (
            <div className="service-image-col">
              <img className="service-image" src={service.image} alt={service.subtitle} />
            </div>
          )}
          <div className="service-content-col">
            <div className="service-header">
              <span className="service-title">{service.title}</span>
              <span className="service-subtitle">{service.subtitle}</span>
            </div>
            <div className="service-summary">{service.summary}</div>
            <button className="learn-more-btn" onClick={() => handleToggle(idx)}>
              {openIndex === idx ? 'Hide Details' : 'Learn More'}
            </button>
            {openIndex === idx && (
              <div className="service-details">
                <strong>{service.subtitle}</strong>
                <div>{service.details}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesPage; 