import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { destinationDates } from "../data/yatraDates";

export default function PanchaBhuta() {
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pilgrims: "1",
    destination: "Pancha Bhuta",
    senior: "No",
    city: "",
    dates: destinationDates.Panchabhutam,
    requirements: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.destination ||
      !formData.city
    ) {
      alert(
        "Please fill in your name, phone number, destination and city."
      );
      return;
    }

    setSubmitting(true);

    try {
      await addDoc(collection(db, "yatraRegistrations"), {
        name: formData.name,
        phone: formData.phone,
        pilgrims: parseInt(formData.pilgrims) || 1,
        destination: formData.destination,
        senior: formData.senior,
        city: formData.city,
        dates: formData.dates,
        requirements: formData.requirements,
        status: "New",
        date: new Date().toISOString().split("T")[0],
        timestamp: serverTimestamp()
      });

      alert(
        "Yatra registration submitted successfully! Our team will get in touch with you shortly."
      );

      setFormData({
        name: "",
        phone: "",
        pilgrims: "1",
        destination: "Pancha Bhuta",
        senior: "No",
        city: "",
        dates: destinationDates.Panchabhutam,
        requirements: ""
      });

      setShowModal(false);

    } catch (error) {
      console.error("Error registering for yatra:", error);

      alert(
        "Registration failed. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tripDetails = [
    { label: "Duration", value: "4 Days" },
    { label: "Arrival Place", value: "Bengaluru" },
    { label: "Service Area", value: "Telangana & Andhra Pradesh" },
    { label: "Transport", value: "Private AC Bus" },
  ];

  const regionalPricing = [
    { region: "Bengaluru", price: "₹15,000" },
    { region: "Hyderabad", price: "₹18,000" },
    { region: "Andhra Pradesh", price: "₹15,000" },
  ];

  const itinerary = [
    {
      day: "DAY 1",
      title: "Tiruvannamalai",
      items: [
        "Arrival and journey towards Tiruvannamalai",
        "Explore the sacred kshetras of Tiruvannamalai",
        "Girivalam and temple darshan",
      ],
    },
    {
      day: "DAY 2",
      title: "Jambukeshwar to Chidambaram",
      items: [
        "01:00 – 04:00 — Travel to Jambukeshwar",
        "Morning Slot — Jambukeshwar & Srirangam temple visit",
        "Evening Slot — Brihadeshwar, K. Sundareshwar, Kumbakonam",
        "Night Slot — Reach Chidambaram",
      ],
    },
    {
      day: "DAY 3",
      title: "Chidambaram to Kanchipuram",
      items: [
        "Morning Slot — Explore Chidambaram",
        "Noon — Lunch & refreshment stop at Puducherry",
        "Evening — Kanchipuram Ekambareswarar",
      ],
    },
    {
      day: "DAY 4",
      title: "Thiruttani, Gudimallam & Sri Kalahasti",
      items: [
        "Morning Slot — Thiruttani",
        "Noon — Gudimallam",
        "Evening — Sri Kalahasti",
        "Return journey after completing the Pancha Bhuta circuit",
      ],
    },
  ];

  const clothing = [
    "Western wear such as jeans, shorts, sleeveless tops and tight leggings is strictly forbidden in most Pancha Bhuta temples.",
    "Comfortable traditional clothing is preferred for all temple visits.",
    "Comfortable walking shoes with good grip.",
    "Slippers or sandals for use at hotels and temple premises.",
  ];

  const documents = [
    "Photo ID (Aadhaar Card, Voter ID): Essential for registration and identification.",
    "Yatra / travel registration documents, if required.",
    "Medical certificates, if applicable.",
  ];

  const personalItems = [
    "Toiletries: Soap, shampoo, toothbrush, toothpaste etc.",
    "Sunscreen and sunglasses.",
    "Hand sanitizer.",
    "Personal prescribed medications.",
    "Basic first-aid kit.",
    "Water bottle.",
    "Power bank and phone charger.",
    "Small backpack for daily essentials.",
    "Cash for places where digital payments may not be available.",
  ];

  const considerations = [
    {
      title: "Preparation",
      text: "Dress comfortably and respectfully for temple visits. Carry light luggage and keep daily essentials in a small backpack.",
    },
    {
      title: "Weather",
      text: "Check the local weather forecast before travelling and carry suitable clothing for changing conditions.",
    },
    {
      title: "Physical Fitness",
      text: "The itinerary involves walking and temple visits, so comfortable footwear and adequate rest are recommended.",
    },
    {
      title: "Additional Tips",
      text: "Carry dry fruits or energy bars for quick snacks, keep valuables secure and respect local customs and traditions.",
    },
  ];

  const inclusions = [
    "Bengaluru-to-Bengaluru transportation by private AC bus.",
    "Sleeper AC bus from Hyderabad to Bengaluru and return.",
    "Andhra Pradesh-to-Andhra Pradesh transportation by private AC bus.",
    "Best available accommodation on a sharing basis during the Yatra.",
    "Caretaker support and guidance throughout the Yatra.",
  ];

  const exclusions = [
    "VIP Darshan and special Seva or Abhishekam tickets across all temples.",
    "Food, snacks, water bottles and other refreshments.",
    "Medical care or emergency evacuation if required.",
    "Additional hotel accommodation.",
    "Expenses for an early return from the Yatra due to personal reasons.",
    "Expenses caused by unavoidable circumstances such as roadblocks, bad weather or natural calamities.",
  ];

  const cancellationPolicy = [
    "Cancellation 40–26 days before departure: full payment refunded excluding the non-refundable deposit.",
    "Cancellation 25–16 days before departure: 75% refunded excluding the non-refundable deposit.",
    "Cancellation 15–8 days before departure: 50% refunded excluding the non-refundable deposit.",
    "No refund for cancellations requested less than 7 days before departure.",
    "Refunds will not be issued when a participant cannot attend due to heavy rain, floods, traffic jams, vehicle breakdowns or personal medical emergencies.",
    "Bookings cannot be transferred to another date when a participant is unable to attend.",
    "If the Yatra is cancelled due to natural calamities, political unrest or circumstances beyond our control, the same cancellation policy will apply.",
  ];

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2C2119]">
      <Navbar />

     {/* HERO SECTION */}
