import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';

export default function Journey() {
  const [pageData, setPageData] = useState({
    heroTitle: 'Spiritual Journey',
    heroSubtitle: 'The Path',
    heroDescription: 'An unfolding of inner transformation, sacred encounters and awakening through direct experiences. Every step on this path is an invitation to go deeper, beyond the known, into the truth of who you are.',
    heroImage: null,
    bottomQuote: 'This journey is not about becoming something new — but dissolving everything false.',
  });

  const [timelineEvents, setTimelineEvents] = useState([
    {
      _id: "01",
      eyebrow: "EARLY YEARS",
      title: "The Inner Question",
      text: "Even during school days, the silent inquiry 'Who am I?' lived within him. By the 10th grade he often preferred solitude over crowds. As he grew older, this inner sensitivity deepened — he began perceiving everything around him with a higher level of awareness.",
      fallbackImg: "/school.jpeg"
    },
    {
      _id: "02",
      eyebrow: "THE TURNING POINT",
      title: "Tiruvannamalai — The Miracle",
      text: "For the first 2 Decades of his life, Manish did not believe in God or spirituality. That changed completely when he was forced to visit a famous Shiva temple in Tiruvannamalai. A real miracle happened there, shattering his old worldview and igniting his profound spiritual journey he walks\u00A0today.",
      fallbackImg: "/tiru.png"
    },
    {
      _id: "03",
      eyebrow: "2017",
      title: "Sri Chakra Peetam",
      text: "He met a spiritual scholar who first helped him see beyond the ordinary world — opening the doors of perception to deeper layers of reality that had been invisible before.",
      fallbackImg: "/sreechakrafull.png"
    },
    {
      _id: "04",
      eyebrow: "2019",
      title: "Energy Initiation",
      text: "He studied with a powerful Tantric Master and experienced deep spiritual visions of the Divine Mother in forms like Chandi, Maha Prathyangira and Lalitha Tripura Sundari. These darshans transformed his understanding of reality entirely.",
      fallbackImg: "/Mund hand.png"
    },
    {
      _id: "05",
      eyebrow: "2021",
      title: "Meditation & Awareness",
      text: "He met a Spiritual Master who taught him about ultimate freedom and energy centers. During this time, he felt the strong spiritual presence of Maha Kali, Sai Baba and Bhagavan Ramana Maharshi — each leaving a lasting mark on his path.",
      fallbackImg: "/meditation.png"
    },
    {
      _id: "06",
      eyebrow: "MARCH 21, 2023",
      title: "The Awakening in Kashi",
      text: "At the holy Manikarnika Ghat in Varanasi, Manish encountered a mysterious person. With just a single look, they showed him the ultimate experience of oneness and completeness — permanently changing the way he perceives. Now he sees into the unmanifested (nirguna) reality behind all form.",
      fallbackImg: "/kasi1.png"
    },
    {
      _id: "07",
      eyebrow: "2024 - PRESENT",
      title: "Nirgunam Foundation",
      text: "Nirgunam was officially announced on Maha Shivaratri 2026 as a space for seekers of truth and inner transformation. Under the guidance of an enlightened master from Tiruvannamalai, revelations naturally blossomed into a path of self-inquiry, awareness and oneness.",
      fallbackImg: "/logowall2.png"
    }
  ]);

  useEffect(() => {
    // Sanity removed
  }, []);

  return (
    <div className="bg-[#F7F2EB] text-[#2C2119] font-body selection:bg-[#C89A58]/30 overflow-x-hidden min-h-screen">
      <Navbar />

      <section className="relative min-h-screen w-full flex flex-col justify-center items-start px-[5%] lg:px-[8%] pt-[90px] overflow-hidden">
        <HeroBackground
          src="/cvrjourney.png"
          mobileSrc="/mbjourney.png"
          alt="Hero"
          imageClassName="object-right"
          overlayClassName="bg-gradient-to-b from-black/30 to-black/70"
        />
        <div className="relative z-10 w-full">
          <div className="w-full max-w-[520px]">
            <span className="text-[13px] uppercase tracking-[0.2em] text-white/80 font-semibold mb-6 block">{pageData.heroSubtitle}</span>
            <h1 className="font-display font-medium text-[56px] md:text-[72px] leading-[1] text-white tracking-[-0.03em] mb-8">
              {pageData.heroTitle}
            </h1>
            <p className="font-body text-white/80 text-[18px] leading-[1.9] font-light">
              {pageData.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-[160px] px-[5%] overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative">
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[1px] bg-[#E7D8C5] transform md:-translate-x-1/2 z-0"></div>
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={event._id} className="relative flex flex-col md:flex-row items-center w-full mb-[120px] last:mb-0 z-10 group">
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-[56px] h-[56px] rounded-full bg-[#FBF8F4] border border-[#E7D8C5] flex items-center justify-center shadow-sm z-20 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-[#C89A58] text-[28px] opacity-80">local_florist</span>
                </div>
                <div className={`hidden md:flex w-1/2 justify-end pr-[80px] ${!isEven ? 'order-1' : 'order-2'}`}>
                  {!isEven ? (
                    <div className="w-[380px] flex flex-col items-end text-right">
                      <span className="text-[13px] uppercase tracking-[0.2em] text-[#C89A58] font-semibold mb-4">{event.eyebrow}</span>
                      <h3 className={`font-display font-medium leading-[1.1] text-[#2C2119] tracking-[-0.03em] mb-6 ${event._id === "02" ? "text-[30px] whitespace-nowrap" : "text-[34px]"}`}>{event.title}</h3>
                      <p className="font-body text-[#776D64] text-[16px] leading-[1.8] font-light">{event.text}</p>
                    </div>
                  ) : (
                    <div className="w-[420px] rounded-[24px] overflow-hidden bg-[#FBF8F4] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5 aspect-[4/3] group-hover:-translate-y-2 transition-transform duration-500">
                      <img src={event.fallbackImg} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className={`hidden md:flex w-1/2 justify-start pl-[80px] ${!isEven ? 'order-2' : 'order-1'}`}>
                  {isEven ? (
                    <div className="w-[380px] flex flex-col items-start text-left">
                      <span className="text-[13px] uppercase tracking-[0.2em] text-[#C89A58] font-semibold mb-4">{event.eyebrow}</span>
                      <h3 className={`font-display font-medium leading-[1.1] text-[#2C2119] tracking-[-0.03em] mb-6 ${event._id === "02" ? "text-[30px] whitespace-nowrap" : "text-[34px]"}`}>{event.title}</h3>
                      <p className="font-body text-[#776D64] text-[16px] leading-[1.8] font-light">{event.text}</p>
                    </div>
                  ) : (
                    <div className="w-[420px] rounded-[24px] overflow-hidden bg-[#FBF8F4] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5 aspect-[4/3] group-hover:-translate-y-2 transition-transform duration-500">
                      <img src={event.fallbackImg} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                {/* Mobile */}
                <div className="flex md:hidden flex-col w-full pl-[64px] pt-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-semibold mb-3">{event.eyebrow}</span>
                  <h3 className={`font-display font-medium leading-[1.1] text-[#2C2119] tracking-[-0.03em] mb-4 ${event._id === "02" ? "text-[18px] sm:text-[24px] whitespace-nowrap" : "text-[28px]"}`}>{event.title}</h3>
                  <div className="w-full rounded-[16px] overflow-hidden bg-[#FBF8F4] border border-black/5 aspect-[16/9] mb-5">
                    <img src={event.fallbackImg} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-body text-[#776D64] text-[15px] leading-[1.8] font-light">{event.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

     {/* Image Quote Section */}
<section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
  
  {/* Background Image */}
  <HeroBackground
    src="/walk.png"
    alt="Spiritual Journey"
    imageClassName="object-center"
    overlayClassName="bg-black/40"
  />

  {/* Quote Content */}
  <div className="relative z-10 text-center px-6 max-w-[1000px]">
    <p className="font-display italic text-3xl md:text-5xl text-white leading-[1.3] tracking-wide">
      "This journey is not about becoming something new —
      <br />
      but dissolving everything false."
    </p>

    <span className="block mt-8 text-[11px] uppercase tracking-[0.3em] text-white/80 font-bold">
      — MANISH NIRGUNAM
    </span>
  </div>

</section>

      {/* The Avadhuta Path */}
      <section className="py-24 px-[5%] bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="col-span-1 lg:col-span-4 rounded-[32px] overflow-hidden aspect-[3/4] shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <img src="/avadpath.png" alt="The Avadhuta Path" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-1 lg:col-span-4 pl-0 lg:pl-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B08955] font-bold mb-6 block">THE PATHLESS PATH</span>
            <h2 className="font-display text-4xl lg:text-5xl leading-[1.1] mb-8 text-[#2C2119]">The Avadhuta Path</h2>
            <div className="font-body text-[#776D64] text-lg font-light leading-[1.8] space-y-6 mb-10">
              <p>
                Manish represents the rare and ancient path of an Avadhuta — one who has completely transcended the mind, ego and worldly desires. The Avadhuta is not bound by any rules, traditions or societal conditioning.
              </p>
              <p>
                He lives in complete freedom, rooted in the ultimate truth and acts purely from spontaneous wisdom rather than calculation.
              </p>
              <p>
                His teachings are not meant to give you a new identity, but to strip away all that is false so you can discover your own true nature.
              </p>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: 'diamond', title: 'No Rules', desc: 'Living simply without rigid boundaries or complicated rituals.' },
              { icon: 'all_inclusive', title: 'Universal Connection', desc: 'Seeing the divine in all forms and beings without separation.' },
              { icon: 'flare', title: 'Nirguna Sthiti', desc: 'The direct approach of removing falsehood to reveal the truth.' },
              { icon: 'wb_sunny', title: 'Open Transmission', desc: 'Silent passing of energy and wisdom beyond spoken words.' }
            ].map((card, i) => (
              <div key={i} className="bg-[#FBF8F4] rounded-[24px] p-6 border border-black/5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all">
                <span className="material-symbols-outlined text-[#B08955] text-2xl mb-4">{card.icon}</span>
                <h4 className="font-display text-lg mb-2 text-[#2C2119]">{card.title}</h4>
                <p className="text-[12px] text-[#776D64] leading-relaxed font-light">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Banner Quote */}
     {/*  <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/about_img.webp" alt="Meditation" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="font-display italic text-3xl md:text-5xl text-white mb-6 leading-snug tracking-wide">
            "The highest purpose of life<br />is to know who you truly are."
          </p>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold">MANISH NIRGUNAM</span>
        </div>
      </section> */}

      {/* Footer Banner */}
      <section className="bg-[#FBF8F4] w-full flex flex-col md:flex-row border-b border-black/5">
        <div className="w-full md:w-1/2 px-[5%] py-24 flex flex-col justify-center items-start lg:pl-[10%]">
          <h2 className="font-display text-4xl lg:text-5xl text-[#2C2119] mb-8 leading-[1.1]">
            Walk the Path with<br />Nirgunam
          </h2>
          <p className="font-body text-[#776D64] text-lg font-light leading-[1.8] mb-12 max-w-md">
            <span className="block font-medium text-[#2C2119] mb-2">
              Are you yearning for a deeper inner connection?
            </span>
            <span className="block">
              Join us in this journey of self-discovery and spiritual awakening.
            </span>
          </p> 
        </div>
        <div className="relative w-full md:w-1/2 h-[400px] md:h-auto overflow-hidden">
  <img
    src="/about5.jpg"
    alt="Meditation"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* White fade */}
  <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#FBF8F4] via-[#FBF8F4]/90 to-transparent"></div>
</div>
      </section>

      <Footer />
    </div>
  );
}
