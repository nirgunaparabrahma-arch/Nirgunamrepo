import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ theme = "light" }) {
  const isDark = theme === "dark";

  const bgClass = isDark ? "bg-[#1A110D]" : "bg-[#F7F2EB]";
  const borderClass = isDark ? "border-white/10" : "border-black/5";
  const headingClass = isDark ? "text-white" : "text-[#2C2119]";
  const bodyClass = isDark ? "text-white/70" : "text-[#776D64]";
  const mutedClass = isDark ? "text-white/50" : "text-[#776D64]/80";

  return (
    <footer className={`${bgClass} pt-[100px] px-[5%] border-t ${borderClass} relative overflow-hidden`}>
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
      )}
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 border-b ${borderClass} pb-[80px]`}>

          {/* Column 1 */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <img src="/navlogo.webp" alt="Nirgunam Logo" className="h-10 w-auto object-contain" />
              <span className={`font-display font-semibold text-xl tracking-[0.1em] ${headingClass}`}>NIRGUNAM</span>
            </div>
            <p className={`text-[14px] font-body ${bodyClass} leading-[1.8] font-light mb-8 max-w-[240px]`}>
              A sacred space for genuine seekers walking toward self-inquiry, inner transformation and the experience of oneness.
            </p>

          </div>

          {/* Column 2 */}
          <div className="flex flex-col">
            <h5 className={`text-[12px] uppercase tracking-[0.15em] font-bold mb-8 ${headingClass}`}>Nirgunam</h5>
            <div className={`flex flex-col gap-4 text-[14px] font-body ${bodyClass} font-light`}>
              <Link to="/about" className="hover:text-[#C89A58] transition-colors">About Manish Nirgunam</Link>
              <Link to="/journey" className="hover:text-[#C89A58] transition-colors">Spiritual Journey</Link>
              <Link to="/bhairavam" className="hover:text-[#C89A58] transition-colors">Bhairavam</Link>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col">
            <h5 className={`text-[12px] uppercase tracking-[0.15em] font-bold mb-8 ${headingClass}`}>Sri Mata Group</h5>
            <div className={`flex flex-col gap-4 text-[14px] font-body ${bodyClass} font-light`}>
              <Link to="/yatra" className="hover:text-[#C89A58] transition-colors">Yatra</Link>
              <Link to="/products" className="hover:text-[#C89A58] transition-colors">Products</Link>
              <Link to="/spiritual-activities" className="hover:text-[#C89A58] transition-colors">Spiritual Activities</Link>
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col">
            <h5 className={`text-[12px] uppercase tracking-[0.15em] font-bold mb-8 ${headingClass}`}>Contact & Support</h5>
            <div className={`flex flex-col gap-4 text-[14px] font-body ${bodyClass} font-light`}>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">location_on</span> Bangalore</span>
              <a href="https://www.instagram.com/nirgunaparabrahma?igsh=YWQ5OWFjb2xpd2Jj" target="_blank" rel="noopener noreferrer" className="hover:text-[#C89A58] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span> Instagram
              </a>
              <Link to="/contact" className="hover:text-[#C89A58] transition-colors pt-2 border-t border-current/10">Contact Us</Link>
              <a href="#" className="hover:text-[#C89A58] transition-colors">FAQs</a>
              <a href="#" className="hover:text-[#C89A58] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#C89A58] transition-colors">Terms &amp; Conditions</a>
              <Link to="/admin" className="hover:text-[#C89A58] transition-colors">Admin Portal</Link>
            </div>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col">
            <h5 className={`text-[12px] uppercase tracking-[0.15em] font-bold mb-8 ${headingClass}`}>Stay Connected</h5>
            <p className={`text-[14px] font-body ${bodyClass} leading-[1.9] font-light`}>
              Stay close to Nirgunam through sacred reflections, upcoming gatherings and meaningful updates that support your journey toward inner clarity and transformation.
            </p>
          </div>

        </div>

        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <p className={`text-[12px] ${mutedClass} font-light tracking-wide`}>
              © 2026 Sri Mata Group &amp; Nirgunam Foundation. All rights reserved.
            </p>
            <p className={`text-[12px] ${mutedClass} font-light tracking-wide`}>
              Built by <a href="https://viscano.com" target="_blank" rel="noopener noreferrer" className="text-[#D8782B] hover:text-[#C89A58] transition-colors font-medium underline underline-offset-2">Viscano</a>
            </p>
          </div>
          <p className="font-display italic text-[#C89A58] text-[20px] flex items-center gap-3">
            Be your own light. <span className="material-symbols-outlined text-[18px]">flare</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
