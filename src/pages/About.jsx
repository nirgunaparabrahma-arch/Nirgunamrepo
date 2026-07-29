import React, { useRef, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';

export default function About() {
  const observerRef = useRef(null);

  const [pageData, setPageData] = useState({
    heroTitle: 'Meet\nManish Nirgunam',
    heroSubtitle: 'A reflecting spiritual being connected to everything, completely free, deeply humble.',
    heroDescription: 'Manish Nirgunam walks the path of self-discovery with humility, sharing only what has been realized through direct experience. He invites every seeker to turn inward and discover the truth within.',
    heroImage: null,

    essenceEyebrow: 'The Essence',
    essenceTitle: 'Rooted In Truth.\nAlive In Presence.',
    essenceParagraphs: [
      'From childhood, Manish was inwardly drawn to the silence within. Life led him through diverse experiences, sacred encounters and profound inner awakenings.',
      'His only goal is to help true seekers experience the formless divine reality beyond names and shapes — to help them become their own light.'
    ],
    essenceQuote: 'I am here as a giver, openly welcoming anyone who seeks the ultimate truth.',
    essenceQuoteAuthor: '— Manish Nirgunam',
    essenceImage: null,

    bannerQuote: 'The highest purpose of life\nis to know who truly you are.',
    bannerAuthor: '— Manish Nirgunam',
  });

  const [testimonials, setTestimonials] = useState([
    {
      _id: 'fallback-t3',
      name: "Nithya",
      role: "Rishikesh",
      quote: "Sitting in his presence changed my life. I found a peace I didn't know was possible.",
      fallbackImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJca9I5iJmYt3TxuoNlo6KFcEdM6DFP3vgNTVpy6S4i3LMbGx-gBr1noPxmwf07cP6NUe4StZYDQbi0kTzTsfL6kQhCbikDlvxbJyWZAdXSxe4svu3ovgWmpHLMw4vqgFU0irkv17Bl0wX5RwdjjcLyGZNKNSmB3HUthu-zj9hGgNWJ1TJF3wzPwVj7bMNvoeJN6k183Oy3hgaz0gC2uTOmoDcq9rOJnvJ42RIa0yi3NnYL4XKmjeU6_JL58pzwMCi5ZLzEo6EjI4h"
    },
    {
      _id: 'fallback-t4',
      name: "Arjun",
      role: "Bengaluru",
      quote: "His words are simple, but they go deep. He doesn't teach — he awakens.",
      fallbackImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhgsXXTN42OR1qh8C5V3YlbPbTkelPj5hzG-65Yw0tgmzpyItBQOU5c5dIRzlXP9mJjn9bIBZ7UiEe1kyHTfMDcpT4LNtOGXvDCNOf_KTRVXcvlCYQ6kffQhLasz43UiCTRnXRMKzh5YhICobeQ_fvMvK8MQteZoPttlBs2DXigjnKiKyK0X4a_ZrWQi00P_nK8AgFJpaEus2o9FgM2jiwDIupV4mX1uHPFjfN9JGwy-0BR-Vi8asPtWadx07CzTicSr_lnAmGX8Fi"
    }
  ]);

  useEffect(() => {
    setTestimonials(prev => [...prev, ...prev, ...prev, ...prev]);

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

      <header className="relative min-h-screen w-full flex flex-col justify-center items-start px-[5%] pt-[90px] overflow-hidden bg-[#e6dfd1]">
        <HeroBackground
          src="/cvrabout.png"
          mobileSrc="/mbabout.png"
          alt="Hero"
          overlayClassName="bg-gradient-to-b from-black/30 to-black/70"
        />

        <div className="relative z-10 max-w-2xl scroll-reveal mt-16 md:mt-0">
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-white/80 font-bold mb-4 md:mb-6 block">About The Founder</span>
          <h1 className="font-display text-6xl md:text-7xl lg:text-[88px] leading-[0.95] text-white mb-6" style={{ whiteSpace: 'pre-line' }}>{pageData.heroTitle}</h1>
          <h2 className="font-display text-2xl md:text-3xl font-light text-white/90 mb-6 leading-snug">
            {pageData.heroSubtitle}
          </h2>
          <p className="font-body text-white/80 max-w-lg text-base lg:text-lg font-light leading-relaxed mb-10">
            {pageData.heroDescription}
          </p>
        </div>
      </header>

      <section className="py-24 lg:py-32 px-[5%] bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute -inset-10 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M54.627 0l.83.83-54.627 54.627-.83-.83z\\' fill=\\'%238e4e05\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')" }}></div>
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2 scroll-reveal relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] museum-shadow border-8 border-white p-2">
              <img alt="Manish Essence" className="w-full h-full object-contain rounded-xl" src={"/treerootsfit.png"} />
            </div>
            <span className="material-symbols-outlined absolute -bottom-10 -left-10 text-[120px] text-secondary opacity-10 rotate-45">filter_vintage</span>
          </div>
          <div className="w-full lg:w-1/2 scroll-reveal" style={{ transitionDelay: '200ms' }}>
            <span className="text-[12px] uppercase tracking-[0.3em] text-secondary font-bold mb-6 block">{pageData.essenceEyebrow}</span>
            <h2 className="font-display text-5xl lg:text-[56px] leading-[1.1] mb-8 text-primary-container" style={{ whiteSpace: 'pre-line' }}>{pageData.essenceTitle}</h2>
            <div className="space-y-6 text-primary-container/80 font-body text-lg leading-relaxed font-light mb-12">
              {pageData.essenceParagraphs && pageData.essenceParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="pl-0 lg:pl-12 lg:border-l border-secondary/30 relative mt-12">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4 inline-block">format_quote</span>
              <p className="font-display text-3xl italic text-primary-container leading-snug mb-6">
                "{pageData.essenceQuote}"
              </p>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary">{pageData.essenceQuoteAuthor}</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Manish Shares */}
      <section className="py-24 lg:py-32 px-[5%] bg-[#241D19] text-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="col-span-1 lg:col-span-5 scroll-reveal pr-8">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B08955] font-bold">THE ESSENCE OF NIRGUNAM</span>
            </div>
            <h2 className="font-display text-5xl lg:text-[56px] leading-[1.1] mb-10 text-[#E5D5C1]">What Manish Shares</h2>
            <div className="space-y-4 font-display text-3xl lg:text-4xl text-white/80 font-light mb-12">
              <p>Not a belief.</p>
              <p>Not a philosophy.</p>
              <p>Not a system.</p>
            </div>
            <p className="text-[#B08955] text-2xl font-display italic leading-snug">Simply the truth that remains when<br />separation ends.</p>
          </div>
          <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 scroll-reveal" style={{ transitionDelay: '200ms' }}>
            {[
              { icon: 'trip_origin', title: 'Seeing The Formless', desc: 'He sees everything and everyone as Nirguna Parabrahman — the ultimate formless reality beyond names and shapes.' },
              { icon: 'eco', title: 'No Rules Or Dependency', desc: 'People can experience true peace and detachment without complicated rituals or relying blindly on a teacher.' },
              { icon: 'tips_and_updates', title: 'Find Your Own Light', desc: 'His invitation to everyone is to become their own light — standing strong and unshaken on their own feet.' },
              { icon: 'all_inclusive', title: 'Everyone is Equal', desc: 'He recognizes himself in all beings and all things, claiming no standing above any other. Boundless in nature, he finds complete fulfillment in simply being nothing.' }
            ].map((card, i) => (
              <div key={i} className="bg-[#2C241E] rounded-3xl p-10 hover:bg-[#342b24] transition-all text-center flex flex-col items-center justify-center min-h-[280px]">
                <span className="material-symbols-outlined text-[#E5D5C1] text-3xl mb-6 opacity-80">{card.icon}</span>
                <h4 className="font-display text-2xl mb-4 text-[#E5D5C1]">{card.title}</h4>
                <p className="text-[13px] text-white/60 leading-relaxed font-light">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Words */}
      <section className="py-24 lg:py-32 px-[5%] bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="scroll-reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c26100] font-bold">LIVING WISDOM</span>
            </div>
            <h2 className="font-display text-5xl lg:text-[64px] leading-[1.1] mb-10 text-primary-container">
              Simple Words.<br />
              <span className="whitespace-nowrap text-[26px] sm:text-[42px] lg:text-[44px] xl:text-[56px]">
                Profound Transformation.
              </span>
            </h2>
            <p className="font-body text-on-surface-variant text-xl font-light leading-relaxed mb-12 max-w-lg opacity-80">
              His teachings are not just spoken — they are lived. Through satsangs, retreats and one-on-one guidance, he helps thousands awaken to clarity, compassion and purpose.
            </p>

          </div>
          <div className="grid grid-cols-2 gap-4 scroll-reveal" style={{ transitionDelay: '200ms' }}>
            <div className="col-span-1 rounded-2xl overflow-hidden aspect-[3/4]">
              <img src="/about44.png" alt="Transformation" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-1 flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src="/about33.png" alt="Wisdom" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src="/avatar.png" alt="Journey" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Image Cards */}
      {/* <section className="py-12 px-[5%] bg-[#FDFBF7]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-12 scroll-reveal">
            <div className="h-px bg-[#B08955]/30 w-16"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B08955] font-bold">WISDOM IN PRACTICE</span>
            <div className="h-px bg-[#B08955]/30 w-16"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 scroll-reveal">
            {[
              { icon: 'self_improvement', title: 'Bhairavam', desc: 'The path beyond description.', img: '/heroimg.webp' },
              { icon: 'temple_hindu', title: 'Yatra', desc: 'Sacred journeys that transform.', img: '/about_img.webp' },
              { icon: 'spa', title: 'Meditation', desc: 'The gateway to inner silence.', img: '/img1.webp' },
              { icon: 'groups', title: 'Sacred Gatherings', desc: 'Satsangs that awake the heart.', img: '/heroimg.webp' },
              { icon: 'volunteer_activism', title: 'Seva', desc: 'Serving life with love and devotion.', img: '/aboutimg.webp' },
              { icon: 'energy_savings_leaf', title: 'Conscious Living', desc: 'Wisdom in everyday living.', img: '/img1.webp' }
            ].map((item, i) => (
              <div key={i} className="relative rounded-[24px] overflow-hidden aspect-[4/5] group minimal-shadow">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col justify-between p-6">
                  <span className="material-symbols-outlined text-white/80 text-xl">{item.icon}</span>
                  <div>
                    <span className="text-white text-lg font-display mb-1 block">{item.title}</span>
                    <span className="text-white/70 text-[9px] uppercase tracking-widest leading-relaxed block">{item.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

  {/*     <section className="py-24 px-[5%] bg-surface-container-lowest border-t border-secondary/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-16 scroll-reveal">
            <div className="h-px bg-secondary/30 w-16"></div>
            <span className="text-[12px] uppercase tracking-[0.3em] text-secondary font-bold">Words From Seekers</span>
            <div className="h-px bg-secondary/30 w-16"></div>
          </div>
          <div className="overflow-hidden w-full pb-4 pt-4">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-[5%]">
              {testimonials.map((t, idx) => (
                <div key={idx} className="flex-shrink-0 w-[85vw] md:w-[350px] lg:w-[400px] bg-surface p-8 rounded-2xl minimal-shadow border border-secondary/10 flex flex-col justify-between text-left relative">
                  <span className="material-symbols-outlined text-secondary/30 text-3xl absolute top-6 left-6">format_quote</span>
                  <p className="font-body text-primary-container/80 text-sm font-light leading-relaxed mt-8 mb-6 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.fallbackImg}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + t.name + "&background=random" }}
                    />
                    <div>
                      <h5 className="font-display text-sm text-primary-container">{t.name}</h5>
                      <span className="text-[9px] uppercase tracking-widest text-secondary">— {t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}



      <section className="relative py-32 lg:py-48 px-[5%] flex flex-col items-center justify-center text-center overflow-hidden">
        <HeroBackground
          src="/riverflow.png"
          alt="Temples at sunrise"
          overlayClassName="bg-gradient-to-b from-[#e6dfd1]/90 via-[#e6dfd1]/60 to-[#e6dfd1]/90"
        />
        <div className="relative z-10 max-w-4xl scroll-reveal flex flex-col items-center w-full md:-translate-x-8">
          <p className="font-display text-4xl lg:text-5xl italic text-primary-container leading-snug mb-6" style={{ whiteSpace: 'pre-line' }}>
            "{pageData.bannerQuote}"
          </p>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary-container mb-16">{pageData.bannerAuthor}</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
