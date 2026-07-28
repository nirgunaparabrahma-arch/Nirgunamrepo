import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  // Auth States
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Tab & Filters States
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Interactive State Database
  const [productEnquiries, setProductEnquiries] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [yatras, setYatras] = useState([]);
  const [personalLetters, setPersonalLetters] = useState([]);
  const [events, setEvents] = useState([]);
  
  // Modal State
  const [selectedItem, setSelectedItem] = useState(null);

  // Check auth state on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore synchronizer
  useEffect(() => {
    if (!user) return;

    // 1. Listen to Product Enquiries
    const unsubscribeProducts = onSnapshot(collection(db, 'productEnquiries'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      list.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setProductEnquiries(list.filter(item => !['personalLetter', 'eventRegistration'].includes(item.submissionType)));
      setPersonalLetters(list.filter(item => item.submissionType === 'personalLetter'));
      setEvents(list.filter(item => item.submissionType === 'eventRegistration'));
    }, (error) => {
      console.error("Error listening to product enquiries:", error);
    });

    // 2. Listen to Volunteers
    const unsubscribeVolunteers = onSnapshot(collection(db, 'volunteers'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      list.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setVolunteers(list);
    }, (error) => {
      console.error("Error listening to volunteers:", error);
    });

    // 3. Listen to Yatra Registrations
    const unsubscribeYatras = onSnapshot(collection(db, 'yatraRegistrations'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      list.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setYatras(list);
    }, (error) => {
      console.error("Error listening to yatra registrations:", error);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeVolunteers();
      unsubscribeYatras();
    };
  }, [user]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed:", error);
      let userFriendlyMessage = "Invalid email or password. Please try again.";
      if (error.code === 'auth/invalid-credential') {
        userFriendlyMessage = "Invalid credentials. Please check your email and password.";
      } else if (error.code === 'auth/too-many-requests') {
        userFriendlyMessage = "Too many failed attempts. Please try again later.";
      }
      setAuthError(userFriendlyMessage);
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Sign out failed:", error);
      }
    }
  };

  // Summary counts
  const totalEnquiriesCount = productEnquiries.length;
  const totalVolunteersCount = volunteers.length;
  const totalYatrasCount = yatras.length;
  const totalPilgrimsCount = yatras.reduce((sum, item) => sum + parseInt(item.pilgrims || 0), 0);
  const pendingRequests = 
    productEnquiries.filter(e => e.status === 'New').length +
    volunteers.filter(v => v.status === 'New').length +
    yatras.filter(y => y.status === 'New').length +
    personalLetters.filter(letter => letter.status === 'New').length +
    events.filter(event => event.status === 'New').length;

  // Handles Firestore updates (Mark Contacted)
  const handleMarkContacted = async (id, tab) => {
    let collectionName = '';
    if (tab === 'products') collectionName = 'productEnquiries';
    else if (tab === 'volunteers') collectionName = 'volunteers';
    else if (tab === 'yatras') collectionName = 'yatraRegistrations';
    else if (tab === 'letters') collectionName = 'productEnquiries';
    else if (tab === 'events') collectionName = 'productEnquiries';

    try {
      await updateDoc(doc(db, collectionName, id), { status: 'Contacted' });
      // Close open modal if we are viewing the item we just modified
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem(prev => ({ ...prev, status: 'Contacted' }));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  // Handles Firestore updates (Delete)
  const handleDeleteItem = async (id, tab) => {
    if (confirm("Are you sure you want to delete this record?")) {
      let collectionName = '';
      if (tab === 'products') collectionName = 'productEnquiries';
      else if (tab === 'volunteers') collectionName = 'volunteers';
      else if (tab === 'yatras') collectionName = 'yatraRegistrations';
      else if (tab === 'letters') collectionName = 'productEnquiries';
      else if (tab === 'events') collectionName = 'productEnquiries';

      try {
        await deleteDoc(doc(db, collectionName, id));
        setSelectedItem(null);
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete record. Please try again.");
      }
    }
  };

  // Filter and search calculations
  const getFilteredProducts = () => {
    return productEnquiries.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.cityState.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.productLabel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredVolunteers = () => {
    return volunteers.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.interest.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.about.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredYatras = () => {
    return yatras.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.destination.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredPersonalLetters = () => {
    const query = searchQuery.toLowerCase();
    return personalLetters.filter(item => {
      const matchesSearch = (item.name || '').toLowerCase().includes(query) ||
                            (item.phone || '').toLowerCase().includes(query) ||
                            (item.email || '').toLowerCase().includes(query) ||
                            (item.message || '').toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredEvents = () => {
    const query = searchQuery.toLowerCase();
    return events.filter(item => {
      const matchesSearch = (item.name || '').toLowerCase().includes(query) ||
                            (item.phone || '').toLowerCase().includes(query) ||
                            (item.event || '').toLowerCase().includes(query) ||
                            (item.comment || '').toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  // CSV Export simulator
  const handleExportCSV = () => {
    alert("Exporting active table to CSV format... Check your downloads folder shortly.");
  };

  // 1. LOADING RESOLUTION VIEW
  if (loading) {
    return (
      <div className="bg-[#F8F4EE] text-[#2C2119] min-h-screen flex flex-col justify-between">
        {/* Custom Branded Admin Header */}
        <header className="w-full bg-[#241812] text-[#E8E2D9] px-[5%] lg:px-[8%] py-6 flex justify-between items-center border-b border-white/10 shadow-md">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-[#C7954D]">filter_vintage</span>
            <div className="flex flex-col leading-none">
              <span className="font-display font-semibold text-xl lg:text-2xl tracking-[0.1em] text-white">NIRGUNAM</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C7954D]">Admin Console</span>
            </div>
          </div>
          <Link 
            to="/"
            className="h-10 px-4 rounded-[8px] text-[11px] uppercase font-bold tracking-widest text-white/80 border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Site</span>
          </Link>
        </header>

        <div className="flex-grow flex flex-col items-center justify-center py-16">
          <span className="material-symbols-outlined text-[64px] text-[#C7954D] animate-spin mb-4 font-light">filter_vintage</span>
          <p className="font-body text-[16px] text-[#776D64] font-light">Resolving administrative privileges...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // 2. UNAUTHENTICATED LOGIN VIEW
  if (!user) {
    return (
      <div className="bg-[#F8F4EE] text-[#2C2119] min-h-screen flex flex-col justify-between">
        {/* Custom Branded Admin Header */}
        <header className="w-full bg-[#241812] text-[#E8E2D9] px-[5%] lg:px-[8%] py-6 flex justify-between items-center border-b border-white/10 shadow-md">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-[#C7954D]">filter_vintage</span>
            <div className="flex flex-col leading-none">
              <span className="font-display font-semibold text-xl lg:text-2xl tracking-[0.1em] text-white">NIRGUNAM</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C7954D]">Admin Console</span>
            </div>
          </div>
          <Link 
            to="/"
            className="h-10 px-4 rounded-[8px] text-[11px] uppercase font-bold tracking-widest text-white/80 border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Site</span>
          </Link>
        </header>
        
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <div className="bg-[#241812] border border-white/10 rounded-[28px] max-w-[500px] w-full p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)] text-[#E8E2D9]">
            
            {/* Header */}
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-[48px] text-[#C7954D] mb-4 font-light">admin_panel_settings</span>
              <h2 className="font-display text-3xl text-white font-medium mb-2">Admin Portal</h2>
              <p className="font-body text-[#776D64] text-[15px] font-light">
                Please authenticate using your credentials to access the management dashboard.
              </p>
            </div>

            {/* Error Feedback */}
            {authError && (
              <div className="mb-6 p-4 rounded-[12px] bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-light text-left flex items-start gap-3">
                <span className="material-symbols-outlined text-lg mt-0.5">error</span>
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nirgunam.com" 
                  className="h-[56px] rounded-[12px] bg-[#1C120C] border border-white/5 px-4 focus:outline-none focus:border-[#C7954D] transition-colors text-[15px] font-body text-white placeholder-white/20" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase tracking-widest text-white/50 font-bold">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="h-[56px] rounded-[12px] bg-[#1C120C] border border-white/5 px-4 focus:outline-none focus:border-[#C7954D] transition-colors text-[15px] font-body text-white placeholder-white/20" 
                />
              </div>

              <button 
                type="submit" 
                disabled={authSubmitting}
                className="h-[56px] w-full rounded-[12px] bg-[#D87428] hover:bg-[#c26723] disabled:bg-[#D87428]/60 disabled:cursor-not-allowed text-white text-[13px] uppercase font-bold tracking-widest transition-colors mt-2 flex items-center justify-center gap-2"
              >
                {authSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">login</span>
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // 3. AUTHENTICATED DASHBOARD VIEW
  return (
    <div className="bg-[#F8F4EE] text-[#2C2119] font-body selection:bg-[#C7954D]/30 min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Custom Branded Admin Header */}
      <header className="w-full bg-[#241812] text-[#E8E2D9] px-[5%] lg:px-[8%] py-6 flex justify-between items-center border-b border-white/10 shadow-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-[#C7954D]">filter_vintage</span>
          <div className="flex flex-col leading-none">
            <span className="font-display font-semibold text-xl lg:text-2xl tracking-[0.1em] text-white">NIRGUNAM</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C7954D]">Admin Console</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-[12px] text-white/60 font-light">
            Logged in as <span className="font-medium text-white">{user.email}</span>
          </span>
          <button 
            onClick={handleLogout}
            className="h-10 px-4 rounded-[8px] text-[11px] uppercase font-bold tracking-widest bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Sign Out</span>
          </button>
          <Link 
            to="/"
            className="h-10 px-4 rounded-[8px] text-[11px] uppercase font-bold tracking-widest text-white/80 border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Site</span>
          </Link>
        </div>
      </header>

      {/* Main Admin Section */}
      <main className="flex-grow py-16 px-[5%] lg:px-[8%]">
        <div className="max-w-[1400px] mx-auto w-full">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <span className="text-[12px] uppercase tracking-[0.3em] text-[#C7954D] font-bold mb-3 block">Administration</span>
              <h1 className="font-display text-4xl md:text-5xl text-[#2A1F18] font-semibold tracking-[-0.02em]">Management Dashboard</h1>
            </div>
            
            <div>
              <button 
                onClick={handleExportCSV}
                className="h-[52px] px-6 rounded-[12px] text-[12px] uppercase font-bold tracking-widest bg-[#5F6A46] hover:bg-[#4a5337] text-white transition-colors flex items-center justify-center gap-2 border border-transparent shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Stats Summary Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Stat Card 1 */}
            <div className="bg-white border border-black/5 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-5">
              <div className="w-[60px] h-[60px] rounded-[14px] bg-[#C7954D]/10 text-[#C7954D] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl">shopping_bag</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#776D64] font-bold block mb-1">Product Orders</span>
                <span className="text-3xl font-display font-medium text-[#2A1F18]">{totalEnquiriesCount}</span>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white border border-black/5 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-5">
              <div className="w-[60px] h-[60px] rounded-[14px] bg-[#D87428]/10 text-[#D87428] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl">group</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#776D64] font-bold block mb-1">Volunteers</span>
                <span className="text-3xl font-display font-medium text-[#2A1F18]">{totalVolunteersCount}</span>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white border border-black/5 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-5">
              <div className="w-[60px] h-[60px] rounded-[14px] bg-[#5F6A46]/10 text-[#5F6A46] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl">travel_explore</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#776D64] font-bold block mb-1">Pilgrims Registered</span>
                <span className="text-3xl font-display font-medium text-[#2A1F18]">{totalPilgrimsCount} <span className="text-xs text-[#776D64] font-normal">({totalYatrasCount} Groups)</span></span>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-white border border-black/5 rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center gap-5">
              <div className="w-[60px] h-[60px] rounded-[14px] bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl">notification_important</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#776D64] font-bold block mb-1">Uncontacted Requests</span>
                <span className="text-3xl font-display font-medium text-[#2A1F18]">{pendingRequests}</span>
              </div>
            </div>
          </div>

          {/* Filtering and Tabs Section */}
          <div className="bg-white border border-black/5 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.015)] overflow-hidden">
            
            {/* Header Control Panel */}
            <div className="px-8 py-6 border-b border-black/5 bg-[#FCFAF6] flex flex-col lg:flex-row justify-between lg:items-center gap-6">
              
              {/* Navigation Tabs */}
              <div className="flex flex-wrap border-b border-black/5 lg:border-none p-1 bg-black/5 rounded-[12px] self-start">
                <button
                  onClick={() => { setActiveTab('products'); setSearchQuery(''); }}
                  className={`h-11 px-5 rounded-[8px] text-[12px] uppercase font-bold tracking-wider transition-colors ${activeTab === 'products' ? 'bg-[#2A1F18] text-white' : 'text-[#776D64] hover:text-[#2A1F18]'}`}
                >
                  Product Enquiries
                </button>
                <button
                  onClick={() => { setActiveTab('volunteers'); setSearchQuery(''); }}
                  className={`h-11 px-5 rounded-[8px] text-[12px] uppercase font-bold tracking-wider transition-colors ${activeTab === 'volunteers' ? 'bg-[#2A1F18] text-white' : 'text-[#776D64] hover:text-[#2A1F18]'}`}
                >
                  Volunteers
                </button>
                <button
                  onClick={() => { setActiveTab('yatras'); setSearchQuery(''); }}
                  className={`h-11 px-5 rounded-[8px] text-[12px] uppercase font-bold tracking-wider transition-colors ${activeTab === 'yatras' ? 'bg-[#2A1F18] text-white' : 'text-[#776D64] hover:text-[#2A1F18]'}`}
                >
                  Yatra Registrations
                </button>
                <button
                  onClick={() => { setActiveTab('letters'); setSearchQuery(''); }}
                  className={`h-11 px-5 rounded-[8px] text-[12px] uppercase font-bold tracking-wider transition-colors ${activeTab === 'letters' ? 'bg-[#2A1F18] text-white' : 'text-[#776D64] hover:text-[#2A1F18]'}`}
                >
                  Personal Letters
                </button>
                <button
                  onClick={() => { setActiveTab('events'); setSearchQuery(''); }}
                  className={`h-11 px-5 rounded-[8px] text-[12px] uppercase font-bold tracking-wider transition-colors ${activeTab === 'events' ? 'bg-[#2A1F18] text-white' : 'text-[#776D64] hover:text-[#2A1F18]'}`}
                >
                  Events
                </button>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${activeTab === 'products' ? 'products or name' : activeTab === 'volunteers' ? 'interest or name' : activeTab === 'yatras' ? 'destinations or name' : activeTab === 'letters' ? 'letters or name' : 'events or name'}...`}
                    className="w-full sm:w-[260px] h-[48px] rounded-[10px] bg-white border border-black/10 pl-10 pr-4 text-[14px] outline-none focus:border-[#C7954D] transition-colors"
                  />
                  <span className="material-symbols-outlined text-lg absolute left-3.5 top-1/2 -translate-y-1/2 text-[#776D64]">search</span>
                </div>

                {/* Status Dropdown */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-[150px] h-[48px] rounded-[10px] bg-white border border-black/10 pl-4 pr-10 text-[14px] outline-none focus:border-[#C7954D] transition-colors appearance-none cursor-pointer"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <span className="material-symbols-outlined text-lg absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#776D64]">expand_more</span>
                </div>

              </div>

            </div>

            {/* Interactive Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/5 bg-[#FCFAF6]/50 text-[11px] uppercase tracking-widest text-[#776D64] font-bold">
                    <th className="px-8 py-5">{activeTab === 'letters' ? 'Sender' : activeTab === 'events' ? 'Registrant' : 'Applicant / Submitter'}</th>
                    <th className="px-6 py-5">{activeTab === 'products' ? 'Product Ordered' : activeTab === 'volunteers' ? 'Interest Area' : activeTab === 'yatras' ? 'Destination' : activeTab === 'letters' ? 'Phone Number' : 'Event'}</th>
                    <th className="px-6 py-5">{activeTab === 'products' ? 'Qty' : activeTab === 'volunteers' ? 'Availability' : activeTab === 'yatras' ? 'Pilgrims' : activeTab === 'letters' ? 'Letter' : 'Phone No'}</th>
                    <th className="px-6 py-5">Date</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-body text-[14px] text-[#2C2119]">
                  
                  {/* Render Product Enquiries */}
                  {activeTab === 'products' && getFilteredProducts().map((item) => (
                    <tr key={item.id} className="hover:bg-black/[0.005] transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-medium text-[#2A1F18]">{item.name}</div>
                        <div className="text-[12px] text-[#776D64] font-light mt-0.5">{item.phone} • {item.cityState}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-display font-medium text-[15px]">{item.productLabel}</span>
                      </td>
                      <td className="px-6 py-5 font-medium">{item.quantity} pcs</td>
                      <td className="px-6 py-5 text-[#776D64] font-light">{item.date}</td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${item.status === 'New' ? 'bg-[#D87428]/10 text-[#D87428]' : item.status === 'Contacted' ? 'bg-[#5F6A46]/10 text-[#5F6A46]' : 'bg-black/5 text-[#776D64]'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedItem({ ...item, tab: 'products' })}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#C7954D]/10 hover:text-[#C7954D] text-[#776D64] transition-colors flex items-center justify-center"
                            title="View full details"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          {item.status === 'New' && (
                            <button 
                              onClick={() => handleMarkContacted(item.id, 'products')}
                              className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#5F6A46]/10 hover:text-[#5F6A46] text-[#776D64] transition-colors flex items-center justify-center"
                              title="Mark as contacted"
                            >
                              <span className="material-symbols-outlined text-[18px]">done</span>
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteItem(item.id, 'products')}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-red-500/10 hover:text-red-600 text-[#776D64] transition-colors flex items-center justify-center"
                            title="Delete record"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Render Volunteers */}
                  {activeTab === 'volunteers' && getFilteredVolunteers().map((item) => (
                    <tr key={item.id} className="hover:bg-black/[0.005] transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-medium text-[#2A1F18]">{item.name}</div>
                        <div className="text-[12px] text-[#776D64] font-light mt-0.5">{item.phone}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-medium">{item.interest}</span>
                      </td>
                      <td className="px-6 py-5 text-[#776D64]">{item.availability}</td>
                      <td className="px-6 py-5 text-[#776D64] font-light">{item.date}</td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${item.status === 'New' ? 'bg-[#D87428]/10 text-[#D87428]' : item.status === 'Contacted' ? 'bg-[#5F6A46]/10 text-[#5F6A46]' : 'bg-black/5 text-[#776D64]'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedItem({ ...item, tab: 'volunteers' })}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#C7954D]/10 hover:text-[#C7954D] text-[#776D64] transition-colors flex items-center justify-center"
                            title="View full details"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          {item.status === 'New' && (
                            <button 
                              onClick={() => handleMarkContacted(item.id, 'volunteers')}
                              className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#5F6A46]/10 hover:text-[#5F6A46] text-[#776D64] transition-colors flex items-center justify-center"
                              title="Mark as contacted"
                            >
                              <span className="material-symbols-outlined text-[18px]">done</span>
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteItem(item.id, 'volunteers')}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-red-500/10 hover:text-red-600 text-[#776D64] transition-colors flex items-center justify-center"
                            title="Delete record"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Render Yatras */}
                  {activeTab === 'yatras' && getFilteredYatras().map((item) => (
                    <tr key={item.id} className="hover:bg-black/[0.005] transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-medium text-[#2A1F18]">{item.name}</div>
                        <div className="text-[12px] text-[#776D64] font-light mt-0.5">{item.phone} • {item.city}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-display font-medium text-[15px] text-[#C7954D]">{item.destination}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-medium">{item.pilgrims} Pilgrims</div>
                        <div className="text-[11px] text-[#776D64] font-light mt-0.5">Seniors: {item.senior}</div>
                      </td>
                      <td className="px-6 py-5 text-[#776D64] font-light">{item.date}</td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${item.status === 'New' ? 'bg-[#D87428]/10 text-[#D87428]' : item.status === 'Contacted' ? 'bg-[#5F6A46]/10 text-[#5F6A46]' : 'bg-black/5 text-[#776D64]'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedItem({ ...item, tab: 'yatras' })}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#C7954D]/10 hover:text-[#C7954D] text-[#776D64] transition-colors flex items-center justify-center"
                            title="View full details"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          {item.status === 'New' && (
                            <button 
                              onClick={() => handleMarkContacted(item.id, 'yatras')}
                              className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#5F6A46]/10 hover:text-[#5F6A46] text-[#776D64] transition-colors flex items-center justify-center"
                              title="Mark as contacted"
                            >
                              <span className="material-symbols-outlined text-[18px]">done</span>
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteItem(item.id, 'yatras')}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-red-500/10 hover:text-red-600 text-[#776D64] transition-colors flex items-center justify-center"
                            title="Delete record"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Render Personal Letters */}
                  {activeTab === 'letters' && getFilteredPersonalLetters().map((item) => (
                    <tr key={item.id} className="hover:bg-black/[0.005] transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-medium text-[#2A1F18]">{item.name}</div>
                      </td>
                      <td className="px-6 py-5 text-[#776D64]">{item.phone || item.email}</td>
                      <td className="px-6 py-5">
                        <p className="max-w-[280px] truncate text-[#776D64]" title={item.message}>{item.message}</p>
                      </td>
                      <td className="px-6 py-5 text-[#776D64] font-light">{item.date}</td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${item.status === 'New' ? 'bg-[#D87428]/10 text-[#D87428]' : item.status === 'Contacted' ? 'bg-[#5F6A46]/10 text-[#5F6A46]' : 'bg-black/5 text-[#776D64]'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedItem({ ...item, tab: 'letters' })}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#C7954D]/10 hover:text-[#C7954D] text-[#776D64] transition-colors flex items-center justify-center"
                            title="View full letter"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          {item.status === 'New' && (
                            <button
                              onClick={() => handleMarkContacted(item.id, 'letters')}
                              className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#5F6A46]/10 hover:text-[#5F6A46] text-[#776D64] transition-colors flex items-center justify-center"
                              title="Mark as contacted"
                            >
                              <span className="material-symbols-outlined text-[18px]">done</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteItem(item.id, 'letters')}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-red-500/10 hover:text-red-600 text-[#776D64] transition-colors flex items-center justify-center"
                            title="Delete letter"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Render Event Registrations */}
                  {activeTab === 'events' && getFilteredEvents().map((item) => (
                    <tr key={item.id} className="hover:bg-black/[0.005] transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-medium text-[#2A1F18]">{item.name}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-display font-medium text-[15px] text-[#C7954D]">{item.event}</span>
                      </td>
                      <td className="px-6 py-5 text-[#776D64]">{item.phone}</td>
                      <td className="px-6 py-5 text-[#776D64] font-light">{item.date}</td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${item.status === 'New' ? 'bg-[#D87428]/10 text-[#D87428]' : item.status === 'Contacted' ? 'bg-[#5F6A46]/10 text-[#5F6A46]' : 'bg-black/5 text-[#776D64]'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedItem({ ...item, tab: 'events' })}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#C7954D]/10 hover:text-[#C7954D] text-[#776D64] transition-colors flex items-center justify-center"
                            title="View full details"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          {item.status === 'New' && (
                            <button
                              onClick={() => handleMarkContacted(item.id, 'events')}
                              className="w-9 h-9 rounded-full bg-black/5 hover:bg-[#5F6A46]/10 hover:text-[#5F6A46] text-[#776D64] transition-colors flex items-center justify-center"
                              title="Mark as contacted"
                            >
                              <span className="material-symbols-outlined text-[18px]">done</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteItem(item.id, 'events')}
                            className="w-9 h-9 rounded-full bg-black/5 hover:bg-red-500/10 hover:text-red-600 text-[#776D64] transition-colors flex items-center justify-center"
                            title="Delete event registration"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Empty State */}
                  {((activeTab === 'products' && getFilteredProducts().length === 0) ||
                    (activeTab === 'volunteers' && getFilteredVolunteers().length === 0) ||
                    (activeTab === 'yatras' && getFilteredYatras().length === 0) ||
                    (activeTab === 'letters' && getFilteredPersonalLetters().length === 0) ||
                    (activeTab === 'events' && getFilteredEvents().length === 0)) && (
                    <tr>
                      <td colSpan="6" className="px-8 py-16 text-center text-[#776D64]">
                        <span className="material-symbols-outlined text-4xl mb-3 text-black/20 block">inbox</span>
                        <div className="font-medium text-base text-[#2A1F18]">
                          {activeTab === 'letters' ? 'No personal letters found' : activeTab === 'events' ? 'No event records found' : 'No submissions found'}
                        </div>
                        <p className="text-sm mt-1 font-light">Try adjusting your search query or filters.</p>
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>

          </div>

        </div>
      </main>

      {/* POPUP DETAIL MODAL OVERLAY */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#241812] border border-white/10 rounded-[28px] max-w-[650px] w-full p-8 md:p-10 relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] text-[#E8E2D9] max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Modal Header */}
            <div className="mb-6 pb-6 border-b border-white/10 text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#D87428] font-bold block mb-1">Application Details</span>
              <h3 className="font-display text-2xl text-white font-medium">{selectedItem.name}</h3>
              <p className="font-body text-white/60 text-sm mt-1">{selectedItem.id} • Submitted on {selectedItem.date}</p>
            </div>

            {/* Content Details Grid */}
            <div className="flex flex-col gap-6 text-left font-body text-[15px] leading-relaxed font-light">
              
              {/* Product specific fields */}
              {selectedItem.tab === 'products' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Product</span>
                    <span className="font-medium text-white">{selectedItem.productLabel}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Quantity Requested</span>
                    <span className="font-medium text-white">{selectedItem.quantity} pcs</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Contact Phone</span>
                    <span className="text-white font-medium">{selectedItem.phone}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">City / State</span>
                    <span className="text-white">{selectedItem.cityState}</span>
                  </div>
                </div>
              )}

              {/* Volunteer specific fields */}
              {selectedItem.tab === 'volunteers' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Area of Interest</span>
                    <span className="font-medium text-white">{selectedItem.interest}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Availability</span>
                    <span className="font-medium text-white">{selectedItem.availability}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Contact Phone</span>
                    <span className="text-white font-medium">{selectedItem.phone}</span>
                  </div>
                </div>
              )}

              {/* Yatra specific fields */}
              {selectedItem.tab === 'yatras' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Destination</span>
                    <span className="font-medium text-white">{selectedItem.destination}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Pilgrims count</span>
                    <span className="font-medium text-white">{selectedItem.pilgrims} pilgrims</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Senior Citizens?</span>
                    <span className="text-white font-medium">{selectedItem.senior}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Preferred Dates</span>
                    <span className="text-white">{selectedItem.dates}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">City / State</span>
                    <span className="text-white">{selectedItem.city}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Contact Phone</span>
                    <span className="text-white font-medium">{selectedItem.phone}</span>
                  </div>
                </div>
              )}

              {/* Personal letter specific fields */}
              {selectedItem.tab === 'letters' && (
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">{selectedItem.phone ? 'Phone Number' : 'Email'}</span>
                  <a className="text-white font-medium hover:text-[#C7954D] transition-colors" href={selectedItem.phone ? `tel:${selectedItem.phone}` : `mailto:${selectedItem.email}`}>
                    {selectedItem.phone || selectedItem.email}
                  </a>
                </div>
              )}

              {/* Event registration specific fields */}
              {selectedItem.tab === 'events' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Event</span>
                    <span className="font-medium text-white">{selectedItem.event}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">Phone No</span>
                    <a className="text-white font-medium hover:text-[#C7954D] transition-colors" href={`tel:${selectedItem.phone}`}>
                      {selectedItem.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Message content */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-white/40 font-bold block mb-1">
                  {selectedItem.tab === 'products' ? 'Message / Questions' : selectedItem.tab === 'volunteers' ? 'About Himself/Herself' : selectedItem.tab === 'letters' ? 'Personal Letter' : selectedItem.tab === 'events' ? 'Comment' : 'Special Requirements'}
                </span>
                <p className="bg-[#1C120C]/80 border border-white/5 rounded-[12px] p-4 text-[14px] text-white/95 max-h-[160px] overflow-y-auto font-light leading-relaxed">
                  {selectedItem.tab === 'products' ? selectedItem.message : selectedItem.tab === 'volunteers' ? selectedItem.about : selectedItem.tab === 'letters' ? selectedItem.message : selectedItem.tab === 'events' ? (selectedItem.comment || 'No comment provided.') : selectedItem.requirements}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="flex gap-4 mt-4 pt-6 border-t border-white/10">
                {selectedItem.status === 'New' && (
                  <button 
                    onClick={() => handleMarkContacted(selectedItem.id, selectedItem.tab)}
                    className="flex-1 h-[52px] rounded-[12px] bg-[#5F6A46] hover:bg-[#4a5337] text-white text-[12px] uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">done</span>
                    <span>Mark as Contacted</span>
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteItem(selectedItem.id, selectedItem.tab)}
                  className="h-[52px] px-6 rounded-[12px] bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 text-[12px] uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 border border-red-500/20"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  <span>Delete</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
