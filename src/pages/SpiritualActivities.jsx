import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SpiritualActivities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Event Management');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [availability, setAvailability] = useState('');
  const [about, setAbout] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !phone || !selectedRole || !availability) {
      alert("Please fill in your name, phone, area of interest and availability.");
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'volunteers'), {
        name: fullName,
        phone,
        interest: selectedRole,
        availability,
        about,
        status: 'New',
        date: new Date().toISOString().split('T')[0],
        timestamp: serverTimestamp()
      });
      
      alert("Thank you for your application! We will get in touch with you shortly.");
      setIsModalOpen(false);
      // Reset form
      setFullName('');
      setPhone('');
      setSelectedRole('Event Management');
      setAvailability('');
      setAbout('');
    } catch (error) {
      console.error("Error submitting volunteer application:", error);
      alert("Failed to submit application. Please check your network and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F4EE] text-[#2D221A] font-body overflow-x-hidden min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#241812]">
        <HeroBackground
          src="/cvractivities.png"
          alt="Spiritual Gathering"
          overlayClassName="bg-gradient-to-b from-black/30 to-black/70"
        />

        <div className="relative z-10 flex flex-col justify-center px-[5%] lg:px-[8%] w-full h-full pt-[90px]">
          <div className="w-full max-w-[520px]">
            <h1 className="font-display text-[56px] md:text-[72px] leading-[1.1] text-white tracking-[-0.03em] mb-8 font-medium">
              Spiritual Activities
            </h1>
            <p className="font-body text-[#E8E2D9] text-[18px] leading-[1.9] font-light">
              Dharmic education, social service, spiritual gatherings and community transformation — serving genuine seekers and the community.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECT TANDAVAM SECTION */}
      <section className="py-[120px] px-[5%] lg:px-[8%] bg-[#FCFAF6] border-b border-black/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#D8782B] font-semibold mb-6 block">
              Sacred Action
            </span>
            <h2 className="font-display font-medium text-[46px] md:text-[58px] leading-[1.05] text-[#241812] tracking-[-0.03em] mb-8">
              Project Tandavam
            </h2>
            <div className="font-body text-[#766C63] text-[18px] leading-[1.9] font-light space-y-5 max-w-[620px]">
              <p>
                Project Tandavam is a movement that transforms spiritual awareness into purposeful action. It brings seekers together to serve, learn and create meaningful change within the community.
              </p>
              <p>
                Inspired by the rhythm of transformation, the project connects inner growth with collective responsibility—turning devotion into service and intention into impact.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <img
                src="/project-tandavam.png"
                alt="Project Tandavam community initiative"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE INTRODUCTION SECTION */}
      <section className="relative py-[140px] px-[5%] lg:px-[8%] overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute -bottom-20 -right-20 opacity-[0.08] pointer-events-none select-none">
          <span className="material-symbols-outlined text-[400px] text-[#C89A58]">eco</span>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">

          {/* Left Image (45%) */}
          <div className="w-full">
            <div className="relative w-full h-[420px] md:h-[480px] lg:h-[520px] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <img
                src="/food11.png"
                alt="Community Food Service"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content (55%) */}
          <div className="w-full relative z-10">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#D8782B] font-semibold mb-6 block">What We Do</span>
            <h2 className="font-display font-medium text-[24px] sm:text-[32px] md:text-[38px] xl:text-[44px] whitespace-nowrap leading-[1.15] text-[#241812] tracking-[-0.03em] mb-8">
              Service — Sadhana — Transformation
            </h2>

            <p className="font-body text-[#766C63] text-[18px] leading-[1.9] font-light mb-10 max-w-[600px]">
              We conduct spiritual gatherings, dharmic education and community service to support genuine seekers and rebuild inner values from the grassroots. We welcome volunteers with open arms.
            </p>

            <div className="flex flex-col gap-4 mb-12">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#D8782B] text-[22px] mt-1">check</span>
                <p className="font-body text-[#2D221A] text-[16px] leading-[1.6]">Annadhanam</p>
              </div>

              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#D8782B] text-[22px] mt-1">check</span>
                <p className="font-body text-[#2D221A] text-[16px] leading-[1.6]">Dharmic classes — Soundarya Lahari, Lalita and Vishnu Sahasranamam, Hanuman Chalisa</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#D8782B] text-[22px] mt-1">check</span>
                <p className="font-body text-[#2D221A] text-[16px] leading-[1.6]">Detailed knowledge on Sanatana Dharma topics and Slokas</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#D8782B] text-[22px] mt-1">check</span>
                <p className="font-body text-[#2D221A] text-[16px] leading-[1.6]">Providing employment to skilled people regardless of education</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#D8782B] text-[22px] mt-1">check</span>
                <p className="font-body text-[#2D221A] text-[16px] leading-[1.6]">Encouraging school and college students through skill development contests</p>
              </div>
              {/* <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#D8782B] text-[22px] mt-1">check</span>
                <p className="font-body text-[#2D221A] text-[16px] leading-[1.6]">Conducting events and gatherings for dharmic community building</p>
              </div> */}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="h-[56px] px-[28px] rounded-[12px] bg-[#D8782B] hover:bg-[#c26a24] text-white text-[13px] uppercase font-bold tracking-[0.1em] transition-colors shadow-lg shadow-[#D8782B]/20"
            >
              Volunteer Now
            </button>
          </div>
        </div>
      </section>

      {/* PATHS OF SERVICE SECTION */}
      <section className="py-[140px] px-[5%] lg:px-[8%] bg-[#FCFAF6] border-y border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#D8782B] font-semibold mb-4 block">Our Paths of Service</span>
            <h2 className="font-display font-medium text-[42px] md:text-[52px] leading-[1.1] text-[#241812] tracking-[-0.03em] mb-6">
              Paths of Service
            </h2>
            <div className="w-16 h-[1px] bg-[#C89A58] mx-auto opacity-50 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full border border-[#C89A58] bg-transparent"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Spiritual Gatherings',
                description: 'Satsangs, Kirtans and Spiritual Gatherings that uplift the heart and unite the community in Devotion.',
                image: '/service-spiritual-gatherings.png'
              },
              {
                title: 'Spiritual Activities',
                description: 'Dharmic Sessions, Guided Meditations, Chanting and Spiritual Practices to awaken Inner Awareness.',
                image: '/guide med.png'
              },
              {
                title: 'Community Service',
                description: 'Food drives for those in need. We understand that Selfless Giving is the path to Inner Abundance.',
                image: '/service-community.png'
              },
              {
                title: 'Volunteering',
                description: "Let's join our hands together and bring colors to others' lives.",
                image: '/dance.png'
              }
            ].map((service) => (
              <article
                key={service.title}
                className="group bg-[#FCFAF6] border border-black/5 rounded-[20px] overflow-hidden min-h-[410px] flex flex-col hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-400"
              >
                <div className="h-[190px] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 text-center flex flex-col items-center flex-grow">
                  <h3 className="font-display text-[26px] text-[#241812] mb-3 font-medium tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="font-body text-[#766C63] text-[14px] leading-[1.7] font-light">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      {/* <section className="py-[120px] px-[5%] text-center max-w-[900px] mx-auto flex flex-col items-center">
        <span className="font-serif text-[#C89A58] text-[80px] leading-[0.5] block mb-6 font-bold opacity-40">"</span>
        <blockquote className="font-display text-[32px] md:text-[42px] leading-[1.3] text-[#241812] mb-8 font-medium tracking-[-0.02em]">
          The highest form of worship is serving the Divine in every being.
        </blockquote>
        <p className="font-body text-[#766C63] text-[16px] uppercase tracking-[0.1em] font-semibold">
          — Manish Nirgunam
        </p>
        <span className="font-serif text-[#C89A58] text-[80px] leading-[0] block mt-8 font-bold opacity-40 rotate-180">"</span>
      </section> */}

      {/* VOLUNTEER CTA BANNER */}
      <section className="relative w-full h-[320px] flex items-center justify-center px-[5%] overflow-hidden bg-gradient-to-br from-[#D8782B] to-[#C96A24]">
        {/* Subtle decorative geometry/mandala overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center mix-blend-overlay">
          <span className="material-symbols-outlined text-[800px] text-white">all_inclusive</span>
        </div>

        <div className="relative z-10 text-center max-w-[800px] flex flex-col items-center">
          <h2 className="font-display font-medium text-[42px] md:text-[56px] leading-[1.1] text-white tracking-[-0.02em] mb-10">
            We Welcome Volunteers with Open Arms
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-[56px] px-[32px] rounded-[12px] bg-white hover:bg-[#F8F4EE] text-[#D8782B] text-[13px] uppercase font-bold tracking-[0.1em] transition-colors shadow-xl"
          >
            Apply as Volunteer
          </button>
        </div>
      </section>

      {/* Dark Footer */}
      <Footer theme="dark" />

      {/* VOLUNTEER MODAL POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#241812] border border-white/10 rounded-[28px] max-w-[700px] w-full p-8 md:p-10 relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] text-[#E8E2D9]">

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Modal Header */}
            <div className="mb-8 text-left">
              <h3 className="font-display text-3xl text-white mb-2 font-medium">Volunteer Application</h3>
              <p className="font-body text-[#D8782B] text-[15px] font-light">
                Let's join our hands together and bring colors to others' lives.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="h-[56px] rounded-[12px] bg-[#1C120C] border border-white/5 px-4 focus:outline-none focus:border-[#D8782B] transition-colors text-[15px] font-body text-white placeholder-white/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold">Phone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-[56px] rounded-[12px] bg-[#1C120C] border border-white/5 px-4 focus:outline-none focus:border-[#D8782B] transition-colors text-[15px] font-body text-white placeholder-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold">Area of Interest</label>
                  <div className="relative">
                    <select
                      required
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="h-[56px] w-full rounded-[12px] bg-[#1C120C] border border-white/5 pl-4 pr-10 focus:outline-none focus:border-[#D8782B] transition-colors appearance-none cursor-pointer text-[15px] font-body text-white"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                    >
                      <option value="Event Management" className="text-white">Event Management</option>
                      <option value="Social Media / Content" className="text-white">Social Media / Content</option>
                      <option value="Teaching / Education" className="text-white">Teaching / Education</option>
                      <option value="Photography / Video" className="text-white">Photography / Video</option>
                      <option value="Cooking / Kitchen" className="text-white">Cooking / Kitchen</option>
                      <option value="Transport / Logistics" className="text-white">Transport / Logistics</option>
                      <option value="IT / Technical" className="text-white">IT / Technical</option>
                      <option value="Other" className="text-white">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/50">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold">Availability</label>
                  <div className="relative">
                    <select
                      required
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="h-[56px] w-full rounded-[12px] bg-[#1C120C] border border-white/5 pl-4 pr-10 focus:outline-none focus:border-[#D8782B] transition-colors appearance-none cursor-pointer text-[15px] font-body text-white"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                    >
                      <option value="" disabled className="text-white">Select</option>
                      <option value="Full Time" className="text-white">Full Time</option>
                      <option value="Part Time" className="text-white">Part Time</option>
                      <option value="Weekends Only" className="text-white">Weekends Only</option>
                      <option value="Flexible" className="text-white">Flexible</option>
                      <option value="Online" className="text-white">Online</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/50">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold">About Yourself</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell us about yourself and how you'd like to help..."
                  className="min-h-[120px] rounded-[12px] bg-[#1C120C] border border-white/5 p-4 focus:outline-none focus:border-[#D8782B] transition-colors resize-none text-[15px] font-body text-white placeholder-white/30"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="h-[56px] w-full rounded-[12px] bg-[#D87428] hover:bg-[#c26723] disabled:bg-[#D87428]/60 disabled:cursor-not-allowed text-white text-[13px] uppercase font-bold tracking-widest transition-colors mt-2 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
