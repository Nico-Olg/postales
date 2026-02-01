import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// Fixed Navbar with scroll effect
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Concepto', href: '#concepto' },
    { label: 'Inversión', href: '#inversion' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Ubicación', href: '#ubicacion' },
    { label: 'Roadmap', href: '#roadmap' },
  ];

  const handleLinkClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <a href="#" className="navbar__logo">Postales del Viñedo</a>

          {/* Desktop links */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="navbar__link">
                {link.label}
              </a>
            ))}
          </div>

          <a href="#contacto" className="navbar__cta">Reservá tu lote</a>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="mobile-menu__link" onClick={handleLinkClick}>
                {link.label}
              </a>
            ))}
            <a href="#contacto" className="mobile-menu__cta" onClick={handleLinkClick}>
              Reservá tu lote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Floating WhatsApp button
const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/5493512440572?text=Hola%2C%20quiero%20más%20información%20sobre%20Postales%20del%20Viñedo"
      className={`whatsapp-fab ${visible ? 'whatsapp-fab--visible' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.742 3.052 9.376L1.056 31.2l6.06-1.94A15.91 15.91 0 0016.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.66-1.216-4.748-1.968-7.804-6.78-8.04-7.094-.226-.314-1.9-2.53-1.9-4.826s1.2-3.426 1.628-3.894c.39-.426.914-.604 1.206-.604.146 0 .278.008.396.014.428.018.642.042.924.716.354.842 1.216 2.96 1.322 3.176.108.216.216.508.068.802-.138.3-.258.486-.476.746-.216.26-.426.46-.642.74-.198.244-.42.504-.176.932.244.426 1.084 1.788 2.328 2.896 1.598 1.424 2.942 1.866 3.36 2.074.428.216.676.18.924-.108.254-.294 1.084-1.26 1.374-1.694.284-.428.574-.36.966-.216.396.144 2.506 1.182 2.934 1.398.428.216.714.324.82.504.108.182.108 1.044-.282 2.144z"/>
      </svg>
    </a>
  );
};

// Hero Section with parallax
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="hero">
      <motion.div className="hero-bg" style={{ y }}>
        {/* Placeholder for hero image - replace with actual photo */}
        <div className="hero-image" />
      </motion.div>
      
      <motion.div 
        className="hero-content"
        style={{ opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.span 
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          La Paz, Entre Ríos
        </motion.span>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Tu viñedo privado<br />
          te está esperando
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Lotes exclusivos · Vino propio · Club del vino · Vida sustentable
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <a href="#concepto" className="btn-primary">
            Descubrir el proyecto
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span>Deslizar para explorar</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
};

// Animated counter component
const Counter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Concept section with three pillars
const Concept = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      icon: "🍇",
      title: "Tu Viñedo Personal",
      description: "800m² con producción de vino exclusiva. Mantenimiento profesional incluido. Tu propia bodega en casa."
    },
   {
  icon: "📈",
  title: "Valor Productivo del Lote",
  description: "Tu viñedo genera producción propia con potencial de comercialización futura mediante el Club del Vino y canales exclusivos."
},

    {
      icon: "🌱",
      title: "Sustentabilidad Total",
      description: "100% energía solar, economía circular, reserva de bosque nativo. Inversión con propósito."
    }
  ];

  return (
    <section id="concepto" className="concept-section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="eyebrow">El concepto</span>
          <h2 className="section-title">Más que un lote,<br />un estilo de vida</h2>
          <p className="section-subtitle">
            El primer complejo vitivinícola residencial de Entre Ríos combina 
            inversión inteligente con calidad de vida excepcional
          </p>
        </motion.div>

        <div className="pillars-grid">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="pillar-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="pillar-icon">{pillar.icon}</div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-description">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Visual gallery with parallax
const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const images = [
    { title: "Viñedos al atardecer", placeholder: "vineyard-sunset" },
    { title: "Bodega boutique", placeholder: "winery" },
    { title: "Cabañas de diseño", placeholder: "cabin" },
    { title: "Glamping exclusivo", placeholder: "glamping" }
  ];

  return (
    <section className="gallery-section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title centered"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Imaginate viviendo acá
        </motion.h2>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className={`gallery-image ${image.placeholder}`} />
              <div className="gallery-overlay">
                <span className="gallery-title">{image.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Investment breakdown
const Investment = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    "Viñedo privado plantado y mantenido",
    "Participación en bodega común",
    "Producción de vino personalizado",
    "Renta del complejo turístico",
    "Acceso a todas las amenities",
    "ROI proyectado atractivo"
  ];

  return (
    <section id="inversion" className="investment-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="investment-card"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="investment-header">
            <div>
              <span className="investment-label">Inversión desde</span>
              <h3 className="investment-price">USD 40.000</h3>
              <span className="investment-sublabel">Lote de 800m² · Financiación disponible</span>
            </div>
          </div>

          <div className="investment-features">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          <div className="investment-options">
            <div className="payment-option">
              <strong>Anticipo</strong>
              <span>30% + cuotas sin interés</span>
            </div>
            <div className="payment-option">
              <strong>Preventa</strong>
              <span>15% descuento pioneros</span>
            </div>
            <div className="payment-option">
              <strong>Financiación</strong>
              <span>Planes personalizados</span>
            </div>
          </div>

          <a href="#contacto" className="btn-primary full-width">
            Solicitar información
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Scarcity and social proof
const Scarcity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="scarcity-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="scarcity-banner"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="scarcity-content">
            <div className="scarcity-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Disponibilidad limitada</span>
            </div>
            <h3 className="scarcity-title">
              Solo <Counter end={15} /> lotes disponibles
            </h3>
            <p className="scarcity-subtitle">
              <Counter end={5} /> ya reservados en preventa · Asegurá tu lugar
            </p>
          </div>
        </motion.div>

        <motion.div
          className="testimonials"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "Comparado con proyectos similares en Mendoza, esta es una oportunidad única 
              con una relación precio-valor excepcional."
            </p>
            <div className="testimonial-author">
              <strong>Martín R.</strong>
              <span>Inversor, Buenos Aires</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "El concepto de combinar inversión inmobiliaria con producción de vino 
              y turismo es brillante. Estamos muy entusiasmados."
            </p>
            <div className="testimonial-author">
              <strong>Carolina P.</strong>
              <span>Familia, Rosario</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Amenities showcase
const Amenities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const amenities = [
    { icon: "🏡", title: "Cabañas Boutique", desc: "Alojamiento de diseño para huéspedes" },
    { icon: "⛺", title: "Glamping de Lujo", desc: "Experiencia única entre viñedos" },
    { icon: "🍷", title: "Bodega Propia", desc: "Producción y cata de vinos" },
    { icon: "🌳", title: "Bosque Nativo", desc: "Reserva natural protegida" },
    { icon: "☀️", title: "Energía Solar", desc: "100% sustentable" },
    { icon: "♻️", title: "Economía Circular", desc: "Gestión responsable de recursos" }
  ];

  return (
    <section id="amenities" className="amenities-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-header centered"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">El complejo</span>
          <h2 className="section-title">Todo lo que necesitás,<br />en un solo lugar</h2>
        </motion.div>

        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              className="amenity-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span className="amenity-icon">{amenity.icon}</span>
              <h4 className="amenity-title">{amenity.title}</h4>
              <p className="amenity-desc">{amenity.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Location section
const Location = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="ubicacion" className="location-section">
      <div className="container">
        <div className="location-content">
          <motion.div
            ref={ref}
            className="location-info"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow">Ubicación</span>
            <h2 className="section-title">Cerca de todo,<br />lejos del ruido</h2>
            
            <div className="location-details">
              <div className="location-item">
                <svg className="location-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
                <div>
                  <strong>La Paz, Entre Ríos</strong>
                  <span>El corazón de la ruta del vino entrerriano</span>
                </div>
              </div>

              <div className="location-item">
                <svg className="location-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="currentColor"/>
                </svg>
                <div>
                  <strong>2 hs desde Paraná</strong>
                  <span>Acceso directo por ruta asfaltada</span>
                </div>
              </div>

              <div className="location-item">
                <svg className="location-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"/>
                </svg>
                <div>
                  <strong>400km  desde Buenos Aires</strong>
                  <span>Escapada de fin de semana perfecta</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="location-map"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Google Maps Embed - Interactivo con zoom, navegación, etc. */}
            <div className="map-container">
              <iframe
                title="Ubicación Postales del Viñedo - La Paz, Entre Ríos"
                src="https://maps.google.com/maps?q=-30.750293528738894, -59.61139471952832&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Timeline/Roadmap
const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const phases = [
    { quarter: "2025", title: "Preventa Pioneros", desc: "Descuentos exclusivos para primeros compradores", done: true },
    { quarter: "2026 Q1", title: "Inicio de Obras", desc: "Infraestructura y servicios básicos" },
    { quarter: "2026 Q3", title: "Viñedos Plantados", desc: "Plantación de variedades seleccionadas" },
    { quarter: "2027 Q1", title: "Amenities Operativos", desc: "Cabañas y glamping en funcionamiento" },
    { quarter: "2028", title: "Primera Cosecha", desc: "Producción inicial de vino propio" }
  ];

  return (
    <section id="roadmap" className="timeline-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="section-header centered"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="eyebrow">Roadmap</span>
          <h2 className="section-title">Un proyecto con futuro claro</h2>
          <p className="section-subtitle">
            Plan de desarrollo transparente con hitos verificables
          </p>
        </motion.div>

        <div className="timeline">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${phase.done ? 'timeline-item--done' : ''}`}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="timeline-marker" />
              <div className="timeline-content">
                <span className="timeline-quarter">
                  {phase.quarter}
                  {phase.done && <span className="timeline-done-badge">Completado</span>}
                </span>
                <h4 className="timeline-title">{phase.title}</h4>
                <p className="timeline-desc">{phase.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact form
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // REEMPLAZÁ ESTA URL con la que copiaste de Google Apps Script
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0mh3IIV5yrWldjaIZLuKQjxN0MwBA1QghGeDGI3MR8KXqhhw12OknYrrbBCvYIkES1Q/exec';
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Importante para evitar errores de CORS
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    // Con no-cors no podemos leer la respuesta, pero asumimos que funcionó
    setIsSubmitted(true);
    
    // Opcional: enviar evento a Google Analytics si lo tenés configurado
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'Contact Form',
        event_label: 'Landing Page Lead'
      });
    }
    
    // Reset después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
    
  } catch (error) {
    console.error('Error al enviar formulario:', error);
    // Igual marcamos como enviado porque con no-cors no sabemos si falló
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-header">
            <h2 className="section-title">¿Listo para tu postal<br />del viñedo?</h2>
            <p className="contact-subtitle">
              Dejanos tus datos y te contactamos en menos de 24 horas 
              para enviarte información completa y coordinar una visita.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+54 9 11 1234-5678"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="juan@ejemplo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje (opcional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Contanos qué te interesa saber..."
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary full-width"
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitting ? 'Enviando...' : isSubmitted ? '¡Mensaje enviado!' : 'Quiero más información'}
              {!isSubmitting && !isSubmitted && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            <div className="trust-badges">
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2l2.5 6.5L19 9.5l-4.5 4.5 1 7-5.5-3-5.5 3 1-7L1 9.5l6.5-1L10 2z" fill="currentColor"/>
                </svg>
                <span>Tus datos están protegidos</span>
              </div>
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm9 7V8l3 2-3 2z" fill="currentColor"/>
                </svg>
                <span>Respuesta en 24hs</span>
              </div>
              <div className="trust-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" fill="currentColor"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fill="currentColor"/>
                </svg>
                <span>Sin compromiso</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">Postales del Viñedo</h3>
            <p className="footer-tagline">Tu viñedo privado en Entre Ríos</p>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contacto</h4>
            <a href="mailto:info@postalesdelvinedo.com" className="footer-link">
              info@postalesdelvinedo.com
            </a>
            <a href="https://wa.me/5493512440572" className="footer-link">
              +54 9 351 2440572
            </a>
            <a href="https://wa.me/5493512440572" className="footer-link" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>

          <div className="footer-social">
            <h4 className="footer-title">Seguinos</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Postales del Viñedo. Todos los derechos reservados.
          </p>
          <p className="footer-credit">
            La Paz, Entre Ríos, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const PostalesDelVinedoLanding = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

 useEffect(() => {
  const handleScroll = () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = totalScroll > 0 ? (window.pageYOffset / totalScroll) : 0;
    const progressPct = currentProgress * 100;
    setScrollProgress(progressPct);

    // NUEVO: mover el punto de mezcla (blend)
    // Arriba: 15% (casi todo verde)
    // Abajo: 85% (casi todo vino)
    const blend = 15 + (currentProgress * 70); // 15% -> 85%
    document.body.style.setProperty('--blend-point', `${blend}%`);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // inicial
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <div className="app">
      {/* Navbar */}
      <Navbar />

      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Main content */}
      <Hero />
      <Concept />
      <Gallery />
      <Investment />
      <Scarcity />
      <Amenities />
      <Location />
      <Timeline />
      <Contact />
      <Footer />

      {/* WhatsApp FAB */}
      <WhatsAppButton />
    </div>
  );
};

export default PostalesDelVinedoLanding;
