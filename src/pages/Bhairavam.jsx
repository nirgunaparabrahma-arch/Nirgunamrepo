import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';

export default function Bhairavam() {

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F7F2EB] text-[#2C2119] font-body selection:bg-[#C89A58]/30 overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-start px-[5%] lg:px-[8%] pt-[90px] overflow-hidden">
        {/* Cinematic Background */}
        <HeroBackground
          src="/cvrbhairavam.png"
          mobileSrc="/mbbhairavam.png"
          alt="Bhairavam Meditation"
          imageClassName="object-right lg:object-center"
          overlayClassName="bg-gradient-to-b from-black/30 to-black/70"
          onError={(e) => { e.currentTarget.src = "/cvrbhairavam.png"; }}
        />

        {/* Left Content */}
        <div className="relative z-10 w-full">
          <div className="w-full max-w-[520px]">
            <span className="text-[13px] uppercase tracking-[0.2em] text-white/80 font-semibold mb-6 block">The Essence</span>
            <h1 className="font-display font-medium text-[72px] leading-[1] text-white tracking-[-0.03em] mb-4">
              Bhairavam
            </h1>
            <h2 className="font-display text-[32px] md:text-[40px] italic font-light text-white/90 mb-8 leading-tight">
              The truth beyond description.
            </h2>
            <div className="font-body text-white/80 text-[18px] leading-[1.9] font-light space-y-4 mb-10">
              <p>
                Bhairavam is not a ritual to perform, but a Stillness to dissolve into — revealing the pure consciousness that has always been within.
              </p>
              <p>
                Bhairavam is not a belief, philosophy or ritual. It is the raw presence behind all existence — beyond identity, thought and the illusion of separation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-[140px] px-[5%] lg:px-[8%] border-b border-black/5">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 xl:gap-20 items-center lg:items-start">

          {/* Left: Cinematic Portrait (35%) */}
          <div className="w-full lg:w-[35%]">
            <div className="relative aspect-[4/5] rounded-[18px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white p-2 transform rotate-[-1deg] group">
              <div className="w-full h-full rounded-[14px] overflow-hidden">
                <img
                  src="/manishnirgunam.jpeg"
                  alt="Founder in Silence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                  onError={(e) => { e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuCaCjknXk14Ygy0xGzWaAzm3-oxAIQAW7Jw9t6SCx8gBrXPV4WJDABc2dBfKKHS6FK8JaPVDyY5JBtEC7Lk7U-NUM-jPBgl5zoFK1vHhUHZtHC3oJR7Za_SrGx_G4_2rM6t7qLmuAQpNh5s5Wt3szhUdy5OfUt6oaqyhOqI1z5IX1W3oGbz6-NyXcdd4l8gS9p-AYviTcrr9gdrjRfJBENFkgWyqqvx8Cm2QLswUCo-Cl_b9tv2nEesasG1HRHMBKhLtJ-vJQIS5z6o" }}
                />
              </div>
            </div>
          </div>

          {/* Center: Editorial Content (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col pt-4">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#C89A58] font-semibold mb-6 block">About Bhairavam</span>
            <h2 className="font-display font-medium text-[42px] xl:text-[52px] leading-[1.05] text-[#2C2119] tracking-[-0.03em] mb-8">
              Beyond Thought.<br />Beyond Identity.
            </h2>
            <div className="font-body text-[#776D64] text-[18px] leading-[1.9] font-light space-y-6">
              <p>Bhairavam is the ultimate formless reality that exists beyond names, beyond shapes, beyond concepts.</p>
              <p>It is not something you practice. It is what remains when all practicing ends.</p>
              <p>It is not something you become. It is what you discover has always been the truth of you.</p>
            </div>
          </div>

          {/* Right: Quote Panel (25%) */}
          <div className="w-full lg:w-[25%] h-full mt-8 lg:mt-0">
            <div className="h-full min-h-[360px] bg-[#FBF8F4] border border-black/5 rounded-[20px] p-[40px] flex flex-col justify-center relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              {/* Botanical watermark */}
              <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[200px] text-[#C89A58] opacity-[0.08] pointer-events-none" style={{ fontVariationSettings: "'wght' 100" }}>local_florist</span>

              <span className="font-display text-[60px] leading-none text-[#C89A58] opacity-50 mb-4 block">"</span>
              <p className="font-display italic text-[28px] xl:text-[32px] leading-[1.2] text-[#2C2119] relative z-10">
                When the seeker disappears, what remains is Bhairavam — limitless, silent and whole.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy Section (Dark Mode) */}
      <section className="bg-[#17120F] py-[120px] px-[5%] lg:px-[8%]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">

          <div className="w-full md:w-[42%] flex flex-col">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#C89A58] font-semibold mb-8 block">The Experience</span>
            <h2 className="font-display font-medium text-[48px] xl:text-[58px] leading-[1.1] text-white tracking-[-0.02em] mb-6">
              Beyond Time.<br />Beyond Self.
            </h2>
            <div className="font-body text-white/70 text-[18px] leading-[1.9] font-light space-y-6">
              <p>Bhairavam is not understood by the mind. It is known in the silence that remains when the mind dissolves.</p>
              <p>It is not found in books or temples, but in the stillness of direct experience.</p>
            </div>
          </div>

          <div className="w-full md:w-[40%] lg:w-[35%] md:ml-auto">
            <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <img
                src="/mkfire1.jpeg"
                alt="Sacred Shiva Lingam"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-[120px] px-[5%] bg-[#F7F2EB]">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-[40px] h-[1px] bg-[#C89A58]/30"></div>
            <h3 className="text-[13px] uppercase tracking-[0.2em] text-[#7A5736] font-semibold">How Bhairavam Transforms</h3>
            <div className="w-[40px] h-[1px] bg-[#C89A58]/30"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-black/5">

            <div className="flex flex-col items-center pt-8 sm:pt-0 sm:px-6">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>filter_vintage</span>
              <h4 className="font-display font-medium text-[22px] text-[#2C2119] mb-4">Dissolves Fear</h4>
              <p className="font-body text-[14px] text-[#776D64] font-light leading-[1.8]">When separation ends, fear has no place to exist.</p>
            </div>

            <div className="flex flex-col items-center pt-8 sm:pt-0 sm:px-6">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>light_mode</span>
              <h4 className="font-display font-medium text-[22px] text-[#2C2119] mb-4">Brings True Freedom</h4>
              <p className="font-body text-[14px] text-[#776D64] font-light leading-[1.8]">Freedom is not earned — it is recognized as your nature.</p>
            </div>

            <div className="flex flex-col items-center pt-8 sm:pt-0 sm:px-6">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>change_circle</span>
              <h4 className="font-display font-medium text-[22px] text-[#2C2119] mb-4">Ends Suffering</h4>
              <p className="font-body text-[14px] text-[#776D64] font-light leading-[1.8]">Suffering belongs to the mind. You are beyond the mind.</p>
            </div>

            <div className="flex flex-col items-center pt-8 sm:pt-0 sm:px-6">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>landscape</span>
              <h4 className="font-display font-medium text-[22px] text-[#2C2119] mb-4">Reveals Oneness</h4>
              <p className="font-body text-[14px] text-[#776D64] font-light leading-[1.8]">You see yourself in all and all in yourself.</p>
            </div>

            <div className="flex flex-col items-center pt-8 sm:pt-0 sm:px-6">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>all_inclusive</span>
              <h4 className="font-display font-medium text-[22px] text-[#2C2119] mb-4">Abides as Peace</h4>
              <p className="font-body text-[14px] text-[#776D64] font-light leading-[1.8]">Not temporary peace, but your natural, limitless peace.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="relative w-full h-[340px] flex items-center justify-start overflow-hidden">
        <HeroBackground
          src="/maneeshriver.jpeg"
          alt="Mountain Sunrise"
          overlayClassName="bg-[#17120F]/50 backdrop-blur-[2px]"
        />

        <div className="relative z-10 text-left px-[5%] max-w-[1000px] w-full">
          <p className="font-display font-medium text-[36px] md:text-[64px] leading-[1.1] text-white tracking-[-0.02em] mb-8 drop-shadow-lg">
            “Unlearn the belief that your thoughts, past and identity define you.”
          </p>
          <span className="text-[13px] uppercase tracking-[0.2em] text-[#C89A58] font-semibold drop-shadow-md">— Manish Nirgunam</span>
        </div>
      </section>

    

      <Footer />

    </div>
  );
}
