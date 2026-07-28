import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const productPrices = {
  'moksha-lakshmi': 5100,
  'aadi-lingam': null,
  'parad-lingam': null
};

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState('moksha-lakshmi');
  const [fullName, setFullName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [cityState, setCityState] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openOrderModal = (product) => {
    setSelectedProduct(product);
    setShowOrderModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !phone || !cityState) {
      alert("Please fill in your name, phone number and city/state.");
      return;
    }
    setSubmitting(true);
    try {
      const productLabels = {
        'moksha-lakshmi': 'Moksha Lakshmi Photo Frame (Size: 24" × 20")',
        'aadi-lingam': 'Jagadadi Lingam (Size: 6cm × 5cm)',
        'parad-lingam': 'Bhairava Kavacham (Coming Soon)'
      };

      await addDoc(collection(db, 'productEnquiries'), {
        name: fullName,
        phone,
        product: selectedProduct,
        productLabel: productLabels[selectedProduct] || selectedProduct,
        price: productPrices[selectedProduct] ?? null,
        quantity: parseInt(quantity) || 1,
        cityState,
        message,
        status: 'New',
        date: new Date().toISOString().split('T')[0],
        timestamp: serverTimestamp()
      });

      alert("Order submitted successfully! Our team will contact you shortly.");
      // Reset fields
      setFullName('');
      setQuantity(1);
      setPhone('');
      setCityState('');
      setMessage('');
      setShowOrderModal(false);
    } catch (error) {
      console.error("Error submitting order enquiry:", error);
      alert("Submission failed. Please check your internet connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F4EE] text-[#2C2119] font-body selection:bg-[#C7954D]/30 overflow-x-hidden min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full h-[850px] flex overflow-hidden bg-[#2A1F18]">
        {/* Split Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_bg.png"
            alt="Temple Altar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        </div>

        {/* Left-aligned Content Container */}
        <div className="relative z-10 flex flex-col justify-center px-[5%] lg:px-[8%] w-full h-full pt-[90px]">

          {/* Left Content */}
          <div className="w-full max-w-[520px]">

            <h1 className="font-display text-[56px] md:text-[72px] leading-[1] text-white tracking-[-0.03em] mb-8 font-medium">
              Dharmic Products
            </h1>
            <p className="font-body text-white/80 text-[18px] leading-[1.9] font-light max-w-[480px] mb-12">
              Every product is handcrafted with Devotion and Intention, using Authentic Materials and Ancient Knowledge — to support your Spiritual Journey and Daily Practices.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE 01: Moksha Lakshmi Photo Frame */}
      <section className="py-[140px] px-[5%] lg:px-[8%]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 xl:gap-24 items-start">

          {/* Left: Product Image & Privacy Note */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="w-full h-[520px] rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(42,31,24,0.08)]">
              <img
                src="/lakshmi_frame.png"
                alt="Moksha Lakshmi Photo Frame"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-[#FCFAF6] border border-black/5 rounded-[20px] p-6 flex items-start gap-4">
              <span className="material-symbols-outlined text-[#C7954D] text-[24px]">filter_vintage</span>
              <p className="text-[14px] font-body text-[#776D64] leading-relaxed">
                Image is confidential and not displayed publicly.<br />
                Enquire to know more.
              </p>
            </div>
          </div>

          {/* Right: Content & Form */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#C7954D] font-semibold mb-4 block">DIVINE PRESENCE</span>
            <h2 className="font-display font-medium text-[42px] md:text-[52px] leading-[1.1] text-[#2A1F18] tracking-[-0.03em] mb-4">
              Moksha Lakshmi Photo Frame
            </h2>
            <span className="text-[12px] uppercase tracking-[0.1em] text-[#8A5A34] font-bold mb-8 block">SIZE: 24" × 20"</span>

            <div className="font-body text-[#776D64] text-[18px] leading-[1.9] font-light space-y-4 mb-12">
              <p>Moksha Lakshmi is a form of Sri Maha Lakshmi. When a sadhaka was in deep practice, the form of Moksha Lakshmi appeared in meditation. With the help of he sketched this sacred form of the Devi.</p>
              <p>With the grace of his beloved mother Aadi Shakti, the sadhaka completed this form. People who have purchased this frame are often experiencing miracles in their homes.</p>
            </div>

            <div className="w-full lg:w-fit flex flex-col items-center">
            <button
              onClick={() => openOrderModal('moksha-lakshmi')}
              className="h-[56px] w-full lg:w-auto px-8 rounded-[12px] bg-[#D87428] hover:bg-[#c26723] text-white text-[13px] uppercase font-bold tracking-widest transition-colors mt-2 flex items-center justify-center gap-2"
            >
              <span>Order Now</span>
              <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
            </button>
            <span className="mt-3 text-[12px] uppercase tracking-[0.15em] font-semibold text-[#5D6845]">
              Available
            </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE 02: Aadi Lingam */}
      <section className="py-[140px] px-[5%] lg:px-[8%] bg-[#F5EFE6]">
        <div className="max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row gap-16 xl:gap-24 items-start">

          {/* Left: Content & Form */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#C7954D] font-semibold mb-4 block">SACRED LINGAM</span>
            <h2 className="font-display font-medium text-[42px] md:text-[52px] leading-[1.1] text-[#2A1F18] tracking-[-0.03em] mb-4">
              Jagadadi Lingam
            </h2>
            <span className="text-[12px] uppercase tracking-[0.1em] text-[#8A5A34] font-bold mb-8 block">SIZE: 6cm HEIGHT × 5cm WIDTH</span>

            <div className="font-body text-[#776D64] text-[18px] leading-[1.9] font-light space-y-4 mb-12">
              <p>Jagadadi Lingam is an actual form of Shiva Lingam designed based on our Puranas and Vedas.</p>
              <p>Every single detail in our Jagadadi Lingam has its own specification and meaning — we worked on this Lingam for more than 2 years.</p>
              <p>No modern mechanism is used in the manufacturing of the Jagadadi Lingam — it is completely handmade. We perform Rudrabhishekam to each and every Jagadadi Lingam at a Shiva temple before dispatching.</p>
            </div>

            <div className="w-full lg:w-fit flex flex-col items-center">
            <button
              onClick={() => openOrderModal('aadi-lingam')}
              className="h-[56px] w-full lg:w-auto px-8 rounded-[12px] bg-[#D87428] hover:bg-[#c26723] text-white text-[13px] uppercase font-bold tracking-widest transition-colors mt-2 flex items-center justify-center gap-2"
            >
              <span>Order Now</span>
              <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
            </button>
            <span className="mt-3 text-[12px] uppercase tracking-[0.15em] font-semibold text-[#5D6845]">
              Coming Soon
            </span>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="w-full lg:w-1/2">
            <div className="w-full h-[600px] rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(42,31,24,0.08)]">
              <img
                src="/jagadadi.jpeg"
                alt="Aadi Lingam"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE 03: Parad Lingam */}
      <section className="py-[140px] px-[5%] lg:px-[8%]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 xl:gap-24 items-center lg:items-start">

          {/* Left: Product Image */}
          <div className="w-full lg:w-1/2">
            <div className="w-full h-[520px] rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(42,31,24,0.08)]">
              <img
                src="/bhairavakavacham1.jpg"
                alt="Parad Lingam Coming Soon"
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
              />
            </div>
          </div>

          {/* Right: Content & Form */}
          <div className="w-full lg:w-1/2 flex flex-col pt-8">
            <span className="text-[13px] uppercase tracking-[0.2em] text-[#C7954D] font-semibold mb-4 block">PROTECTIVE SHIELD</span>
            <h2 className="font-display font-medium text-[42px] md:text-[52px] leading-[1.1] text-[#2A1F18] tracking-[-0.03em] mb-8">
              Bhairava Kavacham
            </h2>

            <div className="font-body text-[#776D64] text-[18px] leading-[1.9] font-light space-y-4 mb-12">
              <p>Bhairava Kavacham  — Transform your doorway into a sacred sanctuary of peace and positivity with the Bhairava Kavacham Door Shield. </p>
              <p> Specially designed to safeguard your household from negative energies, evil eye (drishti) and environmental stress, this four-in-one divine emblem combines the most potent symbols of protection and prosperity in Vedic tradition.</p>
            </div>

            <div className="w-full lg:w-fit flex flex-col items-center">
            <button
              onClick={() => openOrderModal('parad-lingam')}
              className="h-[56px] w-full lg:w-auto px-8 rounded-[12px] bg-[#D87428] hover:bg-[#c26723] text-white text-[13px] uppercase font-bold tracking-widest transition-colors mt-2 flex items-center justify-center gap-2"
            >
              <span>Order Now</span>
              <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
            </button>
            <span className="mt-3 text-[12px] uppercase tracking-[0.15em] font-semibold text-[#5D6845]">
              Coming Soon

            </span>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM POPUP */}
      {showOrderModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => !submitting && setShowOrderModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            className="relative bg-white border border-black/5 rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-2xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowOrderModal(false)}
              disabled={submitting}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#2C2119] transition-colors disabled:opacity-50"
              aria-label="Close order form"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 id="order-modal-title" className="font-display text-3xl text-[#2C2119] mb-3 text-center pr-10">
              Place Your Order
            </h2>
            <p className="font-body text-[#776D64] text-[12px] sm:text-[14px] lg:text-[16px] sm:whitespace-nowrap mx-auto mb-8 text-center font-light">
              Select a sacred product and share your details. We'll reach out to guide you further.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative">
                <label className="text-[11px] uppercase tracking-widest text-[#776D64] font-bold">Select Product</label>
                <div className="relative">
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="h-[56px] w-full rounded-[12px] bg-white border border-black/5 pl-4 pr-10 focus:outline-none focus:border-[#C7954D] transition-colors appearance-none cursor-pointer text-[15px] font-body text-[#2C2119]"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                  >
                    <option value="moksha-lakshmi">Moksha Lakshmii Photo Frame (Size: 24" × 20")</option>
                    <option value="aadi-lingam">Jagadadi Lingam (Size: 6cm × 5cm)</option>
                    <option value="parad-lingam">Bhairava Kavacham</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#776D64]">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-[#776D64] font-bold">Price</label>
                <input
                  type="text"
                  readOnly
                  value={productPrices[selectedProduct] === null ? '' : '₹5,100/-'}
                  placeholder="Not available"
                  className="h-[56px] rounded-[12px] bg-[#F7F2EB] border border-black/5 px-4 outline-none cursor-default text-[15px] font-body font-medium text-[#2C2119] placeholder:text-[#9A948E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest text-[#776D64] font-bold">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="h-[56px] rounded-[12px] bg-white border border-black/5 px-4 focus:outline-none focus:border-[#C7954D] transition-colors text-[15px] font-body text-[#2C2119]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest text-[#776D64] font-bold">Quantity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="h-[56px] rounded-[12px] bg-white border border-black/5 px-4 focus:outline-none focus:border-[#C7954D] transition-colors text-[15px] font-body text-[#2C2119]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest text-[#776D64] font-bold">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-[56px] rounded-[12px] bg-white border border-black/5 px-4 focus:outline-none focus:border-[#C7954D] transition-colors text-[15px] font-body text-[#2C2119]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-widest text-[#776D64] font-bold">City / State</label>
                  <input
                    type="text"
                    required
                    value={cityState}
                    onChange={(e) => setCityState(e.target.value)}
                    placeholder="Your city and state"
                    className="h-[56px] rounded-[12px] bg-white border border-black/5 px-4 focus:outline-none focus:border-[#C7954D] transition-colors text-[15px] font-body text-[#2C2119]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-[#776D64] font-bold">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any specific requirements or questions..."
                  className="min-h-[120px] rounded-[12px] bg-white border border-black/5 p-4 focus:outline-none focus:border-[#C7954D] transition-colors resize-y text-[15px] font-body text-[#2C2119]"
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
                    <span>Ordering...</span>
                  </>
                ) : (
                  <span>Order Now</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WHY OUR PRODUCTS ARE DIFFERENT */}
      <section className="py-[120px] px-[5%] border-t border-black/5 bg-[#FCFAF6]">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[13px] uppercase tracking-[0.2em] text-[#C7954D] font-semibold mb-16 block">Why Our Products Are Different</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-black/5 justify-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center pt-8 sm:pt-0 px-4">
              <span className="material-symbols-outlined text-[40px] text-[#C7954D] mb-6 font-light">filter_vintage</span>
              <h4 className="font-display text-[22px] text-[#2A1F18] mb-3">Authentic &amp; Scriptural</h4>
              <p className="font-body text-[#776D64] text-[15px] leading-[1.6] font-light">Based on Puranas, Vedas and Siddha traditions.</p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center pt-8 sm:pt-0 px-4">
              <span className="material-symbols-outlined text-[40px] text-[#C7954D] mb-6 font-light">pan_tool</span>
              <h4 className="font-display text-[22px] text-[#2A1F18] mb-3">Handcrafted with Devotion</h4>
              <p className="font-body text-[#776D64] text-[15px] leading-[1.6] font-light">Made by skilled craftsmen with spiritual intention.</p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center pt-8 sm:pt-0 px-4">
              <span className="material-symbols-outlined text-[40px] text-[#C7954D] mb-6 font-light">self_improvement</span>
              <h4 className="font-display text-[22px] text-[#2A1F18] mb-3">Consecrated &amp; Energized</h4>
              <p className="font-body text-[#776D64] text-[15px] leading-[1.6] font-light">Mantras and rituals infuse divine energy.</p>
            </div>
            {/* Feature 5 */}
            <div className="flex flex-col items-center pt-8 sm:pt-0 px-4">
              <span className="material-symbols-outlined text-[40px] text-[#C7954D] mb-6 font-light">temple_hindu</span>
              <h4 className="font-display text-[22px] text-[#2A1F18] mb-3">Supports Sacred Living</h4>
              <p className="font-body text-[#776D64] text-[15px] leading-[1.6] font-light">Designed for daily spiritual practice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative w-full h-[420px] flex items-end pb-16 px-[5%] lg:px-[8%]">
        <div className="absolute inset-0 z-0">
          <img
            src="/pro cover.png"
            alt="Spiritual Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-[600px]">
            <h2 className="font-display font-medium text-[42px] md:text-[56px] leading-[1.1] text-white tracking-[-0.03em] mb-4">
              Bring Home the Divine
            </h2>
            <p className="font-body text-white/80 text-[18px] leading-[1.7] font-light">
              Every product becomes a Reminder of the Sacred and A Companion on the path of Inner Transformation.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
