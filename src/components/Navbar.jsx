import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const openJoinModal = () => setIsJoinModalOpen(true);

    window.addEventListener('open-join-nirgunam', openJoinModal);
    return () => window.removeEventListener('open-join-nirgunam', openJoinModal);
  }, []);

  return (
    <>
      <nav 
        id="main-nav" 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-[5%] flex justify-between items-center ${scrolled ? 'nav-scrolled py-5 bg-surface/95 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}
      >
        <div className="flex items-center gap-3">
          <img src="/navlogo.webp" alt="Nirgunam Logo" className="h-10 w-auto object-contain transition-all duration-500" />
          <div className="flex flex-col leading-none">
            <span className="font-display font-semibold text-xl lg:text-2xl tracking-[0.1em] transition-colors duration-500" style={{ color: scrolled ? '#1c1c17' : '#ffffff' }}>NIRGUNAM</span>
            <span className="text-[9px] uppercase tracking-[0.3em] transition-colors duration-500" style={{ color: scrolled ? '#4e4541' : 'rgba(255, 255, 255, 0.7)' }}>Sri Mata Group</span>
          </div>
        </div>
        <div className="hidden xl:flex items-center gap-10">
          <Link to="/" className={`text-[11px] font-semibold uppercase tracking-widest border-b-2 transition-all duration-500 ${location.pathname === '/' ? (scrolled ? 'border-secondary text-on-surface pb-1' : 'border-white text-white pb-1') : (scrolled ? 'border-transparent text-[#4e4541]' : 'border-transparent text-white/80')}`}>Home</Link>
          <Link to="/about" className={`text-[11px] font-semibold uppercase tracking-widest border-b-2 transition-all duration-500 ${location.pathname === '/about' ? (scrolled ? 'border-secondary text-on-surface pb-1' : 'border-white text-white pb-1') : (scrolled ? 'border-transparent text-[#4e4541]' : 'border-transparent text-white/80')}`}>About</Link>
          <Link to="/journey" className={`text-[11px] font-semibold uppercase tracking-widest border-b-2 transition-all duration-500 ${location.pathname === '/journey' ? (scrolled ? 'border-secondary text-on-surface pb-1' : 'border-white text-white pb-1') : (scrolled ? 'border-transparent text-[#4e4541]' : 'border-transparent text-white/80')}`}>Journey</Link>
          <Link to="/bhairavam" className={`text-[11px] font-semibold uppercase tracking-widest border-b-2 transition-all duration-500 ${location.pathname === '/bhairavam' ? (scrolled ? 'border-secondary text-on-surface pb-1' : 'border-white text-white pb-1') : (scrolled ? 'border-transparent text-[#4e4541]' : 'border-transparent text-white/80')}`}>Bhairavam</Link>
          <Link to="/yatra" className={`text-[11px] font-semibold uppercase tracking-widest border-b-2 transition-all duration-500 ${location.pathname === '/yatra' ? (scrolled ? 'border-secondary text-on-surface pb-1' : 'border-white text-white pb-1') : (scrolled ? 'border-transparent text-[#4e4541]' : 'border-transparent text-white/80')}`}>Yatra</Link>
          <Link to="/products" className={`text-[11px] font-semibold uppercase tracking-widest border-b-2 transition-all duration-500 ${location.pathname === '/products' ? (scrolled ? 'border-secondary text-on-surface pb-1' : 'border-white text-white pb-1') : (scrolled ? 'border-transparent text-[#4e4541]' : 'border-transparent text-white/80')}`}>Products</Link>
          <Link to="/spiritual-activities" className={`text-[11px] font-semibold uppercase tracking-widest border-b-2 transition-all duration-500 ${location.pathname === '/spiritual-activities' ? (scrolled ? 'border-secondary text-on-surface pb-1' : 'border-white text-white pb-1') : (scrolled ? 'border-transparent text-[#4e4541]' : 'border-transparent text-white/80')}`}>Spiritual Activities</Link>
          <Link to="/contact" className={`text-[11px] font-semibold uppercase tracking-widest border-b-2 transition-all duration-500 ${location.pathname === '/contact' ? (scrolled ? 'border-secondary text-on-surface pb-1' : 'border-white text-white pb-1') : (scrolled ? 'border-transparent text-[#4e4541]' : 'border-transparent text-white/80')}`}>Contact</Link>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setIsJoinModalOpen(true)} className={`px-8 py-3 rounded-button text-[11px] uppercase font-bold tracking-widest transition-all duration-500 hidden xl:block ${scrolled ? 'text-on-surface border border-outline/20 bg-surface-container-high/50' : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-primary'}`}>
            Join Nirgunam
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden transition-colors duration-500" style={{ color: scrolled ? '#1c1c17' : '#ffffff' }}>
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-surface flex flex-col items-center justify-center gap-6" onClick={() => setMobileMenuOpen(false)}>
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="absolute top-8 right-[5%] text-[#1c1c17] hover:opacity-75 transition-opacity"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          <Link to="/" className="text-xl font-display text-primary-container" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className="text-xl font-display text-primary-container" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/journey" className="text-xl font-display text-primary-container" onClick={() => setMobileMenuOpen(false)}>Journey</Link>
          <Link to="/bhairavam" className="text-xl font-display text-primary-container" onClick={() => setMobileMenuOpen(false)}>Bhairavam</Link>
          <Link to="/yatra" className="text-xl font-display text-primary-container" onClick={() => setMobileMenuOpen(false)}>Yatra</Link>
          <Link to="/products" className="text-xl font-display text-primary-container" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link to="/spiritual-activities" className="text-xl font-display text-primary-container" onClick={() => setMobileMenuOpen(false)}>Spiritual Activities</Link>
          <Link to="/contact" className="text-xl font-display text-primary-container" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <button onClick={() => { setIsJoinModalOpen(true); setMobileMenuOpen(false); }} className="bg-primary-container text-white px-8 py-3 rounded-button text-xs uppercase font-bold mt-4">Join Nirgunam</button>
        </div>
      )}

      {isJoinModalOpen && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-8 md:p-12 w-full max-w-md relative shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            <button 
              onClick={() => setIsJoinModalOpen(false)} 
              className="absolute top-6 right-6 text-[#2C2119]/50 hover:text-[#2C2119] transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
            <h2 className="font-display text-3xl text-[#2C2119] mb-2">Join Nirgunam</h2>
            <p className="font-body text-[#776D64] text-sm mb-8">Fill out the form below to register your interest.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Form submitted!"); setIsJoinModalOpen(false); }} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold">Full Name</label>
                <input type="text" required className="border-b border-black/10 pb-2 focus:outline-none focus:border-[#B08955] bg-transparent font-body text-[#2C2119]" placeholder="Your Name" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold">Phone No</label>
                <input type="tel" required className="border-b border-black/10 pb-2 focus:outline-none focus:border-[#B08955] bg-transparent font-body text-[#2C2119]" placeholder="Your Phone Number" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold">Event</label>
                <select required defaultValue="" className="border-b border-black/10 pb-2 focus:outline-none focus:border-[#B08955] bg-transparent font-body text-[#2C2119] cursor-pointer">
                  <option value="" disabled>Select an event</option>
                  <option value="Guru Poornima">Guru Poornima</option>
                  <option value="Bhairava Jayanti">Bhairava Jayanti</option>
                  <option value="Maha Shivratri">Maha Shivratri</option>
                  <option value="Retreat">Retreat</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold">Comment</label>
                <textarea rows="3" className="border-b border-black/10 pb-2 focus:outline-none focus:border-[#B08955] bg-transparent font-body text-[#2C2119] resize-none" placeholder="Any comments or questions?"></textarea>
              </div>
              <button type="submit" className="mt-4 bg-[#2C2119] text-white py-4 rounded-lg text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#B08955] transition-colors">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
