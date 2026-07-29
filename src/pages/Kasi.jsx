import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroBackground from "../components/HeroBackground";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { destinationDates } from "../data/yatraDates";

function ItineraryHeader({ duration, isOpen, onClick, eyebrow }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      className="w-full rounded-[20px] border border-[#C89A58]/25 bg-[#FBF8F4] px-6 py-7 md:px-9 md:py-8 flex items-center justify-between gap-6 text-left shadow-[0_8px_28px_rgba(44,33,25,0.04)] hover:border-[#C89A58]/50 transition-colors"
    >
      <div>
        {eyebrow && (
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#C89A58] font-bold">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-[30px] md:text-[42px] text-[#2C2119] mt-1">
          Yatra Itinerary
        </h2>
        <p className="font-display font-semibold text-[#C56F2B] text-[18px] md:text-[22px] mt-2">
          {duration}
        </p>
      </div>
      <span className={`material-symbols-outlined flex-shrink-0 w-11 h-11 rounded-full bg-[#C56F2B] text-white flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        expand_more
      </span>
    </button>
  );
}

export default function KasiYatra() {
  const [showYatraModal, setShowYatraModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openItinerary, setOpenItinerary] = useState(null);
  const [openPackingGuides, setOpenPackingGuides] = useState({});

  const togglePackingGuide = (guide) => {
    setOpenPackingGuides((current) => ({
      ...current,
      [guide]: !current[guide]
    }));
  };
  const [showExceptionalExclusions, setShowExceptionalExclusions] = useState(false);

  const openAndScrollToItinerary = (itineraryKey) => {
    setOpenItinerary(itineraryKey);

    requestAnimationFrame(() => {
      document
        .getElementById(`kasi-itinerary-${itineraryKey}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pilgrims: "1",
    destination: "Sampoorna Kashi Yatra",
    senior: "No",
    city: "",
    dates: destinationDates["Sampurna Kashi"],
    requirements: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
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
        pilgrims: parseInt(formData.pilgrims, 10) || 1,
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
        destination: "Sampoorna Kashi Yatra",
        senior: "No",
        city: "",
        dates: destinationDates["Sampurna Kashi"],
        requirements: ""
      });

      setShowYatraModal(false);
    } catch (error) {
      console.error("Error registering for Kashi Yatra:", error);

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

  // -----------------------------
  // ITINERARY
  // -----------------------------
  const itinerary = [
    {
      date: "Day 1",
      title: "Kashi Temple Darshan",
      description:
        "Hotel check-in — Kalabhairava Temple — Vishwanath Dham — Sakshi and Dundi Ganapati — Annapurna Temple — Vishalakshi Temple (Shaktipeeth)."
    },
    {
      date: "Day 2",
      title: "Sacred Temples of Kashi",
      description:
        "Early Varahi Temple darshan — Two Gupta Mandirs — Tilbhandeshwar — Sankat Mochan Hanuman — Birla Mandir — Tulsi Das Mandir — Gavvalamma — Durga Temple — Three special places."
    },
    {
      date: "Day 3",
      title: "Explore the Sacred Ghats",
      description:
        "Explore the Ghats — Manikarnika Ghat — Ganga Ghat — Three special places."
    },
    {
      date: "Day 4",
      title: "Free Day",
      description:
        "Free time for shopping and personal exploration."
    }
  ];

  const extendedItinerary = [
    {
      date: "Day 1",
      title: "Kashi Temple Darshan",
      description:
        "Hotel check-in — Kalabhairava Temple — Vishwanath Dham — Sakshi and Dundi Ganapati — Annapurna Temple — Vishalakshi Temple (Shaktipeeth)."
    },
    {
      date: "Day 2",
      title: "Sacred Temples of Kashi",
      description:
        "Early Varahi Temple darshan — Two Gupta Mandirs — Tilbhandeshwar — Sankat Mochan Hanuman — Birla Mandir — Tulsi Das Mandir — Gavvalamma — Durga Temple — Three special places."
    },
    {
      date: "Day 3",
      title: "Explore the Sacred Ghats",
      description:
        "Explore the Ghats — Manikarnika Ghat — Ganga Ghat — Three special places."
    },
    {
      date: "Day 4",
      title: "Gaya",
      description:
        "Travel to Gaya — Explore the sacred places — Return to Kashi."
    },
    {
      date: "Day 5",
      title: "Ayodhya",
      description:
        "Hotel checkout — Travel to Ayodhya — Explore Ayodhya — Depart for Naimisharanyam — Overnight stay."
    },
    {
      date: "Day 6",
      title: "Naimisharanyam and Prayagraj",
      description:
        "Explore Naimisharanyam and local temples — Travel to Prayagraj — Darshan and rituals — Trip ends."
    }
  ];

  // -----------------------------
  // PACKAGE OPTIONS
  // -----------------------------
  const packageOptions = [
    {
      duration: "3 Nights / 4 Days",
      price: "₹8,000",
      itineraryKey: "four"
    },
    {
      duration: "5 Nights / 6 Days",
      price: "₹12,000",
      itineraryKey: "six"
    },
    {
      duration: "9 Nights / 10 Days",
      price: "₹15,000",
      itineraryKey: "ten"
    }
  ];

  // -----------------------------
  // CLOTHING
  // -----------------------------
  const clothing = [
    "Light and modest cotton clothing suitable for temple visits and warm daytime weather.",
    "A warm layer or shawl for winter mornings, late evenings and air-conditioned travel.",
    "A raincoat or compact umbrella during the monsoon or uncertain weather.",
    "Comfortable walking shoes for stone ghats, temple queues and narrow lanes.",
    "Easy-to-remove sandals because footwear must be removed at many temples.",
    "Extra socks and a change of clothes after Ganga snan or ritual activities."
  ];

  // -----------------------------
  // DOCUMENTS
  // -----------------------------
  const documents = [
    "Government photo ID such as Aadhaar Card, Voter ID, Passport or Driving Licence.",
    "Travel tickets and hotel details in both digital and printed form.",
    "Medical prescriptions for regular medicines and existing health conditions.",
    "Emergency contact information and medical history for senior citizens."
  ];

  // -----------------------------
  // PERSONAL ITEMS
  // -----------------------------
  const personalItems = [
    "Toiletries, hand sanitiser, tissues, wet wipes and a small quick-dry towel.",
    "Personal medicines, basic first-aid supplies, ORS, pain relief and digestive medicine.",
    "Reusable water bottle and light snacks for travel and temple queues.",
    "Sunscreen, cap, sunglasses, mosquito repellent and lip balm.",
    "Power bank, phone charger, torch and a small secure cross-body pouch.",
    "Small backpack for daily essentials; avoid carrying heavy luggage into temple areas.",
    "Cash in small denominations while keeping documents and valuables secure."
  ];

  // -----------------------------
  // PACKAGE INCLUDES
  // -----------------------------
  const packageIncludes = [
    "Local transport to important places.",
    "Food is available at the stay area only.",
    "Best AC accommodation on a triple-sharing basis during the Yatra.",
    "Caretaker and guidance for the entire Yatra."
  ];

  // -----------------------------
  // PACKAGE EXCLUDES
  // -----------------------------
  const packageExcludes = [
    "Train or flight tickets.",
    "VIP Darshan, special Seva or Abhishekam tickets across all temples.",
    "Food, snacks, water bottles and other refreshments.",
    "Any medical or emergency evacuations if required.",
    "Additional hotel accommodation.",
    "Any additional expenses incurred for an early return from the Yatra due to personal reasons.",
    "All expenses incurred due to unforeseen and unavoidable circumstances like roadblocks, bad weather or natural calamities.",
    "Any kind of cost that is not mentioned in the cost inclusions above."
  ];

  // -----------------------------
  // MEDICAL SUPPLIES
  // -----------------------------
  const medicalSupplies = [
    "Carry all personally prescribed medicines in sufficient quantity.",
    "Keep ORS, anti-diarrhoeal medicine, motion-sickness tablets, antiseptic and bandages.",
    "Travellers with diabetes, heart conditions, mobility limitations or respiratory concerns should consult their doctor before travel."
  ];

  // -----------------------------
  // IMPORTANT CONSIDERATIONS
  // -----------------------------
  const considerations = [
    {
      title: "Walking",
      description:
        "Kashi's galis and ghats require walking on uneven stone surfaces and steps."
    },
    {
      title: "Crowds",
      description:
        "Temple queues can be long during festivals, weekends and auspicious days."
    },
    {
      title: "Ritual Timings",
      description:
        "Darshan, aarti, boating and Pind Daan timings may change locally."
    },
    {
      title: "Weather",
      description:
        "Heat, rain, fog or river conditions may affect the planned sequence."
    },
    {
      title: "Respect",
      description:
        "Follow temple dress rules, photography restrictions and local customs."
    }
  ];

  // -----------------------------
  // ADDITIONAL TIPS
  // -----------------------------
  const additionalTips = [
    { icon: "wb_twilight", title: "Start Early", text: "Begin early to avoid heavy crowds and daytime heat." },
    { icon: "footprint", title: "Simple Footwear", text: "Keep footwear simple, comfortable and easy to identify." },
    { icon: "lock", title: "Protect Valuables", text: "Avoid carrying valuables into crowded temple areas." },
    { icon: "water_bottle", title: "Stay Refreshed", text: "Drink safe water and choose light food during the journey." },
    { icon: "groups", title: "Stay Together", text: "Remain with the group during temple visits and transfers." },
    { icon: "verified_user", title: "Choose Verified Services", text: "Use only priests, guides, boats and transport verified by the organisers." }
  ];

  // -----------------------------
  // EXCEPTIONAL COST EXCLUSIONS
  // -----------------------------
  const exclusions = [
    "Additional hotel accommodation and meals caused by delays, route changes or an extended stay.",
    "Any expenses of a personal nature.",
    "Transport or sightseeing services not mentioned in the itinerary.",
    "Emergency evacuation, hospitalisation and medical treatment expenses.",
    "Costs for an early return due to personal reasons.",
    "Any increase in permit fees, hotel prices, transport charges or ritual charges beyond the organiser's control.",
    "Expenses caused by weather, floods, river conditions, natural disasters or technical failures.",
    "Expenses caused by delays, cancellations, strikes, riots, political closures, lockdowns or war.",
    "Any service not listed under the package inclusions."
  ];

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2C2119]">

      {/* ================================
          NAVBAR
      ================================= */}
      <Navbar />

      {/* ================================
          HERO SECTION
      ================================= */}
      <section className="relative min-h-screen flex items-end overflow-hidden">

        <HeroBackground
          src="/cvrkashi.png"
          mobileSrc="/mbkashi.png"
          alt="Sampoorna Kashi Yatra"
          overlayClassName="bg-gradient-to-t from-black/85 via-black/45 to-black/10"
        />

        <div className="relative z-10 w-full px-[5%] lg:px-[8%] pb-40 md:pb-20">

          <div className="max-w-[900px]">

            <span className="text-[12px] uppercase tracking-[0.3em] text-[#E3B875] font-semibold">
              Sacred Walkouts
            </span>

            <h1 className="font-display text-[50px] md:text-[78px] leading-[1.05] text-white mt-5">
              Sampurna Kashi Yatra
            </h1>

            <p className="font-display italic text-[23px] md:text-[32px] text-white/90 mt-5">
              Where the Soul Finds Its Serenity
            </p>

            <p className="font-body text-white/75 text-[16px] md:text-[18px] leading-[1.8] mt-6 max-w-[760px]">
              A complete sacred circuit covering Kashi darshan,
              Ganga rituals, Ancestral offerings and the most revered
              nearby Kshetras.
            </p>

            {/* <button
              type="button"
              onClick={() => setShowYatraModal(true)}
              className="inline-flex items-center justify-center mt-9 h-[54px] px-8 rounded-[12px] bg-[#C56F2B] hover:bg-[#b06124] text-white text-[12px] uppercase font-bold tracking-widest transition-colors"
            >
              Register for Yatra
            </button> */}

          </div>

        </div>

        <button
          type="button"
          onClick={() => setShowYatraModal(true)}
          className="absolute z-20 bottom-8 right-6 md:bottom-12 md:right-10 h-[56px] px-8 md:px-10 rounded-[12px] bg-[#C56F2B] hover:bg-[#B06124] text-white text-[13px] uppercase font-bold tracking-widest transition-colors shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
        >
          Register Now
        </button>

      </section>

      {/* ================================
          TRIP OVERVIEW
      ================================= */}
      <section className="py-[100px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-16">

            <h2 className="font-display text-[42px] md:text-[55px]">
              Sampurna Kashi Yatra
            </h2>

            <p className="font-display italic font-semibold text-[#C56F2B] text-[20px] md:text-[24px] mx-auto mt-5 leading-relaxed">
              In Kashi, every step is a step toward liberation.
            </p>

          </div>

          {/* Package Options */}
          <div>

            <div className="text-center mb-8">

              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold">
                Package Options
              </span>

              <h3 className="font-display text-[32px] mt-3">
                Choose Your Journey
              </h3>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {packageOptions.map((packageItem, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => openAndScrollToItinerary(packageItem.itineraryKey)}
                  aria-label={`View the ${packageItem.duration} itinerary`}
                  className="group relative w-full bg-[#FBF8F4] border border-black/5 rounded-[18px] p-7 pb-11 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#C89A58]/45 hover:shadow-[0_14px_34px_rgba(44,33,25,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C56F2B] focus-visible:ring-offset-2"
                >
                  <span className="material-symbols-outlined text-[#C89A58] text-[32px] transition-transform duration-300 group-hover:scale-110">
                    temple_hindu
                  </span>

                  <h4 className="font-display text-[22px] mt-4">
                    {packageItem.duration}
                  </h4>

                  <p className="text-[#C56F2B] font-bold text-[18px] mt-3">
                    {packageItem.price}
                  </p>

                  <span
                    aria-hidden="true"
                    className="material-symbols-outlined absolute right-4 bottom-4 text-[#C89A58] text-[24px] transition-transform duration-300 group-hover:translate-x-1"
                  >
                    arrow_forward
                  </span>
                </button>
              ))}

            </div>

            <div className="mt-8 rounded-[20px] border border-[#C89A58]/30 bg-[#FBF8F4] px-6 py-8 md:px-10 md:py-9">
              <h3 className="font-display text-center text-[27px] md:text-[31px] text-[#2C2119]">
                Highlights
              </h3>

              <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6">
                {[
                  ["🪔", "Experience Ganga Aarthi"],
                  ["🔥", "Essence of Manikarnika"],
                  ["🧘", "Meditation at Kashi Ghats"],
                  ["📿", "Satsang"]
                ].map(([icon, highlight]) => (
                  <div
                    key={highlight}
                    className="flex items-center justify-center gap-3 text-center"
                  >
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 text-[23px]"
                    >
                      {icon}
                    </span>
                    <p className="text-[13px] md:text-[14px] font-semibold leading-relaxed text-[#5F554C]">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </section>
            {/* ================================
          ITINERARY
      ================================= */}
      <section className="py-[110px] px-[5%] lg:px-[8%] bg-[#FDFBF8] border-y border-black/5">

        <div className="max-w-[1100px] mx-auto">

          <div id="kasi-itinerary-four" className="scroll-mt-28">
            <ItineraryHeader
              duration="3 Nights / 4 Days"
              isOpen={openItinerary === "four"}
              onClick={() => setOpenItinerary(openItinerary === "four" ? null : "four")}
            />
          </div>

          {openItinerary === "four" && (
          <div className="relative mt-14">

            {/* Timeline Vertical Line */}
            <div className="absolute left-[24px] md:left-[120px] top-0 bottom-0 w-[1px] bg-[#C89A58]/30" />

            <div className="flex flex-col gap-12">

              {itinerary.map((item, index) => (
                <div
                  key={index}
                  className="relative flex gap-8 md:gap-16"
                >

                  {/* Day */}
                  <div className="w-[50px] md:w-[100px] flex-shrink-0 text-right">

                    <span className="text-[12px] md:text-[14px] font-bold text-[#C89A58]">
                      {item.date}
                    </span>

                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 w-[10px] h-[10px] mt-1 rounded-full bg-[#C89A58] ring-8 ring-[#FDFBF8] flex-shrink-0" />

                  {/* Itinerary Card */}
                  <div className="bg-[#FBF8F4] border border-black/5 rounded-[18px] p-6 md:p-8 flex-1">

                    <h3 className="font-display text-[23px] md:text-[27px]">
                      {item.title}
                    </h3>

                    <p className="font-body text-[14px] md:text-[15px] text-[#776D64] leading-[1.8] mt-3">
                      {item.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>
          )}

          <div id="kasi-itinerary-six" className="mt-6 scroll-mt-28">
            <ItineraryHeader
              duration="5 Nights / 6 Days"
              isOpen={openItinerary === "six"}
              onClick={() => setOpenItinerary(openItinerary === "six" ? null : "six")}
            />
          </div>

          {openItinerary === "six" && (
          <div>
            {/* Yatra Route */}
            <div className="mt-8 bg-[#FBF8F4] rounded-[20px] border border-black/5 py-8 px-6 md:py-12 md:px-10 text-center overflow-hidden">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold">
                Yatra Route
              </span>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-y-3 font-display text-[18px] sm:text-[20px] md:text-[27px] leading-[1.8]">
                {[
                  "Varanasi",
                  "Sarnath",
                  "Prayagraj",
                  "Ayodhya",
                  "Naimisharanya",
                  "Gaya",
                  "Varanasi"
                ].map((place, index, route) => (
                  <span key={`${place}-${index}`} className="inline-flex items-center whitespace-nowrap">
                    <span>{place}</span>
                    {index < route.length - 1 && (
                      <span className="text-[#C89A58] mx-2 md:mx-3">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mt-14">
              <div className="absolute left-[24px] md:left-[120px] top-0 bottom-0 w-[1px] bg-[#C89A58]/30" />

              <div className="flex flex-col gap-12">
                {extendedItinerary.map((item, index) => (
                  <div key={index} className="relative flex gap-8 md:gap-16">
                    <div className="w-[50px] md:w-[100px] flex-shrink-0 text-right">
                      <span className="text-[12px] md:text-[14px] font-bold text-[#C89A58]">
                        {item.date}
                      </span>
                    </div>

                    <div className="relative z-10 w-[10px] h-[10px] mt-1 rounded-full bg-[#C89A58] ring-8 ring-[#FDFBF8] flex-shrink-0" />

                    <div className="bg-[#FBF8F4] border border-black/5 rounded-[18px] p-6 md:p-8 flex-1">
                      <h3 className="font-display text-[23px] md:text-[27px]">
                        {item.title}
                      </h3>
                      <p className="font-body text-[14px] md:text-[15px] text-[#776D64] leading-[1.8] mt-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          <div id="kasi-itinerary-ten" className="mt-6 scroll-mt-28">
            <ItineraryHeader
              duration="9 Nights / 10 Days"
              isOpen={openItinerary === "ten"}
              onClick={() => setOpenItinerary(openItinerary === "ten" ? null : "ten")}
            />
          </div>

          {openItinerary === "ten" && (
          <div className="mt-8 rounded-[22px] border border-[#C89A58]/25 bg-[#FBF8F4] p-7 md:p-10 shadow-[0_10px_35px_rgba(44,33,25,0.04)]">
            <div className="max-w-[900px] mx-auto text-center">
              <p className="text-[#5F554C] text-[16px] md:text-[17px] leading-8">
                We will explore handpicked local destinations specially crafted by Nirgunam.
              </p>

              <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-[#9A6F3E] font-bold">
                Spiritual one-day Yatras across Kashi
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {['Ashtabhairav Yatra', 'Nava Durga Yatra', '12 Aditya Yatra'].map((yatra) => (
                  <span
                    key={yatra}
                    className="inline-flex items-center gap-2 rounded-full border border-[#C89A58]/30 bg-[#FFF7EA] px-4 py-2 text-[13px] md:text-[14px] font-semibold text-[#7A5736]"
                  >
                    <span aria-hidden="true" className="text-[#C56F2B]">✣</span>
                    {yatra}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-[#5F554C] text-[15px] md:text-[16px] leading-7">
                Pilgrims can choose their desired Yatra during registration.
              </p>
            </div>

            <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="group rounded-[18px] bg-gradient-to-b from-[#FFF9EF] to-[#FFF1DA] border border-[#C89A58]/25 p-7 shadow-[0_10px_30px_rgba(122,87,54,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(122,87,54,0.12)]">
                <div className="w-12 h-12 rounded-full bg-[#C56F2B] text-white flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[25px]">nights_stay</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C56F2B] font-bold">Sacred Significance</span>
                <h4 className="font-display text-[23px] text-[#7A5736] mt-2">Significance of Nine Nights</h4>
                <p className="mt-3 text-[#5F554C] text-[15px] leading-7">
                  Nine sacred nights in Kashi symbolize a complete inner passage—traditionally associated with <span className="font-semibold text-[#A95D25]">Moksha, purification and spiritual renewal.</span>
                </p>
              </div>

              <div className="group rounded-[18px] bg-gradient-to-b from-[#FFF9EF] to-[#FFF1DA] border border-[#C89A58]/25 p-7 shadow-[0_10px_30px_rgba(122,87,54,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(122,87,54,0.12)]">
                <div className="w-12 h-12 rounded-full bg-[#C56F2B] text-white flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[25px]">all_inclusive</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C56F2B] font-bold">Cycle of Life</span>
                <h4 className="font-display text-[23px] text-[#7A5736] mt-2">Womb Connection</h4>
                <p className="mt-3 text-[#5F554C] text-[15px] leading-7">
                  As nine months in the womb prepare a soul for birth, nine nights in Kashi represent an inward return—believed to help one <span className="font-semibold text-[#A95D25]">move beyond the cycle of rebirth.</span>
                </p>
              </div>

              <div className="group rounded-[18px] bg-gradient-to-b from-[#FFF9EF] to-[#FFF1DA] border border-[#C89A58]/25 p-7 shadow-[0_10px_30px_rgba(122,87,54,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(122,87,54,0.12)]">
                <div className="w-12 h-12 rounded-full bg-[#C56F2B] text-white flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[25px]">auto_awesome</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C56F2B] font-bold">Grace of Kashi</span>
                <h4 className="font-display text-[23px] text-[#7A5736] mt-2">Kashi Labh</h4>
                <p className="mt-3 text-[#5F554C] text-[15px] leading-7">
                  Kashi Labh is the sacred faith that continuous nights in this holy city invite Shiva’s grace and <span className="font-semibold text-[#A95D25]">cleanse the burdens accumulated through life.</span>
                </p>
              </div>
            </div>
          </div>
          )}

          <div className="mt-8 rounded-[18px] border border-[#C89A58]/25 bg-[#FFF9F0] p-6 md:p-7">
            <div className="flex flex-col sm:flex-row gap-4">
              <span className="material-symbols-outlined flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#C56F2B] text-white">
                payments
              </span>

              <div className="space-y-2">
                <p className="text-[15px] md:text-[16px] leading-7 text-[#5F554C]">
                  <span className="font-bold text-[#C56F2B]">₹2,999/- non-refundable</span> fee should be paid in advance at the time of registration.
                </p>
                <p className="text-[15px] md:text-[16px] font-semibold leading-7 text-[#2C2119]">
                  The full payment must be cleared at least 20 days before your departure date.
                </p>
              </div>
            </div>
          </div>

          {/* Tentative Itinerary Notice */}
          <div className="mt-16 bg-[#FFF7EA] border border-[#C89A58]/20 rounded-[18px] p-7 md:p-8">

            <div className="flex flex-col md:flex-row gap-5">

              <span className="material-symbols-outlined text-[#C89A58] text-[36px] flex-shrink-0">
                info
              </span>

              <div>

                <h3 className="font-display text-[23px]">
                  Tentative Schedule
                </h3>

                <p className="text-[#776D64] text-[14px] leading-[1.8] mt-3">
                  The itinerary may be reordered according to temple
                  timings, traffic, crowd control, weather, local
                  administration or the wellbeing of the group.
                  Sacred destinations will be covered as practically
                  as conditions permit.
                </p>

              </div>

            </div>

          </div>

          {/* Walking Notice */}
          <div className="mt-8 bg-[#FFF7EA] border border-[#C89A58]/20 rounded-[18px] p-7 flex flex-col md:flex-row gap-5">

            <span className="material-symbols-outlined text-[#C89A58] text-[34px] flex-shrink-0">
              directions_walk
            </span>

            <div>
              <h3 className="font-display text-[22px]">
                Walking in Kashi
              </h3>

              <p className="text-[#776D64] text-[14px] leading-[1.8] mt-2">
                Walking is required to navigate the narrow and crowded
                lanes of Kashi. Volunteers will assist yatris and
                caretakers will support senior citizens.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================================
          PREPARATION INTRODUCTION
      ================================= */}
      <section className="py-[100px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1000px] mx-auto text-center">

          <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
            Prepare Mindfully
          </span>

          <h2 className="font-display text-[42px] md:text-[55px] mt-4">
            Preparation and Packing Guide
          </h2>

          <p className="font-body text-[#655A50] text-[16px] md:text-[17px] max-w-[760px] mx-auto mt-6 leading-[1.9]">
            A Kashi Yatra is spiritually enriching and physically
            active. Light packing, modest clothing, comfortable
            footwear, hydration and personal medicines will make
            the journey smoother.
          </p>

        </div>

      </section>

      {/* ================================
          WHAT TO CARRY
      ================================= */}
      <section className="pb-[110px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1200px] mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* Clothing */}
            <div className="bg-[#FBF8F4] rounded-[20px] border border-[#C89A58]/20 p-6 md:p-8 shadow-[0_8px_28px_rgba(44,33,25,0.04)]">

              <button
                type="button"
                onClick={() => togglePackingGuide("clothing")}
                aria-expanded={Boolean(openPackingGuides.clothing)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <span className="flex items-center gap-3">

                  <span className="w-11 h-11 rounded-full bg-[#C56F2B]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#C56F2B] text-[25px]">
                      checkroom
                    </span>
                  </span>

                  <span className="font-display text-[27px]">
                    Clothing
                  </span>
                </span>

                <span className={`material-symbols-outlined text-[#C56F2B] transition-transform duration-300 ${openPackingGuides.clothing ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>

              {openPackingGuides.clothing && (
              <ul className="space-y-3 mt-7">

                {clothing.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 rounded-[12px] bg-white/75 px-4 py-3 text-[15px] text-[#5F554C] leading-[1.7]"
                  >

                    <span className="material-symbols-outlined text-[#C56F2B] text-[18px] mt-[3px] flex-shrink-0">
                      check_circle
                    </span>

                    <span>
                      {item}
                    </span>

                  </li>
                ))}

              </ul>
              )}

            </div>

            {/* Documents */}
            <div className="bg-[#FBF8F4] rounded-[20px] border border-[#C89A58]/20 p-6 md:p-8 shadow-[0_8px_28px_rgba(44,33,25,0.04)]">

              <button
                type="button"
                onClick={() => togglePackingGuide("documents")}
                aria-expanded={Boolean(openPackingGuides.documents)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <span className="flex items-center gap-3">

                  <span className="w-11 h-11 rounded-full bg-[#C56F2B]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#C56F2B] text-[25px]">
                      description
                    </span>
                  </span>

                  <span className="font-display text-[27px]">
                    Documents
                  </span>
                </span>

                <span className={`material-symbols-outlined text-[#C56F2B] transition-transform duration-300 ${openPackingGuides.documents ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>

              {openPackingGuides.documents && (
              <ul className="space-y-3 mt-7">

                {documents.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 rounded-[12px] bg-white/75 px-4 py-3 text-[15px] text-[#5F554C] leading-[1.7]"
                  >

                    <span className="material-symbols-outlined text-[#C56F2B] text-[18px] mt-[3px] flex-shrink-0">
                      check_circle
                    </span>

                    <span>
                      {item}
                    </span>

                  </li>
                ))}

              </ul>
              )}

            </div>

            {/* Personal Items */}
            <div className="bg-[#FBF8F4] rounded-[20px] border border-[#C89A58]/20 p-6 md:p-8 shadow-[0_8px_28px_rgba(44,33,25,0.04)]">

              <button
                type="button"
                onClick={() => togglePackingGuide("personal")}
                aria-expanded={Boolean(openPackingGuides.personal)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <span className="flex items-center gap-3">

                  <span className="w-11 h-11 rounded-full bg-[#C56F2B]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#C56F2B] text-[25px]">
                      backpack
                    </span>
                  </span>

                  <span className="font-display text-[27px]">
                    Personal Items
                  </span>
                </span>

                <span className={`material-symbols-outlined text-[#C56F2B] transition-transform duration-300 ${openPackingGuides.personal ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>

              {openPackingGuides.personal && (
              <ul className="space-y-3 mt-7">

                {personalItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 rounded-[12px] bg-white/75 px-4 py-3 text-[15px] text-[#5F554C] leading-[1.7]"
                  >

                    <span className="material-symbols-outlined text-[#C56F2B] text-[18px] mt-[3px] flex-shrink-0">
                      check_circle
                    </span>

                    <span>
                      {item}
                    </span>

                  </li>
                ))}

              </ul>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ================================
          PACKAGE INCLUDES AND EXCLUDES
      ================================= */}
      <section className="py-[110px] px-[5%] lg:px-[8%] bg-[#FDFBF8] border-y border-black/5">

        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-16">

            <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
              Package Details
            </span>

            <h2 className="font-display text-[42px] md:text-[55px] mt-4">
              What Is Included
            </h2>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Package Includes */}
            <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-8 md:p-10">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-[#C89A58]/10 flex items-center justify-center">

                  <span className="material-symbols-outlined text-[#C89A58] text-[28px]">
                    check_circle
                  </span>

                </div>

                <h3 className="font-display text-[30px]">
                  Package Includes
                </h3>

              </div>

              <div className="space-y-5 mt-8">

                {packageIncludes.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >

                    <span className="material-symbols-outlined text-[#C89A58] text-[21px] flex-shrink-0 mt-[2px]">
                      done
                    </span>

                    <p className="text-[#776D64] text-[15px] leading-[1.7]">
                      {item}
                    </p>

                  </div>
                ))}

              </div>

            </div>

            {/* Package Excludes */}
            <div className="bg-[#2C2119] rounded-[20px] p-8 md:p-10 text-white">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">

                  <span className="material-symbols-outlined text-[#E3B875] text-[28px]">
                    cancel
                  </span>

                </div>

                <h3 className="font-display text-[30px]">
                  Package Excludes
                </h3>

              </div>

              <div className="space-y-5 mt-8">

                {packageExcludes.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >

                    <span className="material-symbols-outlined text-[#E3B875] text-[21px] flex-shrink-0 mt-[2px]">
                      close
                    </span>

                    <p className="text-white/65 text-[15px] leading-[1.7]">
                      {item}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>

          <div className="mt-10 rounded-[22px] border border-[#C89A58]/25 bg-[#FFF9F0] p-7 md:p-10 shadow-[0_10px_35px_rgba(44,33,25,0.05)]">
            <div className="flex flex-col md:flex-row md:items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[#C56F2B] text-white flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[26px]">
                  event_busy
                </span>
              </div>

              <div>
                <h3 className="font-display text-[30px] md:text-[36px] text-[#2C2119]">
                  Refund and Cancellation Policy
                </h3>
                <p className="mt-3 max-w-[850px] text-[15px] md:text-[16px] leading-7 text-[#655A50]">
                  Our priority is to ensure you have a smooth and enjoyable journey. However, the following cancellation policy applies.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                ["60–41 days", "Full payment refunded", "Excluding the non-refundable deposit"],
                ["40–31 days", "75% refunded", "Excluding the non-refundable deposit"],
                ["30–18 days", "50% refunded", "Excluding the non-refundable deposit"]
              ].map(([period, refund, note]) => (
                <div
                  key={period}
                  className="rounded-[16px] border border-[#C89A58]/20 bg-white p-5"
                >
                  <p className="text-[12px] uppercase tracking-[0.16em] font-bold text-[#C56F2B]">
                    {period} before departure
                  </p>
                  <p className="mt-3 font-display text-[22px] text-[#2C2119]">
                    {refund}
                  </p>
                  <p className="mt-2 text-[13px] leading-6 text-[#776D64]">
                    {note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 rounded-[16px] bg-[#2C2119] p-6 md:p-7 text-white">
              {[
                "No refund will be issued when cancellation is requested less than 17 days before departure.",
                "Refunds will not be issued if you cannot attend the Yatra due to heavy rains, floods, traffic jams, vehicle breakdowns or personal medical emergencies.",
                "Your booking cannot be transferred to another date if you are unable to attend the Yatra.",
                "If the Yatra is cancelled due to natural calamities, political unrest or other circumstances beyond our control, the same cancellation policy will apply."
              ].map((policy) => (
                <div key={policy} className="flex gap-3">
                  <span className="material-symbols-outlined text-[#E3B875] text-[20px] flex-shrink-0 mt-1">
                    info
                  </span>
                  <p className="text-[14px] md:text-[15px] leading-7 text-white/75">
                    {policy}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>
            {/* ================================
          MEDICAL + IMPORTANT CONSIDERATIONS
      ================================= */}
      <section className="py-[110px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-16">

            <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
              Travel Safely
            </span>

            <h2 className="font-display text-[42px] md:text-[55px] mt-4">
              Health and Important Conditions
            </h2>

            <p className="text-[#776D64] max-w-[720px] mx-auto mt-5 leading-[1.8]">
              Proper preparation, personal medicines and awareness of
              local conditions will help make the journey safer and
              more comfortable.
            </p>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Medical Supplies */}
            <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-8 md:p-10">

              <span className="material-symbols-outlined text-[#C89A58] text-[42px]">
                medical_services
              </span>

              <h3 className="font-display text-[34px] mt-5">
                Medical Supplies
              </h3>

              <p className="text-[#776D64] text-[14px] leading-[1.8] mt-4">
                Carry sufficient medicines and basic health supplies
                throughout the journey.
              </p>

              <ul className="space-y-6 mt-8">

                {medicalSupplies.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-4"
                  >

                    <div className="w-9 h-9 rounded-full bg-[#C89A58]/10 flex items-center justify-center flex-shrink-0">

                      <span className="text-[#C89A58] text-[13px] font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>

                    <p className="text-[#776D64] text-[15px] leading-[1.8] pt-1">
                      {item}
                    </p>

                  </li>
                ))}

              </ul>

            </div>

            {/* Important Considerations */}
            <div className="bg-[#2C2119] rounded-[20px] p-8 md:p-10 text-white">

              <span className="material-symbols-outlined text-[#D5A760] text-[42px]">
                health_and_safety
              </span>

              <h3 className="font-display text-[34px] mt-5">
                Important Considerations
              </h3>

              <div className="space-y-7 mt-8">

                {considerations.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
                  >

                    <div className="flex items-start gap-4">

                      <span className="material-symbols-outlined text-[#E3B875] text-[23px] flex-shrink-0 mt-1">
                        priority_high
                      </span>

                      <div>

                        <h4 className="font-display text-[21px] text-[#E3B875]">
                          {item.title}
                        </h4>

                        <p className="text-white/65 text-[14px] leading-[1.8] mt-2">
                          {item.description}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================
          SENIOR CITIZEN SUPPORT
      ================================= */}
      <section className="pb-[110px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1100px] mx-auto">

          <div className="bg-[#FFF7EA] border border-[#C89A58]/20 rounded-[20px] p-8 md:p-10">

            <div className="flex flex-col md:flex-row items-start gap-6">

              <div className="w-14 h-14 rounded-full bg-[#C89A58]/10 flex items-center justify-center flex-shrink-0">

                <span className="material-symbols-outlined text-[#C89A58] text-[32px]">
                  elderly
                </span>

              </div>

              <div>

                <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold">
                  Care and Assistance
                </span>

                <h3 className="font-display text-[30px] mt-3">
                  Support for Senior Citizens
                </h3>

                <p className="text-[#776D64] text-[15px] leading-[1.9] mt-4">
                  Volunteers will assist yatris while navigating the
                  narrow lanes and crowded temple areas. Caretakers
                  will provide additional support to senior citizens
                  during travel, walking and temple visits.
                </p>

                <p className="text-[#776D64] text-[15px] leading-[1.9] mt-3">
                  Senior citizens should carry emergency contact details,
                  relevant medical history and all prescribed medicines
                  in sufficient quantity.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================
          ADDITIONAL TIPS
      ================================= */}
      <section className="py-[105px] px-[5%] lg:px-[8%] bg-[#FDFBF8] border-y border-black/5">

        <div className="max-w-[1100px] mx-auto">

          <div className="text-center mb-16">

            <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
              Travel Mindfully
            </span>

            <h2 className="font-display text-[42px] md:text-[55px] mt-4">
              Additional Tips
            </h2>

            <p className="text-[#776D64] max-w-[680px] mx-auto mt-5 leading-[1.8]">
              Simple precautions can make temple visits, transfers and
              ritual activities more peaceful and organised.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {additionalTips.map((tip, index) => (
              <div
                key={tip.title}
                className="group relative overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FBF3E8] border border-[#C89A58]/20 rounded-[20px] p-7 shadow-[0_8px_28px_rgba(44,33,25,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(44,33,25,0.09)]"
              >

                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C56F2B] via-[#E3B875] to-transparent" />

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-full bg-[#C56F2B] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(197,111,43,0.2)]">
                    <span className="material-symbols-outlined text-[24px]">
                      {tip.icon}
                    </span>
                  </div>

                  <span className="text-[#C89A58]/55 text-[12px] font-bold tracking-[0.18em]">
                    TIP {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <h3 className="font-display text-[23px] text-[#2C2119] mt-6">
                  {tip.title}
                </h3>

                <p className="text-[#655A50] text-[15px] leading-[1.8] mt-3">
                  {tip.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================================
          EXCEPTIONAL COST EXCLUSIONS
      ================================= */}
      <section className="py-[110px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1050px] mx-auto">

          <div className="text-center mb-14">

            <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
              Please Note
            </span>

            <button
              type="button"
              onClick={() => setShowExceptionalExclusions(!showExceptionalExclusions)}
              aria-expanded={showExceptionalExclusions}
              className="mx-auto mt-4 flex items-center justify-center gap-4 text-center"
            >
              <span className="font-display text-[42px] md:text-[55px]">
                Exceptional Cost Exclusions
              </span>
              <span className={`material-symbols-outlined flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#C56F2B] text-white transition-transform duration-300 ${showExceptionalExclusions ? "rotate-180" : ""}`}>
                expand_more
              </span>
            </button>

            <p className="text-[#655A50] text-[16px] md:text-[17px] max-w-[740px] mx-auto mt-5 leading-[1.9]">
              Costs caused by personal requirements, emergencies,
              delays or circumstances outside the organiser's control
              are not included in the package.
            </p>

          </div>

          {showExceptionalExclusions && (
          <div className="rounded-[22px] border border-[#C89A58]/20 bg-gradient-to-br from-[#FFF9F0] to-[#F8EFE3] p-6 md:p-10 shadow-[0_12px_38px_rgba(44,33,25,0.05)]">

            <div className="mb-7 flex items-center gap-4 rounded-[16px] bg-[#2C2119] px-5 py-4 text-white">
              <span className="material-symbols-outlined flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-[#E3B875]">
                receipt_long
              </span>
              <p className="text-[14px] md:text-[15px] leading-7 text-white/75">
                Please review these possible additional costs before confirming your Yatra.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {exclusions.map((item, index) => (
                <div
                  key={index}
                  className="group flex gap-4 rounded-[16px] border border-[#C89A58]/15 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C89A58]/35 hover:shadow-[0_10px_24px_rgba(44,33,25,0.06)]"
                >

                  <div className="w-10 h-10 rounded-full bg-[#C56F2B]/10 flex items-center justify-center flex-shrink-0">

                    <span className="material-symbols-outlined text-[#C56F2B] text-[20px]">
                      {[
                        "hotel",
                        "payments",
                        "directions_bus",
                        "medical_services",
                        "flight_takeoff",
                        "trending_up",
                        "thunderstorm",
                        "event_busy",
                        "add_circle"
                      ][index]}
                    </span>

                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#B9773F]">
                      Exclusion {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[#5F554C] text-[14px] md:text-[15px] leading-[1.8] mt-1.5">
                      {item}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>
          )}

        </div>

      </section>

      {/* ================================
          UNCONTROLLABLE SITUATIONS NOTICE
      ================================= */}
      <section className="pb-[110px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1050px] mx-auto">

          <div className="bg-[#2C2119] rounded-[20px] p-8 md:p-11 text-white">

            <div className="flex flex-col md:flex-row gap-6">

              <span className="material-symbols-outlined text-[#D5A760] text-[42px] flex-shrink-0">
                warning
              </span>

              <div>

                <h3 className="font-display text-[30px]">
                  Situations Beyond Organiser Control
                </h3>

                <p className="text-white/65 text-[15px] leading-[1.9] mt-4">
                  Expenses arising from weather, floods, river
                  conditions, natural disasters, technical failures,
                  delays, cancellations, strikes, riots, political
                  closures, lockdowns, war or any other uncontrollable
                  situation are not included in the package.
                </p>

                <p className="text-white/65 text-[15px] leading-[1.9] mt-4">
                  Any service not listed under the package inclusions
                  must be paid for by the traveller before or at the
                  time of use.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================
          IMPORTANT ITINERARY NOTE
      ================================= */}
      <section className="pb-[110px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1050px] mx-auto">

          <div className="border-l-4 border-[#C89A58] bg-[#FFF7EA] rounded-r-[18px] p-7 md:p-9">

            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold">
              Important
            </span>

            <p className="text-[#5F554C] text-[15px] md:text-[16px] leading-[1.9] mt-3">
              The itinerary is tentative and may be reordered for
              temple timings, traffic, crowd control, weather, local
              administration or the wellbeing of the group. The
              spiritual destinations will be covered as practically
              as conditions permit.
            </p>

          </div>

        </div>

      </section>
            {/* ================================
          FINAL CTA SECTION
      ================================= */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">

        <HeroBackground
          src="/lowpickashi.png"
          alt="Kashi Ganga Aarti"
          overlayClassName="bg-black/65"
        />

        <div className="relative z-10 w-full px-[5%] lg:px-[8%] py-20">

          <div className="max-w-[900px] mx-auto text-center">

            <span className="text-[12px] uppercase tracking-[0.28em] text-[#E3B875] font-semibold">
              Begin Your Sacred Journey
            </span>

            <h2 className="font-display text-[44px] md:text-[64px] leading-[1.1] text-white mt-5">
              Walk Through the Eternal City of Kashi
            </h2>

            <p className="text-white/75 text-[16px] md:text-[18px] leading-[1.9] max-w-[760px] mx-auto mt-6">
              Join a complete pilgrimage through Kashi, Prayagraj,
              Ayodhya, Naimisharanya and Gaya with guidance,
              accommodation, transport and spiritual support.
            </p>

            <button
              type="button"
              onClick={() => setShowYatraModal(true)}
              className="inline-flex items-center justify-center mt-9 h-[56px] px-9 rounded-[12px] bg-[#C56F2B] hover:bg-[#AF5F22] text-white text-[12px] uppercase font-bold tracking-widest transition-colors"
            >
              Register Now
            </button>

          </div>

        </div>

      </section>

      {/* ================================
          REGISTRATION MODAL
      ================================= */}
      {showYatraModal && (
        <div
          className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto"
          onClick={() => {
            if (!submitting) {
              setShowYatraModal(false);
            }
          }}
        >

          <div
            className="relative w-full max-w-[760px] bg-[#FDFBF8] rounded-[22px] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="relative bg-[#2C2119] px-7 md:px-10 py-8 text-white">

              <button
                type="button"
                onClick={() => {
                  if (!submitting) {
                    setShowYatraModal(false);
                  }
                }}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close registration modal"
              >
                <span className="material-symbols-outlined text-[22px]">
                  close
                </span>
              </button>

              <span className="text-[11px] uppercase tracking-[0.22em] text-[#E3B875] font-semibold">
                Sacred Walkouts
              </span>

              <h2 className="font-display text-[32px] md:text-[42px] mt-3">
                Register Now
              </h2>

              <p className="text-white/65 text-[14px] leading-[1.7] mt-3 max-w-[560px]">
                Share your details and our team will contact you with
                package availability, dates and travel information.
              </p>

            </div>

            {/* Registration Form */}
            <form
              onSubmit={handleSubmit}
              className="px-7 md:px-10 py-9"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="block text-[12px] uppercase tracking-[0.12em] text-[#5F554C] font-bold mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full h-[50px] px-4 rounded-[10px] bg-white border border-black/10 outline-none focus:border-[#C89A58] text-[14px]"
                  />

                </div>

                {/* Phone Number */}
                <div>

                  <label
                    htmlFor="phone"
                    className="block text-[12px] uppercase tracking-[0.12em] text-[#5F554C] font-bold mb-2"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full h-[50px] px-4 rounded-[10px] bg-white border border-black/10 outline-none focus:border-[#C89A58] text-[14px]"
                  />

                </div>

                {/* Number of Pilgrims */}
                <div>

                  <label
                    htmlFor="pilgrims"
                    className="block text-[12px] uppercase tracking-[0.12em] text-[#5F554C] font-bold mb-2"
                  >
                    Number of Pilgrims
                  </label>

                  <select
                    id="pilgrims"
                    name="pilgrims"
                    value={formData.pilgrims}
                    onChange={handleInputChange}
                    className="w-full h-[50px] px-4 rounded-[10px] bg-white border border-black/10 outline-none focus:border-[#C89A58] text-[14px]"
                  >
                    <option value="1">1 Pilgrim</option>
                    <option value="2">2 Pilgrims</option>
                    <option value="3">3 Pilgrims</option>
                    <option value="4">4 Pilgrims</option>
                    <option value="5">5 Pilgrims</option>
                    <option value="6">6 Pilgrims</option>
                    <option value="7">7 Pilgrims</option>
                    <option value="8">8 Pilgrims</option>
                    <option value="9">9 Pilgrims</option>
                    <option value="10">10 Pilgrims</option>
                  </select>

                </div>

                {/* Destination */}
                <div>

                  <label
                    htmlFor="destination"
                    className="block text-[12px] uppercase tracking-[0.12em] text-[#5F554C] font-bold mb-2"
                  >
                    Destination
                  </label>

                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                    className="w-full h-[50px] px-4 rounded-[10px] bg-white border border-black/10 outline-none focus:border-[#C89A58] text-[14px]"
                  >
                    <option value="Sampoorna Kashi Yatra">
                      Sampoorna Kashi Yatra
                    </option>

                    <option value="Kashi and Gaya">
                      Kashi and Gaya
                    </option>

                    <option value="Kashi, Ayodhya, Prayagraj and Naimisharanya">
                      Kashi, Ayodhya, Prayagraj and Naimisharanya
                    </option>

                    <option value="Custom Kashi Yatra">
                      Custom Kashi Yatra
                    </option>
                  </select>

                </div>

                {/* Senior Citizen */}
                <div>

                  <label
                    htmlFor="senior"
                    className="block text-[12px] uppercase tracking-[0.12em] text-[#5F554C] font-bold mb-2"
                  >
                    Senior Citizen Travelling?
                  </label>

                  <select
                    id="senior"
                    name="senior"
                    value={formData.senior}
                    onChange={handleInputChange}
                    className="w-full h-[50px] px-4 rounded-[10px] bg-white border border-black/10 outline-none focus:border-[#C89A58] text-[14px]"
                  >
                    <option value="No">
                      No
                    </option>

                    <option value="Yes">
                      Yes
                    </option>
                  </select>

                </div>

                {/* City */}
                <div>

                  <label
                    htmlFor="city"
                    className="block text-[12px] uppercase tracking-[0.12em] text-[#5F554C] font-bold mb-2"
                  >
                    Your City
                  </label>

                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    required
                    className="w-full h-[50px] px-4 rounded-[10px] bg-white border border-black/10 outline-none focus:border-[#C89A58] text-[14px]"
                  />

                </div>

                {/* Yatra Date */}
                <div className="md:col-span-2">

                  <label
                    htmlFor="dates"
                    className="block text-[12px] uppercase tracking-[0.12em] text-[#5F554C] font-bold mb-2"
                  >
                    Date
                  </label>

                  <input
                    id="dates"
                    type="text"
                    name="dates"
                    value={formData.dates}
                    readOnly
                    className="w-full h-[50px] px-4 rounded-[10px] bg-[#F5F0E9] border border-black/10 outline-none text-[14px] cursor-default"
                  />

                </div>

                {/* Special Requirements */}
                <div className="md:col-span-2">

                  <label
                    htmlFor="requirements"
                    className="block text-[12px] uppercase tracking-[0.12em] text-[#5F554C] font-bold mb-2"
                  >
                    Special Requirements
                  </label>

                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Mention medical conditions, walking support, food preferences or any other requirements"
                    rows="5"
                    className="w-full px-4 py-4 rounded-[10px] bg-white border border-black/10 outline-none focus:border-[#C89A58] text-[14px] resize-none"
                  />

                </div>

              </div>

              {/* Form Note */}
              <div className="mt-6 flex items-start gap-3 bg-[#FFF7EA] border border-[#C89A58]/20 rounded-[12px] p-4">

                <span className="material-symbols-outlined text-[#C89A58] text-[21px] flex-shrink-0">
                  info
                </span>

                <p className="text-[#776D64] text-[12px] leading-[1.7]">
                  Registration is an enquiry and does not automatically
                  confirm booking. Final confirmation depends on
                  availability, payment and organiser approval.
                </p>

              </div>

              {/* Form Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 mt-8">

                <button
                  type="button"
                  onClick={() => setShowYatraModal(false)}
                  disabled={submitting}
                  className="h-[50px] px-7 rounded-[10px] border border-black/10 text-[#5F554C] text-[12px] uppercase font-bold tracking-wider hover:bg-black/5 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="h-[50px] px-8 rounded-[10px] bg-[#C56F2B] hover:bg-[#AF5F22] text-white text-[12px] uppercase font-bold tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >

                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">
                        send
                      </span>
                      Submit Registration
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ================================
          FOOTER
      ================================= */}
      <Footer />

    </div>
  );
}