<section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">

  {/* Hero Image */}
  <img
    src="/panchabhuta.png"
    alt="Pancha Bhuta Sacred Yatra"
    className="absolute inset-0 w-full h-full object-cover object-center"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/45"></div>

  {/* Hero Content */}
  <div className="relative z-10 h-full flex items-center justify-center px-6">
    <div className="text-center text-white max-w-4xl">

      <span className="text-[12px] uppercase tracking-[0.3em] text-[#E8C58B] font-semibold">
        Sacred Yatra
      </span>

      <h1 className="mt-5 font-display text-5xl md:text-7xl font-medium">
        Pancha Bhuta
      </h1>

      <p className="mt-5 max-w-2xl mx-auto text-white/80 text-base md:text-lg leading-8">
        A sacred journey through the divine temples associated with the
        five elements of nature.
      </p>

    </div>
  </div>

</section>

      {/* YATRA OVERVIEW */}
      <section className="py-20 px-6 md:px-10 bg-[#F7F2EB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[12px] uppercase tracking-[0.3em] text-[#C89A58] font-semibold">
              More Than 10 Sacred Kshetras
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              The Pancha Bhuta Journey
            </h2>
            <p className="mt-6 text-[#776D64] text-[16px] leading-8">
              In Vedic philosophy the material cosmos and the human body are composed of the five sacred elements—Earth, Water, Fire, Air and Space. Visiting all five kshetras is a transformative journey that harmonizes nature with the individual.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {tripDetails.map((detail) => (
              <div key={detail.label} className="bg-[#FBF8F4] rounded-[18px] p-6 border border-black/5 text-center">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#9A6F3E] font-bold">
                  {detail.label}
                </span>
                <p className="font-display text-xl md:text-2xl mt-3">{detail.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#2C2119] rounded-[20px] p-8 md:p-10 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold">
                  Sacred Route
                </span>
                <p className="font-display text-2xl md:text-3xl mt-4 leading-relaxed">
                  Tiruvannamalai — Jambukeshwar — Chidambaram — Ekambareshwar — Sri Kalahasti
                </p>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold">
                  Regional Pricing
                </span>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {regionalPricing.map((item) => (
                    <div key={item.region} className="rounded-[12px] bg-white/[0.06] p-4 text-center">
                      <p className="text-white/60 text-[11px] uppercase tracking-wider">{item.region}</p>
                      <p className="font-display text-xl mt-2">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section className="py-20 px-6 md:px-10 bg-[#FDFBF8]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-[12px] uppercase tracking-[0.3em] text-[#C89A58] font-semibold">
              The Sacred Route
            </span>

            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Yatra Itinerary
            </h2>
          </div>

          <div className="space-y-6">
            {itinerary.map((day, index) => (
              <div
                key={index}
                className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-7 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
              >
                <div className="flex flex-col md:flex-row gap-6">

                  <div className="md:w-[150px] flex-shrink-0">
                    <span className="inline-block px-4 py-2 rounded-full bg-[#C89A58]/10 text-[#9A6F3E] text-[12px] font-bold tracking-widest">
                      {day.day}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl mb-5">
                      {day.title}
                    </h3>

                    <div className="space-y-3">
                      {day.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-start gap-3 text-[#776D64]"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C89A58] flex-shrink-0" />

                          <p className="text-[15px] leading-7">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TRAVEL ESSENTIALS */}
      <section className="py-24 px-6 md:px-10 bg-[#F7F2EB]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-[12px] uppercase tracking-[0.3em] text-[#C89A58] font-semibold">
              Be Prepared
            </span>

            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Travel Essentials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CLOTHING */}
            <div className="bg-[#FBF8F4] rounded-[20px] p-8 border border-black/5">
              <div className="w-12 h-12 rounded-full bg-[#C89A58]/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#C89A58]">
                  checkroom
                </span>
              </div>

              <h3 className="font-display text-2xl mb-6">
                Clothing
              </h3>

              <div className="space-y-4">
                {clothing.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="text-[#C89A58] mt-1">•</span>
                    <p className="text-sm text-[#776D64] leading-6">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="bg-[#FBF8F4] rounded-[20px] p-8 border border-black/5">
              <div className="w-12 h-12 rounded-full bg-[#C89A58]/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#C89A58]">
                  description
                </span>
              </div>

              <h3 className="font-display text-2xl mb-6">
                Documents
              </h3>

              <div className="space-y-4">
                {documents.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="text-[#C89A58] mt-1">•</span>
                    <p className="text-sm text-[#776D64] leading-6">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PERSONAL ITEMS */}
            <div className="bg-[#FBF8F4] rounded-[20px] p-8 border border-black/5">
              <div className="w-12 h-12 rounded-full bg-[#C89A58]/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#C89A58]">
                  backpack
                </span>
              </div>

              <h3 className="font-display text-2xl mb-6">
                Personal Items
              </h3>

              <div className="space-y-4">
                {personalItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="text-[#C89A58] mt-1">•</span>
                    <p className="text-sm text-[#776D64] leading-6">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* IMPORTANT CONSIDERATIONS */}
      <section className="py-24 px-6 md:px-10 bg-[#FDFBF8]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-[12px] uppercase tracking-[0.3em] text-[#C89A58] font-semibold">
              Before You Travel
            </span>

            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Important Considerations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {considerations.map((item, index) => (
              <div
                key={index}
                className="bg-[#F7F2EB] rounded-[20px] p-8 border border-black/5"
              >
                <span className="text-[#C89A58] text-sm font-bold">
                  0{index + 1}
                </span>

                <h3 className="font-display text-2xl mt-3 mb-4">
                  {item.title}
                </h3>

                <p className="text-[#776D64] text-[15px] leading-7">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* INCLUSIONS & EXCLUSIONS */}
      <section className="py-24 px-6 md:px-10 bg-[#F7F2EB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[12px] uppercase tracking-[0.3em] text-[#C89A58] font-semibold">
              Plan With Clarity
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Inclusions & Exclusions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {[
              { title: "What Is Included", icon: "check_circle", items: inclusions },
              { title: "What Is Not Included", icon: "cancel", items: exclusions },
            ].map((group) => (
              <div key={group.title} className="bg-[#FBF8F4] rounded-[20px] p-8 md:p-10 border border-black/5">
                <div className="flex items-center gap-3 mb-7">
                  <span className="material-symbols-outlined text-[#C89A58] text-3xl">{group.icon}</span>
                  <h3 className="font-display text-2xl md:text-3xl">{group.title}</h3>
                </div>
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C89A58] flex-shrink-0" />
                      <p className="text-[#776D64] text-[14px] leading-7">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFUND & CANCELLATION POLICY */}
      <section className="py-24 px-6 md:px-10 bg-[#FDFBF8]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#2C2119] rounded-[24px] p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="md:w-[32%]">
                <span className="material-symbols-outlined text-[#C89A58] text-4xl mb-5">
                  policy
                </span>
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  Refund & Cancellation Policy
                </h2>
                <p className="text-white/60 text-sm leading-7 mt-5">
                  Our priority is to provide a smooth and enjoyable journey. The following policy applies to every booking.
                </p>
              </div>
              <div className="md:w-[68%] space-y-4">
                {cancellationPolicy.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    <span className="text-[#C89A58] text-[12px] font-bold mt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-white/70 text-[14px] leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center bg-[#F7F2EB]">
        <span className="text-[12px] uppercase tracking-[0.3em] text-[#C89A58] font-semibold">
          Begin Your Journey
        </span>

        <h2 className="mt-5 font-display text-4xl md:text-5xl">
          Walk the Sacred Path
        </h2>

        <p className="mt-5 max-w-xl mx-auto text-[#776D64] leading-7">
          Join the Pancha Bhuta Yatra and experience the sacred temples,
          traditions and spiritual heritage of South India.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-8 h-[56px] px-10 rounded-[12px] bg-[#C56F2B] hover:bg-[#B06124] text-white text-[13px] uppercase font-bold tracking-widest transition-colors"
        >
          Register Now
        </button>
      </section>

      <Footer />

      {/* REGISTRATION MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FBF8F4] rounded-[20px] p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">
                close
              </span>
            </button>

            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold">
                Pancha Bhuta Yatra
              </span>

              <h2 className="font-display text-3xl md:text-4xl mt-3">
                Register for Yatra
              </h2>

              <p className="mt-3 text-sm text-[#776D64]">
                Fill in your details and our team will get in touch with you.
              </p>
            </div>

            <form
  className="space-y-5"
  onSubmit={handleSubmit}
>

  {/* FULL NAME */}
  <div>
    <label className="block text-[11px] uppercase tracking-widest font-bold text-[#7A5736] mb-2">
      Full Name
    </label>

    <input
      type="text"
      name="name"
      required
      value={formData.name}
      onChange={handleInputChange}
      placeholder="Your full name"
      className="w-full h-[54px] px-4 rounded-[10px] border border-black/10 bg-white outline-none focus:border-[#C89A58]"
    />
  </div>


  {/* PHONE + NO. OF PILGRIMS */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    {/* PHONE */}
    <div>
      <label className="block text-[11px] uppercase tracking-widest font-bold text-[#7A5736] mb-2">
        Phone
      </label>

      <input
        type="tel"
        name="phone"
        required
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="+91 XXXXX XXXXX"
        className="w-full h-[54px] px-4 rounded-[10px] border border-black/10 bg-white outline-none focus:border-[#C89A58]"
      />
    </div>


    {/* NO. OF PILGRIMS */}
    <div>
      <label className="block text-[11px] uppercase tracking-widest font-bold text-[#7A5736] mb-2">
        No. of Pilgrims
      </label>

      <input
        type="number"
        name="pilgrims"
        required
        min="1"
        value={formData.pilgrims}
        onChange={handleInputChange}
        className="w-full h-[54px] px-4 rounded-[10px] border border-black/10 bg-white outline-none focus:border-[#C89A58]"
      />
    </div>

  </div>


  {/* DESTINATION */}
  <div>
    <label className="block text-[11px] uppercase tracking-widest font-bold text-[#7A5736] mb-2">
      Destination
    </label>

    <input
      type="text"
      name="destination"
      value="Pancha Bhuta"
      readOnly
      className="w-full h-[54px] px-4 rounded-[10px] border border-black/10 bg-[#F3EEE7] outline-none cursor-not-allowed"
    />
  </div>


  {/* SENIOR CITIZEN */}
  <div>
    <label className="block text-[11px] uppercase tracking-widest font-bold text-[#7A5736] mb-2">
      Senior Citizen in Group?
    </label>

    <div className="relative">

      <select
        name="senior"
        required
        value={formData.senior}
        onChange={handleInputChange}
        className="w-full h-[54px] px-4 rounded-[10px] border border-black/10 bg-white outline-none focus:border-[#C89A58] appearance-none cursor-pointer"
      >
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>

      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#776D64]">
        expand_more
      </span>

    </div>
  </div>


  {/* CITY / STATE */}
  <div>
    <label className="block text-[11px] uppercase tracking-widest font-bold text-[#7A5736] mb-2">
      City / State
    </label>

    <input
      type="text"
      name="city"
      required
      value={formData.city}
      onChange={handleInputChange}
      placeholder="Your city and state"
      className="w-full h-[54px] px-4 rounded-[10px] border border-black/10 bg-white outline-none focus:border-[#C89A58]"
    />
  </div>


  {/* YATRA DATE */}
  <div>
    <label className="block text-[11px] uppercase tracking-widest font-bold text-[#7A5736] mb-2">
      Date
    </label>

    <input
      type="text"
      name="dates"
      value={formData.dates}
      readOnly
      className="w-full h-[54px] px-4 rounded-[10px] border border-black/10 bg-[#F5F0E9] outline-none cursor-default"
    />
  </div>


  {/* SPECIAL REQUIREMENTS */}
  <div>
    <label className="block text-[11px] uppercase tracking-widest font-bold text-[#7A5736] mb-2">
      Special Requirements
    </label>

    <textarea
      name="requirements"
      value={formData.requirements}
      onChange={handleInputChange}
      placeholder="Any dietary needs, mobility concerns or other requirements..."
      className="w-full h-[120px] p-4 rounded-[10px] border border-black/10 bg-white outline-none focus:border-[#C89A58] resize-none"
    />
  </div>


  {/* SUBMIT BUTTON */}
  <button
    type="submit"
    disabled={submitting}
    className="w-full h-[56px] rounded-[12px] bg-[#C56F2B] hover:bg-[#B06124] disabled:bg-[#C56F2B]/60 disabled:cursor-not-allowed text-white text-[13px] uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2"
  >

    {submitting ? (
      <>
        <span className="material-symbols-outlined text-lg animate-spin">
          sync
        </span>

        <span>
          Registering...
        </span>
      </>
    ) : (
      <span>
        Register for Pancha Bhuta Yatra
      </span>
    )}

  </button>

</form>
          </div>
        </div>
      )}
    </div>
  );
}
