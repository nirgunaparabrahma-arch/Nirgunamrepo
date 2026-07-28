import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export default function KasiYatra() {
  const [showYatraModal, setShowYatraModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pilgrims: "1",
    destination: "Sampoorna Kashi Yatra",
    senior: "No",
    city: "",
    dates: "",
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
        dates: "",
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
      title: "Arrival in Varanasi",
      description:
        "Arrive in Varanasi, check in and attend the orientation. In the evening, experience the Ganga Aarti at Dashashwamedh Ghat, followed by a gentle heritage walk."
    },
    {
      date: "Day 2",
      title: "Kashi Temple Darshan",
      description:
        "Begin with an early morning Ganga boat ride. Visit Kashi Vishwanath Temple, Annapurna Devi, Vishalakshi Devi, Kalabhairav and nearby sacred temples."
    },
    {
      date: "Day 3",
      title: "Pancha Kroshi and Kashi Kshetras",
      description:
        "Visit important Kashi kshetras including Sankat Mochan, Durga Kund, Tulsi Manas Mandir and BHU Vishwanath. Spend the evening near the ghats."
    },
    {
      date: "Day 4",
      title: "Sarnath",
      description:
        "Visit Dhamek Stupa, Mulagandha Kuti Vihar and the museum area. Return to Varanasi for spiritual activities."
    },
    {
      date: "Day 5",
      title: "Prayagraj",
      description:
        "Depart for Prayagraj. Take a sacred bath at Triveni Sangam and attend puja. Visit Bade Hanuman Mandir, Alopi Devi and other local temples."
    },
    {
      date: "Day 6",
      title: "Ayodhya",
      description:
        "Proceed to Ayodhya. Visit Shri Ram Janmabhoomi, Hanuman Garhi and Kanak Bhawan. Attend the evening Saryu Aarti and stay overnight."
    },
    {
      date: "Day 7",
      title: "Naimisharanya",
      description:
        "Depart for Naimisharanya. Visit Chakra Tirth, Lalita Devi Temple, Vyas Gaddi and Dadhichi Kund before continuing to the return-route stay."
    },
    {
      date: "Day 8",
      title: "Gaya",
      description:
        "Travel to Gaya. Visit Vishnupad Temple and perform rituals near the Falgu River. Optional Pind Daan can be arranged in advance."
    },
    {
      date: "Day 9",
      title: "Return to Varanasi",
      description:
        "Return to Varanasi. Enjoy free time for personal darshan, shopping, boating or additional temple visits. Attend the closing satsang."
    },
    {
      date: "Day 10",
      title: "Departure from Varanasi",
      description:
        "Buffer time is provided for traffic, rituals or pending darshan. Check out and depart from Varanasi."
    }
  ];

  // -----------------------------
  // PACKAGE OPTIONS
  // -----------------------------
  const packageOptions = [
    {
      duration: "3 Nights / 4 Days",
      price: "₹8,000"
    },
    {
      duration: "5 Nights / 6 Days",
      price: "₹12,000"
    },
    {
      duration: "9 Nights / 10 Days",
      price: "₹15,000"
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
    "Local transport to important temples and itinerary locations.",
    "AC triple-sharing accommodation.",
    "Two meals a day.",
    "Guidance and caretaker support."
  ];

  // -----------------------------
  // PACKAGE EXCLUDES
  // -----------------------------
  const packageExcludes = [
    "Train or flight tickets.",
    "Darshan or special-entry tickets.",
    "Snacks, packaged water bottles and personal purchases.",
    "Boating and optional ritual charges.",
    "Medical emergency expenses."
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
    "Begin early to avoid heavy crowds and daytime heat.",
    "Keep footwear simple and identifiable.",
    "Avoid carrying valuables into crowded temple areas.",
    "Drink safe water and eat light food.",
    "Remain with the group during transfers.",
    "Use only authorised priests, guides, boats and transport verified by the organisers."
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
      <section className="relative min-h-[650px] flex items-end overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="/kashihero.jpg"
            alt="Sampoorna Kashi Yatra"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
        </div>

        <div className="relative z-10 w-full px-[5%] lg:px-[8%] pb-20">

          <div className="max-w-[900px]">

            <span className="text-[12px] uppercase tracking-[0.3em] text-[#E3B875] font-semibold">
              Sacred Walkouts
            </span>

            <h1 className="font-display text-[50px] md:text-[78px] leading-[1.05] text-white mt-5">
              Sampoorna Kashi Yatra
            </h1>

            <p className="font-display italic text-[23px] md:text-[32px] text-white/90 mt-5">
              Where the Soul Finds Its Serenity
            </p>

            <p className="font-body text-white/75 text-[16px] md:text-[18px] leading-[1.8] mt-6 max-w-[760px]">
              A complete sacred circuit covering Kashi darshan,
              Ganga rituals, ancestral offerings and the most revered
              nearby kshetras.
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
              Sampoorna Kashi Yatra
            </h2>

            <p className="font-body text-[#776D64] max-w-[760px] mx-auto mt-5 leading-[1.8]">
              A tentative 9 Nights / 10 Days pilgrimage beginning
              and ending in Varanasi, covering Kashi, Sarnath,
              Prayagraj, Ayodhya, Naimisharanya and Gaya.
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
                Complete sacred circuit
              </p>

            </div>

            <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-8 text-center">

              <span className="material-symbols-outlined text-[#C89A58] text-[38px]">
                location_on
              </span>

              <h3 className="font-display text-[23px] mt-5">
                Varanasi
              </h3>

              <p className="text-[#776D64] text-[14px] mt-3">
                Arrival and departure
              </p>

            </div>

            <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-8 text-center">

              <span className="material-symbols-outlined text-[#C89A58] text-[38px]">
                currency_rupee
              </span>

              <h3 className="font-display text-[23px] mt-5">
                ₹15,000
              </h3>

              <p className="text-[#776D64] text-[14px] mt-3">
                Package price
              </p>

            </div>

          </div>

          {/* Route */}
          <div className="mt-10 bg-[#FBF8F4] rounded-[20px] border border-black/5 py-8 px-6 md:py-12 md:px-10 text-center">

            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89A58] font-bold">
              Yatra Route
            </span>

            <p className="font-display text-[20px] md:text-[27px] mt-5 leading-[1.8]">
              Varanasi
              <span className="text-[#C89A58] mx-2 md:mx-3">→</span>
              Sarnath
              <span className="text-[#C89A58] mx-2 md:mx-3">→</span>
              Prayagraj
              <span className="text-[#C89A58] mx-2 md:mx-3">→</span>
              Ayodhya
              <span className="text-[#C89A58] mx-2 md:mx-3">→</span>
              Naimisharanya
              <span className="text-[#C89A58] mx-2 md:mx-3">→</span>
              Gaya
              <span className="text-[#C89A58] mx-2 md:mx-3">→</span>
              Varanasi
            </p>

          </div>

          {/* Package Options */}
          <div className="mt-10">

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
                <div
                  key={index}
                  className="bg-[#FBF8F4] border border-black/5 rounded-[18px] p-7 text-center"
                >
                  <span className="material-symbols-outlined text-[#C89A58] text-[32px]">
                    temple_hindu
                  </span>

                  <h4 className="font-display text-[22px] mt-4">
                    {packageItem.duration}
                  </h4>

                  <p className="text-[#C56F2B] font-bold text-[18px] mt-3">
                    {packageItem.price}
                  </p>
                </div>
              ))}

            </div>

          </div>

          {/* Custom Trip Note */}
          <div className="mt-10 bg-[#2C2119] rounded-[20px] p-8 md:p-10 text-center">

            <span className="material-symbols-outlined text-[#D5A760] text-[38px]">
              travel_explore
            </span>

            <h3 className="font-display text-[28px] text-white mt-4">
              Customise Your Trip
            </h3>

            <p className="text-white/70 text-[15px] leading-[1.8] mt-4">
              Kashi + Ayodhya + Naimisharanya + Prayagraj
              <span className="text-[#D5A760] mx-3">|</span>
              Kashi + Gaya
            </p>

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
          ITINERARY
      ================================= */}
      <section className="py-[110px] px-[5%] lg:px-[8%] bg-[#FDFBF8] border-y border-black/5">

        <div className="max-w-[1100px] mx-auto">

          <div className="text-center mb-20">

            <span className="text-[12px] uppercase tracking-[0.25em] text-[#C89A58] font-semibold">
              Sacred Circuit
            </span>

            <h2 className="font-display text-[42px] md:text-[55px] mt-4">
              Yatra Itinerary
            </h2>

            <p className="text-[#776D64] max-w-[700px] mx-auto mt-5 leading-[1.8]">
              A tentative ten-day spiritual journey through Kashi
              and the most revered nearby sacred destinations.
            </p>

          </div>

          <div className="relative">

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

          <p className="font-body text-[#776D64] max-w-[760px] mx-auto mt-6 leading-[1.9]">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Clothing */}
            <div className="bg-[#FBF8F4] rounded-[20px] border border-black/5 p-8">

              <div className="flex items-center gap-3 mb-7">

                <span className="material-symbols-outlined text-[#C89A58] text-[32px]">
                  checkroom
                </span>

                <h3 className="font-display text-[27px]">
                  Clothing
                </h3>

              </div>

              <ul className="space-y-4">

                {clothing.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-[14px] text-[#776D64] leading-[1.7]"
                  >

                    <span className="text-[#C89A58] mt-1 flex-shrink-0">
                      •
                    </span>

                    <span>
                      {item}
                    </span>

                  </li>
                ))}

              </ul>

            </div>

            {/* Documents */}
            <div className="bg-[#FBF8F4] rounded-[20px] border border-black/5 p-8">

              <div className="flex items-center gap-3 mb-7">

                <span className="material-symbols-outlined text-[#C89A58] text-[32px]">
                  description
                </span>

                <h3 className="font-display text-[27px]">
                  Documents
                </h3>

              </div>

              <ul className="space-y-4">

                {documents.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-[14px] text-[#776D64] leading-[1.7]"
                  >

                    <span className="text-[#C89A58] mt-1 flex-shrink-0">
                      •
                    </span>

                    <span>
                      {item}
                    </span>

                  </li>
                ))}

              </ul>

            </div>

            {/* Personal Items */}
            <div className="bg-[#FBF8F4] rounded-[20px] border border-black/5 p-8">

              <div className="flex items-center gap-3 mb-7">

                <span className="material-symbols-outlined text-[#C89A58] text-[32px]">
                  backpack
                </span>

                <h3 className="font-display text-[27px]">
                  Personal Items
                </h3>

              </div>

              <ul className="space-y-4">

                {personalItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-[14px] text-[#776D64] leading-[1.7]"
                  >

                    <span className="text-[#C89A58] mt-1 flex-shrink-0">
                      •
                    </span>

                    <span>
                      {item}
                    </span>

                  </li>
                ))}

              </ul>

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
                key={index}
                className="bg-[#FBF8F4] border border-black/5 rounded-[18px] p-7"
              >

                <div className="flex items-center justify-between">

                  <div className="w-11 h-11 rounded-full bg-[#C89A58]/10 flex items-center justify-center">

                    <span className="text-[#C89A58] text-[14px] font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>

                  <span className="material-symbols-outlined text-[#C89A58]/50 text-[28px]">
                    temple_hindu
                  </span>

                </div>

                <p className="text-[#776D64] text-[15px] leading-[1.8] mt-6">
                  {tip}
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

            <h2 className="font-display text-[42px] md:text-[55px] mt-4">
              Exceptional Cost Exclusions
            </h2>

            <p className="text-[#776D64] max-w-[740px] mx-auto mt-5 leading-[1.8]">
              Costs caused by personal requirements, emergencies,
              delays or circumstances outside the organiser's control
              are not included in the package.
            </p>

          </div>

          <div className="bg-[#FBF8F4] border border-black/5 rounded-[20px] p-8 md:p-12">

            <div className="space-y-6">

              {exclusions.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-5 border-b border-black/5 pb-6 last:border-b-0 last:pb-0"
                >

                  <div className="w-9 h-9 rounded-full bg-[#C89A58]/10 flex items-center justify-center flex-shrink-0">

                    <span className="text-[#C89A58] text-[13px] font-bold">
                      {index + 1}
                    </span>

                  </div>

                  <p className="text-[#776D64] text-[14px] md:text-[15px] leading-[1.9] pt-1">
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </div>

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

        <div className="absolute inset-0">

          <img
            src="/kashi-cta.jpg"
            alt="Kashi Ganga Aarti"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />

        </div>

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
              Register for Kashi Yatra
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
                Register for Kashi Yatra
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

                {/* Preferred Dates */}
                <div className="md:col-span-2">

                  <label
                    htmlFor="dates"
                    className="block text-[12px] uppercase tracking-[0.12em] text-[#5F554C] font-bold mb-2"
                  >
                    Preferred Travel Dates
                  </label>

                  <input
                    id="dates"
                    type="text"
                    name="dates"
                    value={formData.dates}
                    onChange={handleInputChange}
                    placeholder="Example: October 2026 or flexible dates"
                    className="w-full h-[50px] px-4 rounded-[10px] bg-white border border-black/10 outline-none focus:border-[#C89A58] text-[14px]"
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