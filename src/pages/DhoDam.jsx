import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroBackground from "../components/HeroBackground";

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { destinationDates } from "../data/yatraDates";

export default function DhoDham() {
  const [showYatraModal, setShowYatraModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [openCarryGuides, setOpenCarryGuides] = useState({});
  const [showImportantInformation, setShowImportantInformation] = useState(false);
  const [showAdditionalTips, setShowAdditionalTips] = useState(false);
  const [navHeight, setNavHeight] = useState(104);

  useEffect(() => {
    const navbar = document.getElementById("main-nav");
    if (!navbar) return undefined;

    const updateNavHeight = () => setNavHeight(navbar.getBoundingClientRect().height);
    const resizeObserver = new ResizeObserver(updateNavHeight);

    updateNavHeight();
    resizeObserver.observe(navbar);

    return () => resizeObserver.disconnect();
  }, []);

  const toggleCarryGuide = (guide) => {
    setOpenCarryGuides((current) => ({
      ...current,
      [guide]: !current[guide]
    }));
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pilgrims: "1",
    destination: "Dho Dham",
    senior: "No",
    city: "",
    dates: destinationDates["Dho-Dham"],
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
        destination: "Dho Dham",
        senior: "No",
        city: "",
        dates: destinationDates["Dho-Dham"],
        requirements: ""
      });

      setShowYatraModal(false);

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

  // -----------------------------
  // ITINERARY DATA
  // -----------------------------
  const itinerary = [
    {
      date: "Day 1",
      title: "Arriving Delhi",
      description:
        "Yatra starts from 8 PM — Heading towards Haridwar."
    },
    {
      date: "Day 2",
      title: "Arriving Haridwar",
      description:
        "Explore Haridwar — Experience the sacred Ganga Aarti — Overnight stay."
    },
    {
      date: "Day 3",
      title: "Departure to Tungnath",
      description:
        "Explore Tungnath and Chandrashila — Hotel stay."
    },
    {
      date: "Day 4",
      title: "Departure to Sonprayag",
      description:
        "Proceed towards Gaurikund — Trek to Kedarnath — Overnight stay."
    },
    {
      date: "Day 5",
      title: "Kedarnath",
      description:
        "Kedarnath Darshan — Visit Kalabhairav — Night trek down."
    },
    {
      date: "Day 6",
      title: "Departure to Bhadrinath",
      description:
        "Visit Dhari Devi — Sightseeing — Stay at Bhadrinath."
    },
    {
      date: "Day 7",
      title: "Bhadrinath",
      description:
        "Darshan — Explore Bhadrinath — Visit Mana Village — Overnight stay."
    },
    {
      date: "Day 8",
      title: "Departure to Rishikesh",
      description:
        "Explore Rishikesh — Gaming time — Shopping."
    },
    {
      date: "Day 9",
      title: "Departure to Delhi",
      description:
        "Explore Delhi (optional) — Stay."
    },
    {
      date: "Day 10",
      title: "Buffer Time",
      description:
        "Buffer time to accommodate road blockages, traffic or activities at the end of the journey."
    }
  ];

  // -----------------------------
  // CLOTHING
  // -----------------------------
  const clothing = [
    "Thermal Innerwear — Essential for layering against the cold.",
    "Woolen Clothing — Sweaters, jackets and socks.",
    "Waterproof and Windproof Jacket — Crucial for protection against rain and wind.",
    "Comfortable Trekking Pants — Durable and quick-drying.",
    "Raincoat or Poncho — For unexpected downpours.",
    "Woolen Cap, Gloves and Scarf — To protect against cold weather.",
    "Comfortable and Waterproof Trekking Shoes — With good grip for uneven terrain.",
    "Slippers or Sandals — For use at hotels."
  ];

  // -----------------------------
  // DOCUMENTS
  // -----------------------------
  const documents = [
    "Photo ID (Aadhaar Card, Voter ID) — Essential for registration and identification.",
    "Yatra Registration Documents — Mandatory.",
    "Medical Certificates — If applicable."
  ];

  // -----------------------------
  // PERSONAL ITEMS
  // -----------------------------
  const personalItems = [
    "Toiletries — Soap, shampoo, toothbrush, toothpaste etc.",
    "Sunscreen (SPF 50+) — To protect against strong UV rays.",
    "Lip Balm with SPF — To prevent chapped lips.",
    "Sunglasses — To shield your eyes from glare.",
    "Hand Sanitizer — For hygiene.",
    "Personal Medications — Any prescribed medications.",
    "First-Aid Kit — Bandages, Antiseptic cream, Pain relievers, Electrol Powder etc.",
    "Water Bottle — To stay hydrated.",
    "Torch or Headlamp — With extra batteries.",
    "Walking Stick or Trekking Pole — For support during treks.",
    "Power Bank — To keep electronic devices charged.",
    "Cash — ATMs may be scarce.",
    "Small Backpack — To carry essentials during treks."
  ];

  // -----------------------------
  // MEDICAL SUPPLIES
  // -----------------------------
  const medicalSupplies = [
    "Medications for altitude sickness, such as Diamox and painkillers.",
    "Anti-diarrheal medication.",
    "Any personal prescribed medications."
  ];

  // -----------------------------
  // IMPORTANT CONSIDERATIONS
  // -----------------------------
  const considerations = [
    {
      title: "Layering",
      description:
        "Dress in layers to adapt to changing temperatures."
    },
    {
      title: "Weight",
      description:
        "Pack light to make trek easier."
    },
    {
      title: "Weather",
      description:
        "Check the weather forecast before you go."
    },
    {
      title: "Altitude",
      description:
        "Be prepared for high altitudes and potential altitude sickness."
    },
    {
      title: "Physical Fitness",
      description:
        "The Kedarnath trek can be challenging, so ensure you are physically fit."
    }
  ];

  // -----------------------------
  // ADDITIONAL TIPS
  // -----------------------------
  const additionalTips = [
    {
      icon: "nutrition",
      title: "Keep Your Energy Up",
      description: "Carry dry fruits and energy bars for quick nourishment during travel and trekking."
    },
    {
      icon: "shield",
      title: "Protect Your Belongings",
      description: "Pack essential belongings in waterproof pouches or sealed bags to keep them dry."
    },
    {
      icon: "volunteer_activism",
      title: "Honour Local Traditions",
      description: "Respect local customs, temple practices and the traditions of the Himalayan communities."
    }
  ];

  // -----------------------------
  // EXCLUSIONS
  // -----------------------------
  const exclusions = [
    "Additional hotel accommodation and meals for extra stay in the event of delay of the trip due to any unforeseen conditions or situations.",
    "Any expenses of a personal nature.",
    "Transport services for any additional sightseeing service which is not mentioned in the itinerary.",
    "Emergency evacuation expenses.",
    "Emergency medical expenses in the event of hospitalization.",
    "Any additional expenses for returning early from the trip due to any personal reasons.",
    "Any additional expenses or increases in the cost of any trip item or service due to sudden hike in permit fee, hotel prices or prices for other trip services by concerned authorities, flight companies, hotel owners, vendors or due to any other reason beyond our control.",
    "Any additional expenses due to unforeseen circumstances such as weather, natural disasters, Acts of God, technical failures, flight delays or cancellations, permits, strikes, riots, political closures, lockdowns, war or any uncontrollable situations.",
    "Any service not listed in the package cost inclusions is not the company's liability and must be paid by the traveller in advance or at the time of use.",
    "Other costs that may have to be borne by travellers in extreme cases."
  ];


  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2C2119]">

      {/* ================================
          NAVBAR
      ================================= */}
      <Navbar />

      <nav
        aria-label="Breadcrumb"
        style={{ top: `${navHeight}px` }}
        className="fixed left-0 z-40 w-full border-y border-[#C89A58]/20 bg-[#FBF8F4]/95 px-[5%] py-2.5 shadow-sm backdrop-blur-md transition-[top] duration-700 md:left-[5%] md:w-auto md:rounded-full md:border md:px-3 md:py-2 md:shadow-[0_8px_30px_rgba(44,33,25,0.14)]"
      >
        <ol className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6E6258]">
          <li className="flex items-center">
            <img
              src="/cvrdhodham.png"
              alt=""
              aria-hidden="true"
              className="h-8 w-8 rounded-full border border-[#C89A58]/30 object-cover"
            />
          </li>
          <li>
            <Link to="/yatra#shrines-we-cover" className="transition-colors hover:text-[#C56F2B]">
              Yatra
            </Link>
          </li>
          <li aria-hidden="true" className="material-symbols-outlined text-[16px] text-[#C89A58]">
            chevron_right
          </li>
          <li aria-current="page" className="max-w-[55vw] truncate text-[#2C2119] md:max-w-none">
            Dho Dham Yatra
          </li>
        </ol>
      </nav>


      {/* ================================
          HERO SECTION
      ================================= */}
      <section className="relative min-h-screen flex items-end overflow-hidden">

        {/* Background */}
        <HeroBackground
          src="/cvrdhodham.png"
          mobileSrc="/mbdhodham.png"
          alt="Dho Dham"
          overlayClassName="bg-gradient-to-t from-black/80 via-black/40 to-black/10"
        />


        {/* Hero Content */}
        <div className="relative z-10 w-full px-[5%] lg:px-[8%] pb-40 md:pb-20">

          <div className="max-w-[850px]">

            <span className="text-[12px] uppercase tracking-[0.3em] text-[#E3B875] font-semibold">
              Sacred Yatra
            </span>

            <h1 className="font-display text-[56px] md:text-[80px] leading-none text-white mt-5">
              Dho Dham
            </h1>

            <p className="font-display italic text-[25px] md:text-[32px] text-white/90 mt-5">
              A Journey Through the Sacred Himalayas
            </p>

            <p className="font-body text-white/75 text-[16px] md:text-[18px] leading-[1.8] mt-6 max-w-[700px]">
              A focused two-shrine spiritual journey through the sacred
              Himalayan destinations of Kedarnath and Badrinath.
            </p>

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

            <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
              The Sacred Journey
            </span>

            <h2 className="font-display text-[42px] md:text-[55px] mt-4">
              Dho Dham Yatra
            </h2>

            <p className="font-body text-[#776D64] max-w-[700px] mx-auto mt-5 leading-[1.8]">
              A tentative 9 Nights / 10 Days journey from Delhi to Delhi,
              travelling through some of the most sacred regions of the Himalayas.
            </p>

          </div>


          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-8 text-center">

              <span className="material-symbols-outlined text-[#C89A58] text-[38px]">
                calendar_month
              </span>

              <h3 className="font-display text-[23px] mt-5">
                9 Nights / 10 Days
              </h3>

              <p className="text-[#776D64] text-[14px] mt-3">
                Delhi to Delhi
              </p>

            </div>


            <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-8 text-center">

              <span className="material-symbols-outlined text-[#C89A58] text-[38px]">
                flight_takeoff
              </span>

              <h3 className="font-display text-[23px] mt-5">
                Arrival Place
              </h3>

              <p className="text-[#776D64] text-[14px] mt-3">
                Delhi
              </p>

            </div>


            <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-8 text-center">

              <span className="material-symbols-outlined text-[#C89A58] text-[38px]">
                calendar_today
              </span>

              <h3 className="font-display text-[23px] mt-5">
                27 Sep – 06 Oct 2026
              </h3>

              <p className="text-[#776D64] text-[14px] mt-3">
                Yatra Dates
              </p>

            </div>

          </div>


          {/* Route */}
          <div className="mt-10 bg-[#FBF8F4] rounded-[20px] border border-black/5 px-5 py-8 md:px-8 md:py-12 text-center overflow-hidden">

            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold">
              Yatra Route
            </span>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-y-3 font-display text-[19px] sm:text-[22px] md:text-[28px] leading-[1.7]">
              {[
                "Delhi",
                "Haridwar",
                "Tungnath",
                "Gaurikund",
                "Kedarnath",
                "Bhadrinath",
                "Mana",
                "Rishikesh"
              ].map((place, index, route) => (
                <span key={place} className="inline-flex items-center whitespace-nowrap">
                  <span>{place}</span>
                  {index < route.length - 1 && (
                    <span className="text-[#C89A58] mx-2 md:mx-3">→</span>
                  )}
                </span>
              ))}
            </div>

          </div>

          <p className="font-display italic font-medium text-[20px] md:text-[24px] text-[#D87428] mt-6 text-center">
            This trip includes more than 12 Kshetras.
          </p>

          <div className="mt-8 rounded-[20px] border border-[#C89A58]/30 bg-[#FBF8F4] px-6 py-8 md:px-10 md:py-9">
            <h3 className="font-display text-center text-[27px] md:text-[31px] text-[#2C2119]">
              Highlights
            </h3>

            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {[
                ["🪔", "Witness the evening Ganga Aarti in Haridwar."],
                ["🌊", "Visit the sacred river confluences of Devprayag and Rudraprayag."],
                ["🌺", "Step into Dhari Devi Temple, the powerful Devi of Dev Bhumi."],
                ["🛕", "Visit the sacred Tungnath Temple."],
                ["🔱", "Experience your true self at Kedarnath."],
                ["🙏", "Take a dip in the Tapt Kund at Badrinath before entering the temple."],
                ["🏔️", "Explore Mana, the first Indian village before the Tibetan border."],
                ["🛍️", "Enjoy shopping in Rishikesh."]
              ].map(([icon, highlight]) => (
                <div key={highlight} className="flex items-start gap-3">
                  <span aria-hidden="true" className="flex-shrink-0 text-[21px] leading-7">
                    {icon}
                  </span>
                  <p className="text-[14px] md:text-[15px] font-medium leading-7 text-[#5F554C]">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>


      {/* ================================
          ITINERARY
      ================================= */}
      <section className="py-[110px] px-[5%] lg:px-[8%] bg-[#FDFBF8] border-y border-black/5">

        <div className="max-w-[1100px] mx-auto">

          <button
            type="button"
            onClick={() => setShowItinerary(!showItinerary)}
            aria-expanded={showItinerary}
            className="w-full rounded-[20px] border border-[#C89A58]/25 bg-[#FBF8F4] px-6 py-7 md:px-9 md:py-8 flex items-center justify-between gap-6 text-left shadow-[0_8px_28px_rgba(44,33,25,0.04)] hover:border-[#C89A58]/50 transition-colors"
          >
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#C89A58] font-bold">
                Journey Through The Himalayas
              </span>
              <h2 className="font-display text-[30px] md:text-[42px] text-[#2C2119] mt-1">
                Yatra Itinerary
              </h2>
            </div>

            <span className={`material-symbols-outlined flex-shrink-0 w-11 h-11 rounded-full bg-[#C56F2B] text-white flex items-center justify-center transition-transform duration-300 ${showItinerary ? "rotate-180" : ""}`}>
              expand_more
            </span>
          </button>


          {showItinerary && (
          <div className="relative mt-14">

            {/* Timeline Line */}
            <div className="absolute left-[24px] md:left-[120px] top-0 bottom-0 w-[1px] bg-[#C89A58]/30" />


            <div className="flex flex-col gap-12">

              {itinerary.map((item, index) => (

                <div
                  key={index}
                  className="relative flex gap-8 md:gap-16"
                >

                  {/* Date */}
                  <div className="w-[50px] md:w-[100px] flex-shrink-0 text-right">

                    <span className="text-[12px] md:text-[14px] font-bold text-[#C89A58]">
                      {item.date}
                    </span>

                  </div>


                  {/* Timeline Dot */}
                  <div className="relative z-10 w-[10px] h-[10px] mt-1 rounded-full bg-[#C89A58] ring-8 ring-[#FDFBF8] flex-shrink-0" />


                  {/* Content */}
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

        </div>

      </section>


      {/* ================================
          OPTIONAL PLACES
      ================================= */}
      <section className="py-[100px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1100px] mx-auto text-center">

          <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
            Explore More
          </span>

          <h2 className="font-display text-[42px] mt-4">
            Optional Places
          </h2>

          <p className="text-[#655A50] text-[16px] max-w-[680px] mx-auto mt-5 leading-[1.8]">
            Enrich your journey with these optional sacred destinations, subject to available time and local conditions.
          </p>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">

            {[
              {
                name: "Triyuginarayan",
                icon: "local_fire_department",
                description: "Visit the sacred temple associated with the divine wedding of Shiva and Parvati."
              },
              {
                name: "Vasudhara Falls",
                icon: "water",
                description: "Experience the serene Himalayan waterfall flowing through the mountains near Mana."
              },
              {
                name: "Mathura",
                icon: "temple_hindu",
                description: "Explore the sacred birthplace of Sri Krishna and its timeless devotional atmosphere."
              }
            ].map((place, index) => (

              <div
                key={place.name}
                className="group relative overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FBF3E8] border border-[#C89A58]/20 rounded-[20px] p-7 text-left shadow-[0_8px_28px_rgba(44,33,25,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(44,33,25,0.09)]"
              >

                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C56F2B] via-[#E3B875] to-transparent" />

                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-full bg-[#C56F2B] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(197,111,43,0.2)]">
                    <span className="material-symbols-outlined text-[25px]">
                      {place.icon}
                    </span>
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#B9773F] font-bold">
                    Optional {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-display text-[22px] mt-4">
                  {place.name}
                </h3>

                <p className="text-[#655A50] text-[14px] leading-[1.8] mt-3">
                  {place.description}
                </p>

              </div>

            ))}

          </div>


        </div>

      </section>


      {/* ================================
          PREPARATION
      ================================= */}
      <section className="py-[110px] px-[5%] lg:px-[8%] bg-[#FDFBF8] border-y border-black/5">

        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-16">

            <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
              Prepare For The Journey
            </span>

            <h2 className="font-display text-[42px] md:text-[55px] mt-4">
              What To Carry
            </h2>

            <p className="text-[#776D64] max-w-[650px] mx-auto mt-5 leading-[1.8]">
              The weather in the Himalayas can be unpredictable.
              Layering and preparedness are essential for a comfortable
              and safe spiritual journey.
            </p>

          </div>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* Clothing */}
            <div className="bg-[#FBF8F4] rounded-[20px] border border-black/5 p-8">

              <button
                type="button"
                onClick={() => toggleCarryGuide("clothing")}
                aria-expanded={Boolean(openCarryGuides.clothing)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <span className="flex items-center gap-3">

                  <span className="material-symbols-outlined text-[#C89A58] text-[32px]">
                    checkroom
                  </span>

                  <span className="font-display text-[27px]">
                    Clothing
                  </span>
                </span>

                <span className={`material-symbols-outlined text-[#C56F2B] transition-transform duration-300 ${openCarryGuides.clothing ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>


              {openCarryGuides.clothing && (
              <ul className="space-y-4 mt-7">

                {clothing.map((item, index) => (

                  <li
                    key={index}
                    className="flex gap-3 text-[14px] text-[#776D64] leading-[1.6]"
                  >

                    <span className="text-[#C89A58] mt-1">
                      •
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
            <div className="bg-[#FBF8F4] rounded-[20px] border border-black/5 p-8">

              <button
                type="button"
                onClick={() => toggleCarryGuide("documents")}
                aria-expanded={Boolean(openCarryGuides.documents)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <span className="flex items-center gap-3">

                  <span className="material-symbols-outlined text-[#C89A58] text-[32px]">
                    description
                  </span>

                  <span className="font-display text-[27px]">
                    Documents
                  </span>
                </span>

                <span className={`material-symbols-outlined text-[#C56F2B] transition-transform duration-300 ${openCarryGuides.documents ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>


              {openCarryGuides.documents && (
              <ul className="space-y-4 mt-7">

                {documents.map((item, index) => (

                  <li
                    key={index}
                    className="flex gap-3 text-[14px] text-[#776D64] leading-[1.6]"
                  >

                    <span className="text-[#C89A58] mt-1">
                      •
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
            <div className="bg-[#FBF8F4] rounded-[20px] border border-black/5 p-8">

              <button
                type="button"
                onClick={() => toggleCarryGuide("personal")}
                aria-expanded={Boolean(openCarryGuides.personal)}
                className="w-full flex items-center justify-between gap-4 text-left"
              >
                <span className="flex items-center gap-3">

                  <span className="material-symbols-outlined text-[#C89A58] text-[32px]">
                    backpack
                  </span>

                  <span className="font-display text-[27px]">
                    Personal Items
                  </span>
                </span>

                <span className={`material-symbols-outlined text-[#C56F2B] transition-transform duration-300 ${openCarryGuides.personal ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>


              {openCarryGuides.personal && (
              <ul className="space-y-4 mt-7">

                {personalItems.map((item, index) => (

                  <li
                    key={index}
                    className="flex gap-3 text-[14px] text-[#776D64] leading-[1.6]"
                  >

                    <span className="text-[#C89A58] mt-1">
                      •
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


      {/* REFUND AND CANCELLATION POLICY */}
      <section className="pb-[110px] px-[5%] lg:px-[8%] bg-[#FDFBF8]">
        <div className="max-w-[1200px] mx-auto">
          <div className="rounded-[22px] border border-[#C89A58]/25 bg-[#FFF9F0] p-7 md:p-10 shadow-[0_10px_35px_rgba(44,33,25,0.05)]">
            <div className="flex flex-col md:flex-row md:items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[#C56F2B] text-white flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[26px]">
                  event_busy
                </span>
              </div>

              <div>
                <h2 className="font-display text-[30px] md:text-[36px] text-[#2C2119]">
                  Refund and Cancellation Policy
                </h2>
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
                <div key={period} className="rounded-[16px] border border-[#C89A58]/20 bg-white p-5">
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
          MEDICAL + CONSIDERATIONS
      ================================= */}
      <section className="py-[110px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">


          {/* Medical */}
          <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-10">

            <span className="material-symbols-outlined text-[#C89A58] text-[40px]">
              medical_services
            </span>

            <h2 className="font-display text-[35px] mt-5">
              Medical Supplies
            </h2>

            <ul className="space-y-5 mt-8">

              {medicalSupplies.map((item, index) => (

                <li
                  key={index}
                  className="flex gap-4 text-[#776D64] text-[15px] leading-[1.7]"
                >

                  <span className="text-[#C89A58]">
                    0{index + 1}
                  </span>

                  <span>
                    {item}
                  </span>

                </li>

              ))}

            </ul>

          </div>


          {/* Important Considerations */}
          <div className="bg-[#2C2119] rounded-[20px] p-10 text-white">

            <span className="material-symbols-outlined text-[#D5A760] text-[40px]">
              info
            </span>

            <h2 className="font-display text-[35px] mt-5">
              Important Considerations
            </h2>

            <div className="space-y-6 mt-8">

              {considerations.map((item, index) => (

                <div key={index}>

                  <h3 className="font-display text-[20px] text-[#E3B875]">
                    {item.title}
                  </h3>

                  <p className="text-white/65 text-[14px] leading-[1.7] mt-1">
                    {item.description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================================
          ADDITIONAL TIPS
      ================================= */}
      <section className="py-[100px] px-[5%] lg:px-[8%] bg-[#FDFBF8]">

        <div className="max-w-[1000px] mx-auto text-center">

          <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
            Travel Mindfully
          </span>

          <button
            type="button"
            onClick={() => setShowAdditionalTips(!showAdditionalTips)}
            aria-expanded={showAdditionalTips}
            className="mx-auto mt-4 flex items-center justify-center gap-4 text-center"
          >
            <span className="font-display text-[42px]">
              Additional Tips
            </span>
            <span className={`material-symbols-outlined flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#C56F2B] text-white transition-transform duration-300 ${showAdditionalTips ? "rotate-180" : ""}`}>
              expand_more
            </span>
          </button>

          <p className="text-[#655A50] text-[16px] max-w-[650px] mx-auto mt-5 leading-[1.8]">
            A few thoughtful preparations can make your Himalayan Yatra safer, lighter and more meaningful.
          </p>

          {showAdditionalTips && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

            {additionalTips.map((tip, index) => (

              <div
                key={tip.title}
                className="group relative overflow-hidden bg-gradient-to-br from-[#FFF9F0] to-[#FBF3E8] border border-[#C89A58]/20 rounded-[20px] p-7 text-left shadow-[0_8px_28px_rgba(44,33,25,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(44,33,25,0.09)]"
              >

                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C56F2B] via-[#E3B875] to-transparent" />

                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-[#C56F2B] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(197,111,43,0.2)]">
                    <span className="material-symbols-outlined text-[24px]">
                      {tip.icon}
                    </span>
                  </div>

                  <span className="text-[#C89A58]/60 text-[11px] font-bold tracking-[0.18em]">
                    TIP {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-display text-[23px] text-[#2C2119] mt-6">
                  {tip.title}
                </h3>

                <p className="text-[#655A50] text-[15px] leading-[1.8] mt-3">
                  {tip.description}
                </p>

              </div>

            ))}

          </div>
          )}

        </div>

      </section>


      {/* ================================
          EXCLUSIONS
      ================================= */}
      <section className="py-[110px] px-[5%] lg:px-[8%]">

        <div className="max-w-[1000px] mx-auto">

          <div className="text-center mb-14">

            <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
              Please Note
            </span>

            <button
              type="button"
              onClick={() => setShowImportantInformation(!showImportantInformation)}
              aria-expanded={showImportantInformation}
              className="mx-auto mt-4 flex items-center justify-center gap-4 text-center"
            >
              <span className="font-display text-[42px]">
                Important Information
              </span>
              <span className={`material-symbols-outlined flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#C56F2B] text-white transition-transform duration-300 ${showImportantInformation ? "rotate-180" : ""}`}>
                expand_more
              </span>
            </button>

            <p className="text-[#655A50] text-[16px] max-w-[700px] mx-auto mt-5 leading-[1.8]">
              Please review these possible additional expenses before confirming your Himalayan Yatra.
            </p>

          </div>


          {showImportantInformation && (
          <div className="rounded-[22px] border border-[#C89A58]/20 bg-gradient-to-br from-[#FFF9F0] to-[#F8EFE3] p-6 md:p-10 shadow-[0_12px_38px_rgba(44,33,25,0.05)]">

            <div className="mb-7 flex flex-col sm:flex-row sm:items-center gap-4 rounded-[16px] bg-[#2C2119] px-5 py-5 text-white">
              <span className="material-symbols-outlined flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-[#E3B875]">
                receipt_long
              </span>

              <div>
                <h3 className="font-display text-[26px] md:text-[30px]">
                  Expenses Not Included
                </h3>
                <p className="text-white/65 text-[13px] md:text-[14px] mt-1 leading-6">
                  These costs may apply depending on personal needs, emergencies or circumstances beyond the organiser’s control.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {exclusions.map((item, index) => (

                <div
                  key={index}
                  className="group flex gap-4 rounded-[16px] border border-[#C89A58]/15 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C89A58]/35 hover:shadow-[0_10px_24px_rgba(44,33,25,0.06)]"
                >

                  <span className="w-10 h-10 rounded-full bg-[#C56F2B]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#C56F2B] text-[20px]">
                      {[
                        "hotel",
                        "payments",
                        "directions_bus",
                        "emergency",
                        "medical_services",
                        "flight_takeoff",
                        "trending_up",
                        "thunderstorm",
                        "add_circle",
                        "warning"
                      ][index]}
                    </span>
                  </span>

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#B9773F]">
                      Exclusion {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] md:text-[15px] text-[#5F554C] leading-[1.8] mt-1.5">
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
          FINAL CTA
      ================================= */}
      <section className="relative py-[130px] px-[5%] lg:px-[8%] overflow-hidden">

        <HeroBackground
          src="/yatralast1.jpg"
          alt="Sacred Himalayan Journey"
          overlayClassName="bg-black/65"
        />


        <div className="relative z-10 max-w-[800px] mx-auto text-center">

          <span className="text-[12px] uppercase tracking-[0.3em] text-[#E3B875] font-semibold">
            Walk The Sacred Path
          </span>

          <h2 className="font-display text-[45px] md:text-[60px] text-white mt-5">
            Begin Your Dho Dham Yatra
          </h2>

          <p className="text-white/75 text-[16px] leading-[1.8] max-w-[600px] mx-auto mt-6">
            Walk Ancient Paths, Experience Sacred Temples and Discover
            the Stillness that lies within the Himalayan journey.
          </p>


         <button
  type="button"
  onClick={() => setShowYatraModal(true)}
  className="inline-flex items-center justify-center mt-10 h-[56px] px-10 rounded-[12px] bg-[#C56F2B] hover:bg-[#b06124] text-white text-[13px] uppercase font-bold tracking-widest transition-colors"
>
  Register Now
</button>

        </div>

      </section>
{/* YATRA REGISTRATION MODAL */}
{showYatraModal && (
  <div
    className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={() => setShowYatraModal(false)}
  >
    <div
      className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FBF8F4] rounded-[20px] shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >

      {/* Close Button */}
      <button
        type="button"
        onClick={() => setShowYatraModal(false)}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#2C2119] transition-colors"
      >
        <span className="material-symbols-outlined">
          close
        </span>
      </button>

      {/* Modal Header */}
      <div className="px-8 pt-10 pb-6 border-b border-black/5">
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-[#C89A58] text-[28px]">
            filter_vintage
          </span>

          <h2 className="font-display text-[30px] text-[#2C2119]">
            Register for Dho Dham Yatra
          </h2>
        </div>

        <p className="text-[14px] leading-6 text-[#776D64]">
          Fill in your details below and our team will get in touch
          with you shortly regarding the Dho Dham Yatra.
        </p>
      </div>

      {/* Registration Form */}
      <form
        className="p-8 flex flex-col gap-6"
        onSubmit={handleSubmit}
      >

        {/* Full Name */}
        <div>
          <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your full name"
            className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors"
          />
        </div>

        {/* Phone + Pilgrims */}
        <div className="flex flex-col sm:flex-row gap-6">

          <div className="flex-1">
            <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors"
            />
          </div>

          <div className="flex-1">
            <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">
              No. of Pilgrims
            </label>

            <input
              type="number"
              name="pilgrims"
              required
              min="1"
              value={formData.pilgrims}
              onChange={handleInputChange}
              className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors"
            />
          </div>

        </div>

        {/* Destination */}
        <div>
          <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">
            Destination
          </label>

          <input
            type="text"
            name="destination"
            value="Dho Dham"
            readOnly
            className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-[#F3EEE7] text-[#2C2119] font-body text-[15px] outline-none cursor-not-allowed"
          />
        </div>

        {/* Senior Citizen */}
        <div>
          <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">
            Senior Citizen in Group?
          </label>

          <div className="relative">
            <select
              name="senior"
              required
              value={formData.senior}
              onChange={handleInputChange}
              className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors appearance-none cursor-pointer"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>

            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#776D64]">
              expand_more
            </span>
          </div>
        </div>

        {/* City */}
        <div>
          <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">
            City / State
          </label>

          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Your city and state"
            className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors"
          />
        </div>

        {/* Yatra Date */}
        <div>
          <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">
            Date
          </label>

          <input
            type="text"
            name="dates"
            value={formData.dates}
            readOnly
            className="w-full h-[56px] px-4 rounded-[12px] border border-black/[0.08] bg-[#F5F0E9] text-[#2C2119] font-body text-[15px] outline-none cursor-default"
          />
        </div>

        {/* Special Requirements */}
        <div>
          <label className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#7A5736] mb-2 block">
            Special Requirements
          </label>

          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            placeholder="Any dietary needs, mobility concerns or other requirements..."
            className="w-full h-[120px] p-4 rounded-[12px] border border-black/[0.08] bg-white text-[#2C2119] font-body text-[15px] outline-none focus:border-[#C89A58] transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full h-[58px] rounded-[12px] text-[13px] uppercase font-bold tracking-widest text-white bg-[#C56F2B] hover:bg-[#b06124] disabled:bg-[#C56F2B]/60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
              Register for Dho Dham Yatra
            </span>
          )}
        </button>

      </form>
    </div>
  </div>
)}

      {/* FOOTER */}
      
      <Footer />

    </div>
  );
}
