import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { destinationDates, destinationCardDates } from '../data/yatraDates';

export default function Yatra() {
  const [submitting, setSubmitting] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pilgrims: '1',
    destination: '',
    senior: 'No',
    city: '',
    dates: '',
    requirements: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => (
      name === 'destination'
        ? { ...prev, destination: value, dates: destinationDates[value] }
        : { ...prev, [name]: value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.destination || !formData.city) {
      alert("Please fill in your name, phone number, destination and city.");
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'yatraRegistrations'), {
        name: formData.name,
        phone: formData.phone,
        pilgrims: parseInt(formData.pilgrims) || 1,
        destination: formData.destination,
        senior: formData.senior,
        city: formData.city,
        dates: formData.destination === 'General Enquiry' ? null : formData.dates,
        requirements: formData.requirements,
        status: 'New',
        date: new Date().toISOString().split('T')[0],
        timestamp: serverTimestamp()
      });

      alert("Yatra registration submitted successfully! Our team will get in touch with you shortly.");
      // Reset form
      setFormData({
        name: '',
        phone: '',
        pilgrims: '1',
        destination: '',
        senior: 'No',
        city: '',
        dates: '',
        requirements: ''
      });
      setShowFormModal(false);
    } catch (error) {
      console.error("Error registering for yatra:", error);
      alert("Registration failed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const destinations = [
    { name: 'Sampurna Kashi', desc: 'Complete pilgrimage across the sacred city of Varanasi — the oldest living city and the divine abode of Lord Shiva.', image: '/kasi.png' },
    { name: 'Dho Dham', desc: 'A focused two-shrine yatra to two of the most sacred Dhams — combining spiritual depth with comfortable access.', image: '/dhodam.png' },
    { name: 'Panchabhutam', desc: 'The five Shiva temples representing the five elements of nature — unique to Tamil Nadu.', image: '/panchbhooth.png' },
    { name: 'Yulla Kanda', desc: 'A remote and powerful Himalayan pilgrimage in Himachal Pradesh — for sincere seekers walking the high-altitude path.', image: '/yullakanda.png' },
    { name: 'Rameshwaram', desc: 'The southernmost Jyotirlinga — where Lord Rama worshipped Shiva before crossing to Lanka. A place of immense sanctity.', image: '/rameswaram.png' },
    { name: 'Char Dham', desc: 'The four most sacred Hindu pilgrimage sites — Badrinath, Kedarnath, Gangotri and Yamunotri in the Himalayas.', image: '/chardam.png' },
    { name: 'Kamakhya', desc: 'One of the most powerful Shakti Peethas — the temple of Goddess Kamakhya atop Nilachal Hill in Assam.', image: '/kamakya.png' },
    { name: 'ABC Trek', desc: 'The Annapurna Base Camp trek — a high-altitude Himalayan journey through sacred mountain landscapes.', image: '/ABC.png' },
    { name: 'Kailash Manasarovar', desc: 'The most revered of all pilgrimages — the abode of Lord Shiva, with the sacred Manas Sarovar lake in Tibet.', image: '/kailash.png' }
  ];

  return (
    <div className="bg-[#F7F2EB] text-[#2C2119] font-body selection:bg-[#C89A58]/30 overflow-x-hidden min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex overflow-hidden">
        {/* Cinematic Background */}
        <HeroBackground
          src="/cvryatra.png"
          mobileSrc="/cvryatra.png"
          alt="Yatra Meditation"
          imageClassName="object-center"
          overlayClassName="bg-gradient-to-b from-black/30 to-black/70"
        />

        {/* Left Content */}
        <div className="relative z-10 flex flex-col justify-center px-[5%] lg:px-[8%] w-full h-full pt-[90px]">
          <div className="w-full max-w-[520px]">
            <span className="text-[13px] uppercase tracking-[0.2em] text-white/80 font-semibold mb-6 block">The Path</span>
            <h1 className="font-display font-medium text-[72px] leading-[1] text-white tracking-[-0.03em] mb-4">
              Yatra
            </h1>
            <h2 className="font-display text-[32px] md:text-[40px] italic font-light text-white/90 mb-8 leading-tight">
              Sacred Walkouts....
            </h2>
            <div className="font-body text-white/80 text-[18px] leading-[1.9] font-light space-y-4 mb-10">
              <p>Unique pilgrimage plans with affordable pricing, ancient scripture knowledge and special care for every seeker.</p>
              <p>Yatra is not tourism. It is a sacred travel outward that mirrors your spiritual transformation inward, guided by profound wisdom.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATION + REGISTRATION SECTION */}
      <section className="py-[120px] px-[5%] lg:px-[8%]">
        <div className="max-w-[1400px] mx-auto">

          <div className="w-full flex flex-col">
            {/* Yatra Group Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              {[
                { src: '/kedgrp.jpeg', alt: 'Yatra group at Kedarnath Temple' },
                { src: '/kasigrp.jpeg', alt: 'Yatra group at Tungnath Temple' },
                { src: '/tungnathgrp.jpeg', alt: 'Yatra group in Kashi' }
              ].map((photo) => (
                <div
                  key={photo.src}
                  className="w-full aspect-[4/3] rounded-[20px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* <h3 className="font-display text-[32px] text-[#2C2119] mb-8">Current Yatra Destinations</h3> */}

            {/* Destination Grid */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 mb-12">
              {[
                'Sampurna Kashi', 'Char Dham', 
                'Rameshwaram', 'Kamakhya', 
                'Panchabhutam', 'ABC Trek', 
                'Yulla Kanda', 'Kailash Manasarovar', 
                'Dho Dham'
              ].map((dest, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#C89A58] text-[16px]" style={{ fontVariationSettings: "'wght' 300" }}>filter_vintage</span>
                  <span className="font-body text-[15px] text-[#2C2119] font-light">{dest}</span>
                </div>
              ))}
            </div> */}

            {/* Quote Card */}
            <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border-l-4 border-l-[#C89A58]">
              <p className="font-display italic text-[24px] leading-[1.4] text-[#2C2119] mb-6">
                "With the reference of ancient scriptures we give detailed knowledge on every particular place which we visit in the yatra."
              </p>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold block">
                — Sri Mata Group
              </span>
            </div>
          </div>

          {showFormModal && (
            <div
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowFormModal(false)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="yatra-modal-title"
                className="relative bg-[#FBF8F4] border border-black/5 rounded-[20px] p-6 sm:p-[40px] shadow-2xl w-full max-w-[680px] max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#2C2119] transition-colors"
                  aria-label="Close registration form"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              <div className="flex items-center gap-3 mb-8 pr-12">
                <span className="material-symbols-outlined text-[#C89A58] text-[28px]">filter_vintage</span>
                <h3 id="yatra-modal-title" className="font-display text-[28px] text-[#2C2119]">Register for Yatra

                </h3>
              </div>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">Full Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Your full name" className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors" />
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">Phone</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">No. of Pilgrims</label>
                    <input type="number" name="pilgrims" required min="1" value={formData.pilgrims} onChange={handleInputChange} className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">Destination</label>
                  <div className="relative">
                    <select name="destination" required value={formData.destination} onChange={handleInputChange} className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors appearance-none cursor-pointer">
                      <option value="" disabled>Select destination</option>
                      <option value="Sampurna Kashi">Sampurna Kashi</option>
                      <option value="Dho-Dham">Dho-Dham</option>
                      <option value="Panchabhutam">Panchabhutam</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#776D64]">expand_more</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">Senior Citizen in Group?</label>
                  <div className="relative">
                    <select name="senior" required value={formData.senior} onChange={handleInputChange} className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors appearance-none cursor-pointer">
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#776D64]">expand_more</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">City / State</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="Your city and state" className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors" />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">Yatra Date</label>
                  <input
                    type="text"
                    name="dates"
                    value={formData.dates ?? ''}
                    readOnly
                    placeholder={formData.destination === 'General Enquiry' ? 'Not applicable' : 'Select a destination to view the date'}
                    className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-black/[0.025] text-[#2C2119] font-body text-[15px] outline-none cursor-default"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">Special Requirements</label>
                  <textarea name="requirements" value={formData.requirements} onChange={handleInputChange} placeholder="Any dietary needs, mobility concerns or other requirements..." className="w-full h-[140px] p-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors resize-none"></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-[58px] mt-2 rounded-[12px] text-[13px] uppercase font-bold tracking-widest text-white bg-[#C56F2B] hover:bg-[#b06124] disabled:bg-[#C56F2B]/60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <span>Register for Yatra</span>
                  )}
                </button>
              </form>
            </div>
            </div>
          )}

        </div>
      </section>

      {/* SHRINES WE COVER SECTION */}
      <section className="py-[120px] px-[5%] lg:px-[8%] bg-[#FDFBF8] border-t border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[13px] uppercase tracking-[0.2em] text-[#C89A58] font-semibold mb-4 block">Sacred Destinations</span>
              <h2 className="font-display font-medium text-[42px] md:text-[52px] leading-[1] text-[#2C2119] tracking-[-0.03em]">
                Shrines We Cover
              </h2>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined text-[#C89A58] text-[80px] opacity-30" style={{ fontVariationSettings: "'wght' 100" }}>local_florist</span>
            </div>
          </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {destinations.map((dest, i) => {
    const destinationRoute =
      dest.name === 'Dho Dham'
        ? '/dho-dham'
        : dest.name === 'Sampurna Kashi'
          ? '/kasi'
          : dest.name === 'Panchabhutam'
            ? '/pancha-bhuta'
          : null;

    // Destination cards with dedicated detail pages
    if (destinationRoute) {
      return (
        <Link
          key={i}
          to={destinationRoute}
          className="bg-[#FBF8F4] border border-black/5 rounded-[20px] h-[220px] flex overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-400 hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] group cursor-pointer"
        >
          <div className="w-[120px] h-full flex-shrink-0 overflow-hidden">
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="p-6 flex flex-col justify-center flex-grow">
            <h4 className="font-display text-[22px] md:text-[24px] font-medium text-[#2C2119] mb-3">
              {dest.name}
            </h4>

            <p className="font-body text-[14px] leading-[1.6] text-[#776D64] font-light flex-grow">
              {dest.desc}
            </p>

            <div className="relative flex items-center justify-center mt-2 min-h-[22px]">
              <span className="text-[11px] font-semibold tracking-[0.08em] text-[#7A5736]">
                {destinationCardDates[dest.name]}
              </span>
              <span className="material-symbols-outlined absolute right-0 text-[#C89A58] text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        </Link>
      );
    }

    // All other destination cards remain normal
    return (
      <div
        key={i}
        className="bg-[#FBF8F4] border border-black/5 rounded-[20px] h-[220px] flex overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] group cursor-default"
      >
        <div className="w-[120px] h-full flex-shrink-0 overflow-hidden">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="p-6 flex flex-col justify-center flex-grow">
          <h4 className="font-display text-[22px] md:text-[24px] font-medium text-[#2C2119] mb-3">
            {dest.name}
          </h4>

          <p className="font-body text-[14px] leading-[1.6] text-[#776D64] font-light flex-grow">
            {dest.desc}
          </p>

          <div className="flex justify-end mt-2">
            <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#9A948E]">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    );
  })}
</div>
        </div>
      </section>

      {/* ESSENCE OF YATRA SECTION */}
      <section className="py-[140px] px-[5%] lg:px-[8%] bg-[#F7F2EB] border-t border-black/5">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-16 xl:gap-8">

          {/* Left Content (25%) */}
          <div className="w-full xl:w-[25%] flex flex-col pr-0 xl:pr-8">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#C89A58] font-semibold mb-6 block">The Essence of Yatra</span>
            <h2 className="font-display font-medium text-[42px] leading-[1.05] text-[#2C2119] tracking-[-0.03em] mb-6">
              More Than <br />A Journey
            </h2>
            <p className="font-body text-[#776D64] text-[15px] leading-[1.8] font-light mb-6">
              Yatra is not about places, it is about Transformation.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: 'self_improvement', text: 'Every step dissolves Ego.' },
                { icon: 'temple_hindu', text: 'Every destination awakens Devotion.' },
                { icon: 'spa', text: 'Every moment becomes Meditation.' }
              ].map((statement) => (
                <div key={statement.text} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#C89A58] text-[22px]">
                    {statement.icon}
                  </span>
                  <p className="font-body text-[#5F554D] text-[15px] leading-[1.6] font-medium">
                    {statement.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Benefits Grid (75%) */}
          <div className="w-full xl:w-[75%] grid grid-cols-2 md:grid-cols-5 gap-8 divide-x divide-black/5">
            <div className="flex flex-col items-center text-center px-4">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>filter_vintage</span>
              <h4 className="font-display font-medium text-[20px] text-[#2C2119] mb-4">Purifies the Mind</h4>
              <p className="font-body text-[13px] text-[#776D64] font-light leading-[1.6]">Travel with Intention, return with Clarity.</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>eco</span>
              <h4 className="font-display font-medium text-[20px] text-[#2C2119] mb-4">Reconnects You</h4>
              <p className="font-body text-[13px] text-[#776D64] font-light leading-[1.6]">Reconnect with Yourself, Nature and the Divine.</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>account_balance</span>
              <h4 className="font-display font-medium text-[20px] text-[#2C2119] mb-4">Ancient Wisdom</h4>
              <p className="font-body text-[13px] text-[#776D64] font-light leading-[1.6]">Learn Scriptures, Stories and Sacred Traditions.</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>landscape</span>
              <h4 className="font-display font-medium text-[20px] text-[#2C2119] mb-4">Creates Inner Shift</h4>
              <p className="font-body text-[13px] text-[#776D64] font-light leading-[1.6]">From Seeking Outside to Awakening Within.</p>
            </div>

            <div className="flex flex-col items-center text-center px-4 md:border-none">
              <span className="material-symbols-outlined text-[#C89A58] text-[40px] mb-6 opacity-80" style={{ fontVariationSettings: "'wght' 200" }}>diversity_1</span>
              <h4 className="font-display font-medium text-[20px] text-[#2C2119] mb-4">Blessed Companions</h4>
              <p className="font-body text-[13px] text-[#776D64] font-light leading-[1.6]">Walk with Seekers, Share, Learn and Grow.</p>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="relative w-full h-[420px] flex items-center overflow-hidden">
        <HeroBackground
          src="/mansa sarovar.png"
          alt="Sacred Landscape"
          overlayClassName="bg-[#7A5736]/40 backdrop-blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17120F]/80 to-transparent"></div>

        <div className="relative z-10 px-[5%] lg:px-[8%] w-full max-w-[800px]">
          <h2 className="font-display font-medium text-[46px] md:text-[56px] leading-[1.1] text-white tracking-[-0.02em] mb-6">
            Begin Your Sacred Journey
          </h2>
          <p className="font-body text-white/90 text-[18px] leading-[1.8] font-light mb-10 max-w-[500px]">
            Join Yatra, Walk Ancient Paths and Awaken the Truth that has always been within you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={() => setShowFormModal(true)} className="h-[56px] px-8 rounded-[12px] text-[13px] uppercase font-bold tracking-widest text-white bg-[#5D6845] hover:bg-[#4a5337] transition-colors flex items-center justify-center">
              Join  Yatra
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
