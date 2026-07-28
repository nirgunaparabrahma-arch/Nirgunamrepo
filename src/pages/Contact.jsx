import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-[#FDFBF7] text-[#2C2119] font-body selection:bg-[#B08955]/30 overflow-x-hidden min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#241D19]">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-[5%] w-full h-full pt-[90px]">
          <span className="text-[13px] uppercase tracking-[0.2em] text-[#B08955] font-semibold mb-6 block">GET IN TOUCH</span>
          <h1 className="font-display font-medium text-[48px] md:text-[64px] leading-[1.1] text-white tracking-[-0.03em]">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-[5%] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Contact Info */}
        <div className="flex flex-col">
          <h2 className="font-display text-4xl mb-8 text-[#2C2119]">Reach out to us</h2>
          <p className="font-body text-[#776D64] text-lg font-light leading-relaxed mb-12">
            If you have any questions, inquiries or would like to know more about  Nirgunam , please feel free to contact us.
          </p>

          <div className="space-y-8">
            <div>
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold mb-2"><FaPhoneAlt /> PHONE</span>
              <a href="tel:9686161819" className="font-display text-2xl text-[#2C2119] hover:text-[#B08955] transition-colors">9686161819</a>
            </div>

            <div>
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold mb-2"><FaWhatsapp /> WHATSAPP</span>
              <a
                href="https://wa.me/918722161819"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl text-[#2C2119] hover:text-[#25D366] transition-colors"
                aria-label="Chat with Nirgunam on WhatsApp at 8722161819"
              >
                8722161819
              </a>
            </div>

            <div>
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold mb-2"><FaEnvelope /> EMAIL</span>
              <a href="mailto:nirgunaparabrahma@gmail.com" className="font-display text-2xl text-[#2C2119] hover:text-[#B08955] transition-colors break-all">nirgunaparabrahma@gmail.com</a>
            </div>

            <div>
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold mb-2"><FaInstagram /> INSTAGRAM</span>
              <a href="https://www.instagram.com/nirgunaparabrahma?igsh=YWQ5OWFjb2xpd2Jj" target="_blank" rel="noopener noreferrer" className="font-display text-2xl text-[#2C2119] hover:text-[#B08955] transition-colors break-all">@nirgunaparabrahma</a>
            </div>

            <div>
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold mb-2"><FaMapMarkerAlt /> LOCATION</span>
              <span className="font-display text-2xl text-[#2C2119]">Bangalore</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5">
        <h2 className="font-display text-3xl text-[#2C2119] mb-8 text-center">
  Personal Letter
</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-b border-black/10 pb-2 focus:outline-none focus:border-[#B08955] bg-transparent transition-colors font-body text-[#2C2119]"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-b border-black/10 pb-2 focus:outline-none focus:border-[#B08955] bg-transparent transition-colors font-body text-[#2C2119]"
                placeholder="Your Email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[11px] uppercase tracking-[0.2em] text-[#B08955] font-bold">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="border-b border-black/10 pb-2 focus:outline-none focus:border-[#B08955] bg-transparent transition-colors font-body text-[#2C2119] resize-none"
                placeholder="Your Personal Letter to Nirgunam"
              ></textarea>
            </div>

            <button type="submit" className="mt-6 bg-[#2C2119] text-white py-4 rounded-lg text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#B08955] transition-colors">
              Send Your Letter
            </button>

            <p className="text-center text-[12px] text-[#776D64] italic mt-2">
              (only founder Manish Nirgunam will read your Letter)
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
