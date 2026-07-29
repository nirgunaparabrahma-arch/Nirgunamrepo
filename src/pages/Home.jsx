import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';
import '../index.css';

export default function Home() {
  const observerRef = useRef(null);

  // States for dynamic data
  const [pageData, setPageData] = useState({
    heroTitle: 'Nirgunam',
    heroSubtitle: 'A Sacred Path to Inner Freedom',
    heroDescription: 'A sacred gathering for genuine seekers walking towards the state of Jeevanmukti — The deepest joy of real Inner Freedom.',
    heroImage: null,
    heroButton1Text: 'EXPLORE THE PATH',
    heroButton2Text: 'GET IN TOUCH',

    pathwayCards: [
      {
        eyebrow: 'About', title: 'Manish Nirgunam',
        description: 'A soulful spiritual being, deeply connected to the truth of existence and sharing wisdom born from lived experience.',
        linkText: 'Explore About', linkUrl: '/about', iconName: 'self_improvement', fallbackImg: '/Tiruvannamalai.webp'
      },
      {
        eyebrow: 'The Practice', title: 'What is Bhairavam?',
        description: 'The pulse of the universe. The silence within. Beyond description — Bhairavam is already alive inside you right now, waiting to be seen.',
        linkText: 'Explore Bhairavam', linkUrl: '/bhairavam', iconName: 'temple_hindu', fallbackImg: '/bhairavam.jpeg'
      },
      {
        eyebrow: 'Sri Mata Group', title: 'Our 3 Wings',
        description: 'Yatra, Dharmic Products and Spiritual Activities — three pillars serving the Sanatana Dharma with devotion and purpose across India.',
        linkText: 'Explore Our Wings', linkUrl: '/yatra', iconName: 'spa', fallbackImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeYe2qJVkBNRTu32aojzlEVc7p5fx3nNgQDr_RAY0JRepGyeXTuViUvp3SC4VCJ27dpUvqhzVkOr10-xZi3fAJK-m45v9P789XqNlwZH5iIkhAQWJSUTuDm-8zDWc_Q3kiqWFnn3lxetiPVYh6WaN5yukQA2ZTdM2sRNA4KNzQhvto6nGwwdU5Eded21jdvzpi13bxJb166ycQQNkdrwR3oQfoh1XwSr4M_0a24IjNjVvf3AgBY4qf4wwoZCanPHt-fygj5capt7iK'
      }
    ],

    founderEyebrow: 'The Founder',
    founderTitle: 'Manish Nirgunam',
    founderParagraphs: [
      'Manish Nirgunam lives in Bengaluru. He does not claim the title of a guru, teacher or master. He sees himself as a reflecting spiritual being — connected to everything, completely free and deeply humble.',
      'His journey began with a profound miracle at the Shiva temple in Tiruvannamalai. Since then, through sacred encounters, deep meditation and the grace of extraordinary Gurus, he has walked the path toward total inner freedom.'
    ],
    founderQuote: 'Realisation is the End of Sorrows.',
    founderQuoteAuthor: '— Manish Nirgunam',
    founderButtonText: 'Read His Full Story',
    founderImage: null,

    bhairavamEyebrow: 'The Practice',
    bhairavamTitle: 'What is Bhairavam?',
    bhairavamParagraphs: [
      'Bhairavam is not a belief, philosophy or ritual. It is the raw presence behind all existence — beyond identity, thought and the illusion of separation.',
      'Shifting into Bhairavam dissolves fear, ends suffering and reveals a natural, unshakable peace and oneness where all sense of separation disappears.'
    ],
    bhairavamFooter: ['Timeless', 'Speechless', 'Directionless'],
    bhairavamFeatureCards: [
      { title: 'Pulse of the Universe', description: 'Every creation and manifestation in this universe is a wave of Bhairavam.', iconName: 'radio_button_checked' },
      { title: 'The Silence Within', description: 'Bhairavam is where truly you are. The moment your mind completely shuts down.', iconName: 'flare' },
      { title: 'Beyond Description', description: 'No label, concept or definition can survive contact with it.', iconName: 'blur_on' },
      { title: 'State of Oneness', description: 'When the mind has no movement — only pure completeness remains.', iconName: 'all_inclusive' }
    ]
  });

  const [events, setEvents] = useState([
    {
      _id: 'fallback-1',
      title: 'Bhairava Jayanti ',
      date: '1st Dec 2026',
      location: 'Bangalore',
      image: null,
      fallbackImg: '/shivlinglandscape.png'
    },
    {
      _id: 'fallback-2',
      title: 'Maha Shivratri',
      date: '06th Mar 2027',
      location: 'Bangalore',
      image: null,
      fallbackImg: 'mistylingam.png'
    },
    {
      _id: 'fallback-3',
      title: 'Guru Poornima',
      date: '18th Jul 2027',
      location: 'Bangalore',
      image: null,
      fallbackImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg4MEcPfpbWVp3qnpKFjdSudl0_rfJGyP1npAPuySqJ7UESDBTHVqb0_lOX_C5xisbCvraPaR_JttIkdoKGos8m2fXDGfP2H-mnu5Go9i8u58yMUEJtXhjgMneWmYDC1G2B3tsK-vstYSamuDxv1Lz2zZnAscZqIm538E4DC_lS0o4o0WNhLkqA2gerfLhIkniX9Vz4H-qWubDL7aUT7usr50i4iU-Eh6dvc7tG7RtnYOpthZDWXIeXAEbZK7Z8ycRFyLFWsg3EJOQ'
    },
    {
      _id: 'fallback-4',
      title: 'Retreats',
      date: 'Stay Tuned',
      location: 'Tiruvannamalai',
      image: null,
      fallbackImg: '/retreatgreen.png'
    }
  ]);

  const [products, setProducts] = useState([
    {
      _id: 'fallback-p1',
      title: 'Moksha Lakshmi Photo Frame',
      description: "Sacred form of Sri Maha Lakshmi sketched from a sadhaka's vision. Confirmed to bring blessings to homes.",
      fallbackImg: '/lakshmi_frame.png'
    },
    {
      _id: 'fallback-p2',
      title: 'Jagadadi Lingam',
      description: 'Completely handmade Shiva Lingam designed based on Puranas. Rudrabhishekam performed before dispatch.',
      fallbackImg: '/jagadadi.jpeg'
    },
    {
      _id: 'fallback-p3',
      title: 'Bhairava Kavacham',
      description: 'A powerful shield of protection consecrated with sacred mantras.',
      fallbackImg: '/bhairavakavachamhome.png'
    }
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      _id: 'fallback-t1',
      name: "Kamala",
      role: "Secundrabad",
      quote: "As soon as I saw Moksha Lakshmi, I cannot explain my happiness. Devi is literally conveying a message of trust. After Devi stepped into my home, within a week unexpectedly I got a gift of gold worth 2.5 lakhs. I am so happy. I didn't see such form anywhere and I think nobody has seen such a form of Devi.",
      fallbackImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJca9I5iJmYt3TxuoNlo6KFcEdM6DFP3vgNTVpy6S4i3LMbGx-gBr1noPxmwf07cP6NUe4StZYDQbi0kTzTsfL6kQhCbikDlvxbJyWZAdXSxe4svu3ovgWmpHLMw4vqgFU0irkv17Bl0wX5RwdjjcLyGZNKNSmB3HUthu-zj9hGgNWJ1TJF3wzPwVj7bMNvoeJN6k183Oy3hgaz0gC2uTOmoDcq9rOJnvJ42RIa0yi3NnYL4XKmjeU6_JL58pzwMCi5ZLzEo6EjI4h"
    },
      {
      _id: 'fallback-t1',
      name: " Rama Devi",
      role: "Guntur",
      quote: "I saw the Moksha Lakshmi photo in my friend's home and ordered it. After Amma's photo arrived, our home has been filled with happiness. My son got married, we achieved financial freedom and we are experiencing positive energies. There are a lot of divine energies hidden in Amma's photo.",
      fallbackImg: "ramadevi.jpeg"
    },
    {
      _id: 'fallback-t1',
      name: " Hemanth Raj",
      role: "Bengaluru",
      quote:"I cancelled my trip with this organization, but at the last moment I changed my mind and joined. Their preparation was excellent and I gained so much clarity. I truly want to give a big applause to their planning and presentation. I enjoyed my dream pilgrimage to Kedarnath and wish them all the very best.",
      fallbackImg: "/hemanthraj.jpeg"
    },
    {
      _id: 'fallback-t1',
      name: " Siddaramanna",
      role: "Tumkur",
      quote:"I got to know about this Yatra through my friend. It was my first experience travelling to North India for the Do Dham Yatra and the package was excellent. The team was extremely caring at every stage of the journey. Although the Kedarnath trek was a bit difficult for me, they motivated and supported us mentally, helping us complete the trek with joy.",
      fallbackImg: "sidda.jpeg"
    }

    


  ]);

  useEffect(() => {
    setTestimonials(prev => [...prev, ...prev, ...prev]);

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed/50 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-screen w-full flex flex-col justify-center items-start px-[5%] pt-32 pb-[420px] sm:pb-[350px] lg:pb-[320px] overflow-hidden">
        <HeroBackground
          src="/heroimg.webp"
          mobileSrc="/mbhome.png"
          alt="Hero Background"
          overlayClassName="bg-gradient-to-b from-black/30 to-black/70"
        />
        <div className="relative z-10 max-w-4xl scroll-reveal mt-10 md:mt-0">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.95] text-white mb-2 md:mb-4">{pageData.heroTitle}</h1>
          <h2 className="font-display text-2xl md:text-4xl italic font-light text-white/90 mb-6 md:mb-8">{pageData.heroSubtitle}</h2>
          <p className="font-body text-white/70 max-w-xl text-base lg:text-lg font-light leading-relaxed">
            {pageData.heroDescription}
          </p>
        </div>

        <div className="absolute bottom-12 left-[5%] right-[5%] flex flex-col w-[90%] z-10">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-stretch sm:items-center mb-8 sm:mb-10 scroll-reveal">
            <Link to="/bhairavam" className="bg-[#FF9933] text-white px-10 py-4 lg:py-5 rounded-button text-[12px] uppercase font-bold tracking-widest flex items-center justify-center gap-3 hover:bg-[#e68a00] transition-all group w-full sm:w-auto">
              {pageData.heroButton1Text}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <Link to="/contact" className="bg-primary/20 border border-white/20 text-white px-10 py-4 lg:py-5 rounded-button text-[12px] uppercase font-bold tracking-widest backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all w-full sm:w-auto flex justify-center items-center">
              {pageData.heroButton2Text}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/20 pt-6 sm:pt-8 text-white gap-6 md:gap-0 scroll-reveal">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-12 lg:gap-24 w-full md:w-auto">
              <div><span className="block font-display text-3xl lg:text-4xl mb-1">3</span><span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50">Wings of Service</span></div>
              <div><span className="block font-display text-3xl lg:text-4xl mb-1">2020</span><span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50">Since</span></div>
              <div className="col-span-2 sm:col-span-1"><span className="block font-display text-3xl lg:text-4xl mb-1">∞</span><span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50">Open to All Seekers</span></div>
            </div>
            <div className="hidden md:flex flex-col items-center gap-2 opacity-50">
              <span className="text-[9px] uppercase tracking-widest">Scroll to Explore</span>
              <span className="material-symbols-outlined text-sm animate-bounce">expand_more</span>
            </div>
          </div>
        </div>
      </header>

      {/* Three Pathways */}
      <section className="py-section-gap px-[5%] bg-surface">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-10">
          {pageData.pathwayCards && pageData.pathwayCards.map((card, idx) => (
            <div key={idx} className="scroll-reveal" style={{ transitionDelay: `${idx * 200}ms` }}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-8 museum-shadow group">
                <img alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src={card.fallbackImg} />
                <div className="absolute top-8 left-8"><span className="material-symbols-outlined text-white text-3xl">{card.iconName}</span></div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#c26100] mb-2 block">{card.eyebrow}</span>
              <h3 className="font-display text-3xl mb-3 text-primary-container font-semibold">{card.title}</h3>
              <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6 font-light">{card.description}</p>
              <Link className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-secondary group" to={card.linkUrl || '#'}>
                {card.linkText} <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-section-padding px-[5%] bg-surface-container-lowest">
        <div className="flex flex-col lg:flex-row items-center gap-24 max-w-[1400px] mx-auto w-full">
          <div className="w-full lg:w-1/2 scroll-reveal">
            <div className="relative rounded-image overflow-hidden aspect-[4/5] minimal-shadow max-h-[700px] mx-auto">
              <img alt={pageData.founderTitle} className="w-full h-full object-cover" src={"/yellowuse.png"} />
            </div>
          </div>
          <div className="w-full lg:w-1/2 scroll-reveal" style={{ transitionDelay: '200ms' }}>
            <span className="text-[12px] uppercase tracking-[0.3em] text-secondary font-bold mb-8 block">{pageData.founderEyebrow}</span>
            <h2 className="font-display text-5xl lg:text-[56px] leading-[1.1] mb-10 text-primary-container">{pageData.founderTitle}</h2>
            <div className="space-y-6 text-on-surface-variant font-body text-lg leading-relaxed font-light">
              {pageData.founderParagraphs && pageData.founderParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-12 border-l-2 border-secondary pl-10 py-2 italic font-display text-2xl text-primary-container leading-snug relative">
              "{pageData.founderQuote}"
              <footer className="mt-6 not-italic text-[11px] uppercase tracking-widest font-bold text-secondary">{pageData.founderQuoteAuthor}</footer>
            </blockquote>
            {/* <button className="mt-12 bg-primary-container text-surface px-10 py-5 rounded-button text-[12px] uppercase font-bold tracking-widest hover:bg-primary transition-all">
              {pageData.founderButtonText}
            </button> */}
          </div>
        </div>
      </section>

      {/* What is Bhairavam */}
      <section className="py-section-padding px-[5%] stone-texture text-surface relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10 w-full">
          <div className="flex flex-col lg:flex-row gap-24 items-center lg:items-start">
            <div className="w-full lg:w-5/12 scroll-reveal">
              <span className="text-[12px] uppercase tracking-[0.3em] text-secondary-container font-bold mb-8 block">{pageData.bhairavamEyebrow}</span>
              <h2 className="font-display text-5xl lg:text-[56px] leading-[1.1] mb-12">{pageData.bhairavamTitle}</h2>
              <div className="space-y-8 font-body text-xl font-light opacity-80">
                {pageData.bhairavamParagraphs && pageData.bhairavamParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              {pageData.bhairavamFooter && (
                <div className="mt-16 flex items-center gap-8 font-display text-2xl italic text-secondary-container">
                  {pageData.bhairavamFooter.map((word, idx) => (
                    <React.Fragment key={idx}>
                      <span>{word}</span>
                      {idx < pageData.bhairavamFooter.length - 1 && <span className="opacity-50 text-sm">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-8 scroll-reveal" style={{ transitionDelay: '300ms' }}>
              {pageData.bhairavamFeatureCards && pageData.bhairavamFeatureCards.map((card, idx) => (
                <div key={idx} className="bg-surface/5 border border-surface/10 p-10 rounded-card backdrop-blur-sm group hover:bg-surface/10 transition-all">
                  <span className="material-symbols-outlined text-secondary-container mb-8 text-4xl">{card.iconName}</span>
                  <h4 className="font-display text-3xl mb-4">{card.title}</h4>
                  <p className="font-body text-sm opacity-60 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bhairavam Products Section (Dynamic) */}
      <section className="py-section-padding px-[5%] bg-surface-container-low">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 scroll-reveal">
            <div><span className="text-[12px] uppercase tracking-[0.3em] text-secondary font-bold mb-6 block">Dharmic Products</span></div>
            <Link className="mt-8 md:mt-0 text-[11px] uppercase font-bold tracking-widest text-on-surface-variant flex items-center gap-2 hover:text-secondary transition-all" to="/products">
              View All Products <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {products.map((prod, idx) => (
              <a href={prod.link || "#"} key={prod._id} className="group relative rounded-image overflow-hidden aspect-[4/5] sm:aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] scroll-reveal minimal-shadow block" style={{ transitionDelay: `${idx * 200}ms` }}>
                <img alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" src={prod.fallbackImg} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/45 to-transparent p-6 sm:p-8 lg:p-10 flex flex-col justify-end">
                  <h3 className="font-display text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-4xl text-surface mb-2 leading-tight">{prod.title}</h3>
                  <p className="text-xs sm:text-sm text-surface/90 font-light leading-relaxed transition-all duration-500 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                    {prod.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Gatherings (Dynamic) */}
      <section className="py-section-padding px-[5%] bg-surface">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 scroll-reveal">
            <div>
              <span className="text-[12px] uppercase tracking-[0.3em] text-secondary font-bold mb-6 block">Future Events</span>
              <h2 className="font-display text-5xl lg:text-[56px] leading-[1.1] text-primary-container">Our Sacred Gatherings</h2>
            </div>
            {/* <Link className="mt-8 md:mt-0 text-[11px] uppercase font-bold tracking-widest text-on-surface-variant flex items-center gap-2 hover:text-secondary transition-all" to="/retreats">
              View All Retreats <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </Link> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {events.map((evt, idx) => (
              <div key={evt._id} className="group scroll-reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="rounded-image overflow-hidden mb-8 aspect-[16/10] minimal-shadow">
                  <img alt={evt.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src={evt.fallbackImg} />
                </div>
                <h4 className="font-display text-2xl mb-2 text-primary-container">{evt.title}</h4>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-on-surface-variant/70 mb-8">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">calendar_today</span> {evt.date}</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">location_on</span> {evt.location}</span>
                </div>
                {/* Join Journey opens the shared Join Nirgunam form */}
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('open-join-nirgunam'))}
                  className="text-[10px] uppercase font-bold tracking-widest text-secondary flex items-center gap-3 group-hover:gap-5 transition-all"
                >
                  Join Journey <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Dynamic) */}
      <section className="py-section-padding px-[5%] bg-surface-container-low">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-[5%]">
            <div>
              <span className="text-[12px] uppercase tracking-[0.3em] text-secondary font-bold mb-6 block">Testimonials</span>
              <h2 className="font-display text-5xl lg:text-[56px] leading-[1.1] text-primary-container">Voices of Seekers</h2>
            </div>
          </div>
          <div className="overflow-hidden w-full pb-10">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-10 px-[5%]">
              {testimonials.map((t, i) => (
                <div key={i} className="flex-shrink-0 w-[85vw] md:w-[600px] bg-surface p-10 rounded-card minimal-shadow flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-surface-container-low">
                    <img alt={t.name} className="w-full h-full object-cover" src={t.fallbackImg} />
                  </div>
                  <div className="flex-grow">
                    <span className="material-symbols-outlined text-4xl text-secondary/30 mb-4 inline-block">format_quote</span>
                    <p className="font-display text-2xl italic text-primary-container mb-6 leading-snug">"{t.quote}"</p>
                    <div>
                      <span className="text-[12px] uppercase font-bold tracking-widest text-secondary">{t.name}</span>
                      <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
