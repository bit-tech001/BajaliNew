import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users2, Landmark, Trophy, ShieldCheck, HeartHandshake, ChevronRight, 
  Search, ArrowRight, CheckCircle, FileText, MapPin, Calculator, Mail, Phone, Clock,
  MessageSquare, Star, ExternalLink, Filter, HelpCircle, UserCheck, RefreshCw, Sparkles, Send
} from 'lucide-react';

// Core Subcomponents
import Header from './components/Header';
import Footer from './components/Footer';
import Calculators from './components/Calculators';
import Lightbox from './components/Lightbox';

// Data Types
import { Property, Service, Project, GalleryItem, Blog, Testimonial, FAQ, TeamMember, AppSettings, Enquiry } from './types';

// Static Data
import { 
  initialProperties, initialServices, initialProjects, initialGalleryItems, 
  initialBlogs, initialFAQs, initialTeamMembers, initialTestimonials, initialSettings 
} from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  
  // Database States
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [team, setTeam] = useState<TeamMember[]>(initialTeamMembers);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [settings, setSettings] = useState<AppSettings | null>(initialSettings);

  // Filter States
  const [propertyFilter, setPropertyFilter] = useState<string>('all');
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');

  // Hero Slider State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Lightbox State
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [] as string[],
    titles: [] as string[],
    activeIndex: 0
  });

  // Blog Details State
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);

  // Enquiry Modal State
  const [selectedPropertyEnquiry, setSelectedPropertyEnquiry] = useState<Property | null>(null);

  // General Enquiry Form state
  const [generalEnquiry, setGeneralEnquiry] = useState({
    name: '', email: '', phone: '', type: 'General' as any, message: ''
  });
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load Database Content on mount
  useEffect(() => {
    // UI is client-side only. Keep active records in sync with local memory.
  }, []);

  // Hero Slides
  const heroSlides = [
    {
      title: 'Premium Corporate Sourcing & Investment Advisory',
      subtitle: 'Guiding global enterprises and NRI wealth portfolios across Ahmedabad’s high-growth micro-markets.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600'
    },
    {
      title: 'Strategic Real Estate Asset Management',
      subtitle: 'Grade-A office towers, custom logistics hubs, and high-yield commercial leases along SG Highway corridor.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600'
    },
    {
      title: 'Exclusive Luxury Gated Habitats',
      subtitle: 'Hand-picked luxury villas and premium apartments in Bodakdev, Satellite, and Sindhu Bhavan Road.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600'
    }
  ];

  // Auto-slide Hero
  useEffect(() => {
    if (currentPage !== 'home') return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentPage]);

  // Newsletter Submit Helper
  const handleNewsletterSubscribe = async (email: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 400);
    });
  };

  // Enquiry Submission Helper
  const handleGeneralEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryStatus('idle');
    
    if (!generalEnquiry.name || !generalEnquiry.phone || !generalEnquiry.message) {
      setEnquiryStatus('error');
      return;
    }

    setEnquiryStatus('success');
    setGeneralEnquiry({ name: '', email: '', phone: '', type: 'General', message: '' });
  };

  const handlePropertyEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPropertyEnquiry) return;

    const phoneInput = (e.currentTarget.elements.namedItem('phone') as HTMLInputElement).value;
    const nameInput = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;

    if (!nameInput || !phoneInput) {
      alert('Please provide name and phone number.');
      return;
    }

    alert('Enquiry logged successfully. An advisory executive will connect shortly.');
    setSelectedPropertyEnquiry(null);
  };

  // Formatter helper
  const formatRupee = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val).replace('INR', '₹');
  };

  const defaultSettings: AppSettings = {
    phone: '+91 79 4890 2341',
    whatsapp: '+91 98250 12345',
    email: 'advisory@balajiconsultancy.co.in',
    address: '401-404, Balaji Corporate Avenue, Opp. Shalby Hospital, S.G. Highway, Bodakdev, Ahmedabad - 380054, Gujarat, India',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)',
    facebook: 'https://facebook.com/balajiconsultancy',
    linkedin: 'https://linkedin.com/company/balajiconsultancy',
    twitter: 'https://twitter.com/balajiconsult'
  };

  const activeSettings = settings || defaultSettings;

  // Render Skeleton while initial assets compile or fetch
  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex flex-col justify-center items-center gap-4 text-sm font-semibold text-gray-500">
        <RefreshCw className="w-8 h-8 text-[#F97316] animate-spin" />
        <span>Syncing Balaji Corporate Database...</span>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F8F8] font-sans text-[#222222] min-h-screen flex flex-col justify-between selection:bg-orange-100 selection:text-[#F97316]">
      
      {/* Sticky Header */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        contactPhone={activeSettings.phone} 
        contactWhatsApp={activeSettings.whatsapp} 
      />

      {/* Primary Page Router with AnimatePresence */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* --- PAGE: HOME --- */}
          {currentPage === 'home' && (
            <motion.div 
              key="home" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              transition={{ duration: 0.4 }}
              className="space-y-24"
            >
              {/* Hero Slider */}
              <section className="relative h-[82vh] overflow-hidden bg-black" id="hero-banner-section">
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      currentHeroSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-cover opacity-70 transform scale-105 transition-transform duration-[6000ms] ease-out" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#222222]/30" />
                    <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white z-10">
                      <div className="max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/20 px-3.5 py-1.5 rounded-full">
                          <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                            RERA CERTIFIED REAL ESTATE ADVISORY
                          </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-base md:text-lg text-gray-200 font-medium leading-relaxed">
                          {slide.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-3">
                          <button 
                            onClick={() => setCurrentPage('properties')}
                            className="bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#F97316]/20 hover:-translate-y-0.5 active:translate-y-0"
                          >
                            Explore Inventory
                          </button>
                          <button 
                            onClick={() => setCurrentPage('contact')}
                            className="bg-transparent border-2 border-white hover:bg-white hover:text-[#222222] text-white px-8 py-4 rounded-xl text-sm font-bold transition-all"
                          >
                            Book Private Session
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Slider Dot Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentHeroSlide(idx)}
                      className={`w-3.5 h-1.5 rounded-full transition-all ${
                        currentHeroSlide === idx ? 'bg-[#F97316] w-7' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </section>

              {/* About Company Teaser */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">
                    Established Since 2002
                  </span>
                  <h2 className="text-3xl font-heading font-extrabold tracking-tight text-[#222222] leading-tight">
                    Ahmedabad's Core Property & Investment Strategists
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    At Balaji Consultancy Services, we do not simply act as brokers. We are a specialized, data-backed real estate advisory firm. Our primary corporate strength lies in mapping Ahmedabad's municipal growth directions, conducting title clearances, and securing assets that command high rental yields and robust inheritance values.
                  </p>
                  <div className="border-l-4 border-[#F97316] pl-4 italic text-gray-500 text-sm">
                    "Transparency, strict legal vetting, and long-term capital preservation form the fundamental pillars of our corporate identity."
                  </div>
                  <button 
                    onClick={() => setCurrentPage('about')}
                    className="flex items-center gap-1.5 text-[#F97316] font-bold text-sm hover:translate-x-1.5 transition-transform cursor-pointer"
                  >
                    Read Our Core Mission <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="lg:col-span-7 relative">
                  <div className="absolute -inset-2 bg-orange-100 rounded-2xl -z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800" 
                    alt="Balaji Corporate Discussion" 
                    className="rounded-2xl shadow-md w-full h-[400px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </section>

              {/* Dynamic Corporate Statistics Counter */}
              <section className="bg-white border-y border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { val: '₹1,500+ Cr', desc: 'Assets Valued & Transacted' },
                    { val: '24+ Years', desc: 'Ahmedabad Advisory Legacy' },
                    { val: '450+', desc: 'Corporate & NRI Clients' },
                    { val: '100% Clear', desc: 'Clean Legal Record Title' }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1 group">
                      <span className="block text-3xl md:text-4xl font-heading font-extrabold text-[#F97316] tracking-tight group-hover:scale-105 transition-transform duration-300">
                        {stat.val}
                      </span>
                      <span className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">
                        {stat.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Properties */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div className="space-y-2">
                    <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Premium Portfolio</span>
                    <h2 className="text-3xl font-heading font-extrabold tracking-tight text-[#222222]">Featured Active Listings</h2>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('properties')}
                    className="border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer"
                  >
                    View All Listings
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.slice(0, 3).map((prop) => (
                    <div key={prop.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                      <div className="relative h-56 overflow-hidden bg-gray-100">
                        <img 
                          src={prop.image} 
                          alt={prop.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-4 left-4 bg-white text-[#222222] text-[10px] font-bold py-1 px-3.5 rounded-md uppercase tracking-wider shadow">
                          {prop.type}
                        </span>
                        <span className="absolute bottom-4 right-4 bg-[#F97316] text-white text-xs font-bold py-1 px-3 rounded-md shadow">
                          {prop.status}
                        </span>
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[#F97316] font-bold text-lg">{prop.price}</span>
                            <span className="text-xs text-gray-500 font-medium">{prop.specs.area}</span>
                          </div>
                          <h3 className="font-heading font-bold text-gray-900 text-sm group-hover:text-[#F97316] transition-colors">{prop.title}</h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#F97316]" /> {prop.location}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {prop.amenities.slice(0, 3).map((am, idx) => (
                            <span key={idx} className="bg-[#F8F8F8] text-gray-600 text-[10px] font-semibold py-1 px-2.5 rounded border border-gray-100">
                              {am}
                            </span>
                          ))}
                        </div>

                        <button 
                          onClick={() => setSelectedPropertyEnquiry(prop)}
                          className="w-full bg-[#222222] hover:bg-black text-white text-xs py-2.5 rounded-lg font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Request Brochure <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Services teaser */}
              <section className="bg-white border-y border-gray-100 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                  <div className="text-center max-w-3xl mx-auto space-y-2">
                    <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Client Offerings</span>
                    <h2 className="text-3xl font-heading font-extrabold tracking-tight text-[#222222]">Advisory Specialties</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">Comprehensive support frameworks targeting diverse property lifecycle requirements.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((srv) => (
                      <div key={srv.id} className="bg-[#F8F8F8] border border-gray-100 rounded-2xl p-6 space-y-4 hover:bg-white hover:shadow-md transition-all group">
                        <div className="bg-orange-50 text-[#F97316] p-3 rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg">
                          •
                        </div>
                        <h3 className="font-heading font-bold text-gray-900 text-sm group-hover:text-[#F97316] transition-colors">{srv.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{srv.description.slice(0, 120)}...</p>
                        <button 
                          onClick={() => setCurrentPage('services')}
                          className="text-[#F97316] font-bold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                        >
                          Explore Benefits <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonials */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Client Feedback</span>
                  <h2 className="text-3xl font-heading font-extrabold tracking-tight text-[#222222]">Why Clients Trust Us</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((test) => (
                    <div key={test.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                      <div className="flex gap-1 text-[#F97316]">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#F97316] stroke-[#F97316]" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed italic">
                        "{test.comment}"
                      </p>
                      <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                        <img src={test.avatar} alt={test.name} className="w-10 h-10 object-cover rounded-full" referrerPolicy="no-referrer" />
                        <div>
                          <span className="block font-bold text-xs text-gray-900">{test.name}</span>
                          <span className="block text-[10px] text-gray-500">{test.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Contact Form CTA */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-[#222222] text-white rounded-2xl p-8 md:p-12 border-b-4 border-[#F97316] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Contact Us Today</span>
                    <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight">Request an Expert Consultation</h2>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      Complete our secure booking form to request a private advisory session regarding commercial pre-leases, residential villa assemblies, or structural loan approvals.
                    </p>
                    <div className="flex flex-col gap-2.5 text-xs text-gray-300 pt-2">
                      <span className="flex items-center gap-2">✔ Secure GUJRERA Verification Support</span>
                      <span className="flex items-center gap-2">✔ Direct Off-Market Commercial Inventory Access</span>
                    </div>
                  </div>

                  <form onSubmit={handleGeneralEnquirySubmit} className="lg:col-span-7 bg-white p-6 rounded-xl text-[#222222] space-y-4">
                    {enquiryStatus === 'success' && (
                      <div className="bg-green-50 text-green-700 text-xs p-3 rounded-lg border border-green-100 flex gap-2">
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>Inquiry logged successfully. An advisor will contact you within 2 business hours.</span>
                      </div>
                    )}
                    {enquiryStatus === 'error' && (
                      <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 flex gap-2">
                        <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>Failed to log inquiry. Please verify inputs.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Corporate Name *</label>
                        <input 
                          type="text" 
                          placeholder="Your full name" 
                          value={generalEnquiry.name}
                          onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, name: e.target.value })}
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Mobile Contact *</label>
                        <input 
                          type="tel" 
                          placeholder="+91" 
                          value={generalEnquiry.phone}
                          onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, phone: e.target.value })}
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Email Coordinator</label>
                        <input 
                          type="email" 
                          placeholder="name@company.com" 
                          value={generalEnquiry.email}
                          onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, email: e.target.value })}
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Request Class</label>
                        <select 
                          value={generalEnquiry.type}
                          onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, type: e.target.value as any })}
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                        >
                          <option value="General">General Consultation</option>
                          <option value="Property">Direct Property Sourcing</option>
                          <option value="Consultation">Wealth & Portfolio Planning</option>
                          <option value="Site Visit">Request Scheduled Site Tour</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Brief Description *</label>
                      <textarea 
                        placeholder="Detail budget, micro-market preference, or timeline constraints..."
                        value={generalEnquiry.message}
                        onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, message: e.target.value })}
                        rows={2}
                        className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-lg text-xs font-bold transition-all shadow-sm"
                    >
                      Book Professional Advisor Session ✓
                    </button>
                  </form>
                </div>
              </section>
            </motion.div>
          )}

          {/* --- PAGE: ABOUT US --- */}
          {currentPage === 'about' && (
            <motion.div 
              key="about" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20"
            >
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Since 2002</span>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight text-[#222222]">About Balaji Consultancy</h1>
                <p className="text-gray-500 text-sm">Our legacy is built on absolute transparency, rigorous title check verification, and wealth defense.</p>
              </div>

              {/* Founder Message Section */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600" 
                    alt="Balraj Patel Founder" 
                    className="rounded-2xl shadow-md w-full h-[450px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Founder's Message</span>
                  <h2 className="text-2xl font-heading font-bold text-[#222222] leading-snug">"Real Estate Sourcing is not transactional; it is the ultimate wealth trust."</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Welcome to Balaji Consultancy Services. In my 24 years of active land assemblies and corporate commercial leasing across Gujarat, I have witnessed the rapid transition of Ahmedabad into an institutional megacity. My founding vision remains simple: protect the buyer. We execute extreme due diligence, ensuring every RERA, NA, and technical record is perfectly verified before transaction, so your capital stays defended.
                  </p>
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Balraj Patel</span>
                    <span className="block text-xs text-gray-400 font-semibold uppercase">Founder & Principal Coordinator</span>
                  </div>
                </div>
              </section>

              {/* Mission Vision Values Grid */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-heading font-bold text-[#F97316] text-base uppercase tracking-wider">Our Core Mission</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Empowering our luxury residential, corporate corporate, and high-yield portfolio clients with data-backed market analysis, strict legal verification safety, and favorable transactional agreements.
                  </p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-heading font-bold text-[#F97316] text-base uppercase tracking-wider">Corporate Vision</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    To consistently remain Ahmedabad’s most highly trusted and professionally rigorous real estate consultancy, setting benchmarks for transaction clarity and investment portfolio defense.
                  </p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-heading font-bold text-[#F97316] text-base uppercase tracking-wider">Fundamental Values</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Uncompromising regulatory clarity, deep analytical due diligence, complete transactional integrity, and client-centric objective fee mappings.
                  </p>
                </div>
              </section>

              {/* Company Timeline */}
              <section className="space-y-12">
                <h3 className="text-xl font-heading font-extrabold text-[#222222] text-center uppercase tracking-wider">Our Sourcing Legacy Timeline</h3>
                <div className="space-y-8 max-w-4xl mx-auto relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-gray-200">
                  {[
                    { year: '2002', title: 'Firm Incorporation', desc: 'Balraj Patel registers Balaji Sourcing, specializing in Satellite and Bodakdev high-end plots.' },
                    { year: '2008', title: 'Commercial Expansion', desc: 'Extends service models to corporate retail spaces and industrial parcels across Changodar.' },
                    { year: '2017', title: 'GUJRERA Pioneers', desc: 'Quickly aligns firm procedures to strict RERA parameters, ensuring absolute client safety.' },
                    { year: '2026', title: 'Fullstack Corporate Sourcing', desc: 'Sourcing, leasing, and wealth modeling operations for luxury estates and global funds.' }
                  ].map((evt, idx) => (
                    <div key={idx} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 md:gap-0 pl-10 md:pl-0">
                      <div className="md:w-[45%] md:text-right">
                        <span className="text-[#F97316] font-heading font-bold text-lg md:text-xl block">{evt.year}</span>
                        <h4 className="font-heading font-bold text-gray-900 text-sm">{evt.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{evt.desc}</p>
                      </div>
                      <div className="absolute left-3.5 md:left-1/2 -translate-x-1/2 bg-[#F97316] w-4.5 h-4.5 rounded-full border-4 border-white shadow-sm" />
                      <div className="hidden md:block md:w-[45%]" />
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* --- PAGE: SERVICES --- */}
          {currentPage === 'services' && (
            <motion.div 
              key="services" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20"
            >
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Client Offerings</span>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight text-[#222222]">Our Sourcing Services</h1>
                <p className="text-gray-500 text-sm leading-relaxed">Comprehensive, technical frameworks addressing residential, commercial, industrial, and investment needs in Ahmedabad.</p>
              </div>

              <div className="space-y-24">
                {services.map((srv, index) => (
                  <div key={srv.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                      <img 
                        src={srv.image} 
                        alt={srv.title} 
                        className="rounded-2xl shadow-md w-full h-[350px] object-cover animate-image-zoom"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="lg:col-span-7 space-y-6">
                      <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Advisory Pillar 0{index + 1}</span>
                      <h2 className="text-2xl font-heading font-bold text-[#222222] tracking-tight">{srv.title}</h2>
                      <p className="text-gray-600 text-xs leading-relaxed">{srv.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <span className="block font-heading font-bold text-xs text-gray-800 uppercase tracking-wider">Key Benefits</span>
                          <ul className="space-y-1.5 text-xs text-gray-500">
                            {srv.benefits.map((ben, bIdx) => (
                              <li key={bIdx} className="flex items-center gap-1.5">✔ {ben}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <span className="block font-heading font-bold text-xs text-gray-800 uppercase tracking-wider">Advisory Process</span>
                          <ol className="space-y-1.5 text-xs text-gray-500 list-decimal pl-4">
                            {srv.process.map((prc, pIdx) => (
                              <li key={pIdx}>{prc}</li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      <button 
                        onClick={() => setCurrentPage('contact')}
                        className="bg-[#222222] hover:bg-black text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        Enquire Regarding This Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* --- PAGE: PROPERTIES --- */}
          {currentPage === 'properties' && (
            <motion.div 
              key="properties" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Premium Listings</span>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight text-[#222222]">Ahmedabad Real Estate Directory</h1>
                <p className="text-gray-500 text-sm">Use structural filters to refine listings for luxury mansions, grade-A commercial offices, or logistics warehouses.</p>
              </div>

              {/* Dynamic Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-6">
                {[
                  { label: 'All Listings', filter: 'all' },
                  { label: 'Residential', filter: 'Residential' },
                  { label: 'Commercial', filter: 'Commercial' },
                  { label: 'Industrial & GIDC', filter: 'Industrial' },
                  { label: 'Investment Advisory', filter: 'Investment' },
                  { label: 'Luxury Estates', filter: 'Luxury' },
                  { label: 'Corporate Rentals', filter: 'Rental' }
                ].map((btn) => (
                  <button
                    key={btn.filter}
                    onClick={() => setPropertyFilter(btn.filter)}
                    className={`px-4.5 py-2.5 rounded-lg text-xs font-semibold transition-all border ${
                      propertyFilter === btn.filter
                        ? 'bg-[#F97316] text-white border-[#F97316] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#F97316] hover:text-[#F97316]'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Grid of properties */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties
                  .filter((p) => propertyFilter === 'all' || p.type === propertyFilter)
                  .map((prop) => (
                    <div key={prop.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                      <div className="relative h-56 overflow-hidden bg-gray-100">
                        <img 
                          src={prop.image} 
                          alt={prop.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-4 left-4 bg-white text-[#222222] text-[10px] font-bold py-1 px-3.5 rounded-md uppercase tracking-wider shadow">
                          {prop.type}
                        </span>
                        <span className="absolute bottom-4 right-4 bg-[#F97316] text-white text-xs font-bold py-1 px-3 rounded-md shadow">
                          {prop.status}
                        </span>
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[#F97316] font-bold text-lg">{prop.price}</span>
                            <span className="text-xs text-gray-500 font-medium">{prop.specs.area}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#F97316] transition-colors">{prop.title}</h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1.5">
                            <MapPin className="w-3.5 h-3.5" /> {prop.location}
                          </p>
                        </div>

                        <div className="border-t border-b border-gray-100 py-3 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {prop.description}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {prop.amenities.map((am, idx) => (
                            <span key={idx} className="bg-[#F8F8F8] text-gray-600 text-[10px] font-semibold py-1 px-2.5 rounded border border-gray-100">
                              {am}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2 flex gap-2">
                          <button 
                            onClick={() => setSelectedPropertyEnquiry(prop)}
                            className="flex-1 bg-[#222222] hover:bg-black text-white text-xs py-2.5 rounded-lg font-bold transition-all text-center flex items-center justify-center gap-1"
                          >
                            Get Brochure Brochure
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* --- PAGE: INVESTMENT ADVISORY --- */}
          {currentPage === 'investment' && (
            <motion.div 
              key="investment" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16"
            >
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Wealth defense</span>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight text-[#222222]">Investment Advisory Hub</h1>
                <p className="text-gray-500 text-sm">Evaluate capital allocations, compile ROI yields, and compute loan EMIs.</p>
              </div>

              {/* Calculators Suite */}
              <section className="space-y-8">
                <div className="text-center">
                  <h2 className="text-xl font-heading font-extrabold uppercase tracking-wider text-gray-800">Direct Sourcing Calculators</h2>
                  <p className="text-gray-500 text-xs mt-1">Simulate real estate investments under current RBI & municipal standards.</p>
                </div>
                <Calculators />
              </section>

              {/* Sourcing Strategy Info Grid */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: 'Tax Shields & Deductions', text: 'Secure maximum deductions under section 24 and 80EEA on Gujarat residential home purchases.' },
                  { title: 'Rental Cash Escalation', text: 'Simulate double-net (NNN) corporate leases featuring a locked 15% rent raise compounded every 3 years.' },
                  { title: 'Urban Growth Vector analysis', text: 'We map commercial development vectors (Dholera, GIFT, Sanand GIDC) to optimize entry valuations.' },
                  { title: 'Portfolio diversification', text: 'Balance highly volatile equity positions using resilient, income-producing brick-and-mortar assets.' }
                ].map((strat, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[#F97316] font-heading font-bold text-xs uppercase block tracking-wider">0{idx + 1}. {strat.title}</span>
                    <p className="text-gray-500 text-xs leading-relaxed">{strat.text}</p>
                  </div>
                ))}
              </section>
            </motion.div>
          )}

          {/* --- PAGE: PROJECTS --- */}
          {currentPage === 'projects' && (
            <motion.div 
              key="projects" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16"
            >
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Corporate Landmarks</span>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight text-[#222222]">Completed & Ongoing Developments</h1>
                <p className="text-gray-500 text-sm">Explore Balaji landmark developments constructed or managed across Ahmedabad corridor.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                    <div className="relative h-56 overflow-hidden">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <span className="absolute top-4 left-4 bg-white text-[#222222] text-[10px] font-bold py-1 px-3.5 rounded uppercase tracking-wider shadow">
                        {proj.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <span className="text-xs text-gray-400 block font-semibold">{proj.location}</span>
                        <h3 className="font-heading font-bold text-[#222222] text-base mt-1">{proj.title}</h3>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Milestone status:</span>
                          <span className="font-bold text-gray-800">{proj.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total Valuation:</span>
                          <span className="font-bold text-[#F97316]">{proj.investmentValue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Timeline check:</span>
                          <span className="font-medium text-gray-600">{proj.timeline}</span>
                        </div>
                      </div>

                      <p className="text-gray-500 text-xs leading-relaxed border-t border-gray-100 pt-3">
                        {proj.description}
                      </p>

                      <button 
                        onClick={() => setCurrentPage('contact')}
                        className="w-full bg-[#222222] hover:bg-black text-white py-2.5 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                      >
                        Enquire Milestone Brochure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* --- PAGE: GALLERY --- */}
          {currentPage === 'gallery' && (
            <motion.div 
              key="gallery" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Visual Assets</span>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight text-[#222222]">Corporate Media Gallery</h1>
                <p className="text-gray-500 text-sm">Explore images of constructed projects, office seminars, site tours, and corporate events.</p>
              </div>

              {/* Gallery Filter buttons */}
              <div className="flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-6">
                {[
                  { label: 'All Photos', filter: 'all' },
                  { label: 'Headquarters', filter: 'Office' },
                  { label: 'Site Tours', filter: 'Site Visit' },
                  { label: 'Under Construction', filter: 'Construction' },
                  { label: 'Completed Developments', filter: 'Completed Projects' },
                  { label: 'Corporate Events', filter: 'Corporate Events' }
                ].map((btn) => (
                  <button
                    key={btn.filter}
                    onClick={() => setGalleryFilter(btn.filter)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      galleryFilter === btn.filter
                        ? 'bg-[#F97316] text-white border-[#F97316]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#F97316]'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Masonry image grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { title: 'Corporate Head Office Lobby', category: 'Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
                  { title: 'Site Tour at Bodakdev Villa', category: 'Site Visit', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800' },
                  { title: 'Balaji Heights Foundation', category: 'Construction', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' },
                  { title: 'Completed Trade Center facade', category: 'Completed Projects', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
                  { title: 'Annual Property Advisory 2025', category: 'Corporate Events', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800' },
                  { title: 'Commercial complex structural check', category: 'Site Visit', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800' }
                ]
                  .filter((item) => galleryFilter === 'all' || item.category === galleryFilter)
                  .map((item, index, filteredArray) => (
                    <div 
                      key={index} 
                      onClick={() => setLightbox({
                        isOpen: true,
                        images: filteredArray.map(f => f.url),
                        titles: filteredArray.map(f => f.title),
                        activeIndex: index
                      })}
                      className="group relative h-64 overflow-hidden rounded-2xl border border-gray-100 shadow-sm cursor-zoom-in bg-gray-100"
                    >
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#222222]/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white z-10" />
                      <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-white">
                        <span className="block text-[10px] font-bold uppercase text-[#F97316] mb-0.5">{item.category}</span>
                        <span className="block text-xs font-semibold leading-tight">{item.title}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* --- PAGE: BLOGS STREAM --- */}
          {currentPage === 'blog' && (
            <motion.div 
              key="blog" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12"
            >
              {activeBlog ? (
                /* --- BLOG DETAIL VIEW --- */
                <article className="max-w-3xl mx-auto space-y-8 animate-fade-up">
                  <button 
                    onClick={() => setActiveBlog(null)}
                    className="text-xs font-bold text-gray-500 hover:text-[#F97316] flex items-center gap-1 focus:outline-none"
                  >
                    ← Back to insights stream
                  </button>

                  <div className="space-y-4">
                    <span className="bg-orange-50 text-orange-700 text-xs font-bold py-1 px-3.5 rounded-md uppercase tracking-wider">
                      {activeBlog.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-[#222222] leading-tight">
                      {activeBlog.title}
                    </h1>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>Date: {activeBlog.date}</span>
                      <span>•</span>
                      <span>{activeBlog.readTime}</span>
                    </div>
                  </div>

                  <img src={activeBlog.image} alt={activeBlog.title} className="w-full h-[380px] object-cover rounded-2xl animate-image-zoom" referrerPolicy="no-referrer" />

                  <div className="text-gray-700 leading-relaxed text-sm space-y-6 whitespace-pre-wrap font-sans">
                    {activeBlog.content}
                  </div>

                  <div className="border-t border-gray-200 pt-8 mt-12 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="space-y-1">
                      <span className="block font-heading font-bold text-sm text-gray-900">Want professional advisory?</span>
                      <span className="block text-xs text-gray-500">Schedule a secure, confidential consult session with Balraj Patel.</span>
                    </div>
                    <button 
                      onClick={() => setCurrentPage('contact')}
                      className="bg-[#F97316] text-white py-2.5 px-6 rounded-lg text-xs font-bold hover:bg-[#EA580C] shadow-sm focus:outline-none cursor-pointer"
                    >
                      Book Free Consultation
                    </button>
                  </div>
                </article>
              ) : (
                /* --- BLOG STREAM LIST --- */
                <div className="space-y-12">
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Market intelligence</span>
                    <h1 className="text-4xl font-heading font-extrabold tracking-tight text-[#222222]">Private Advisory Insights</h1>
                    <p className="text-gray-500 text-sm">Review detailed audits, news, and checklists compiled by Balaji executives.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((b) => (
                      <div key={b.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                        <div>
                          <div className="h-52 overflow-hidden bg-gray-50">
                            <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                          </div>
                          <div className="p-6 space-y-3.5">
                            <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-wider block">{b.category}</span>
                            <h3 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-[#F97316] transition-colors">{b.title}</h3>
                            <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{b.excerpt}</p>
                          </div>
                        </div>

                        <div className="px-6 pb-6 pt-3 border-t border-gray-50 flex justify-between items-center">
                          <span className="text-[10px] text-gray-400 font-semibold uppercase">{b.date} • {b.readTime}</span>
                          <button 
                            onClick={() => {
                              setActiveBlog(b);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-[#F97316] font-bold text-xs flex items-center gap-0.5 hover:translate-x-1 transition-transform"
                          >
                            Read article <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* --- PAGE: FAQS --- */}
          {currentPage === 'faqs' && (
            <motion.div 
              key="faqs" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="max-w-4xl mx-auto px-4 py-16 space-y-12"
            >
              <div className="text-center space-y-3">
                <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Client Help</span>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h1>
                <p className="text-gray-500 text-sm">Verify procedures regarding RERA clearances, capital tax brackets, and bank loan integrations.</p>
              </div>

              {/* FAQ Search Inputs */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search questions (e.g. RERA, commercial...)" 
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] outline-none"
                />
              </div>

              {/* FAQ Accordions Render */}
              <div className="space-y-4">
                {faqs
                  .filter(f => f.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || f.answer.toLowerCase().includes(faqSearchQuery.toLowerCase()))
                  .map((faq) => (
                    <div key={faq.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-2 text-sm">
                      <span className="block text-[10px] font-bold text-[#F97316] uppercase tracking-wider">
                        {faq.category} FAQ
                      </span>
                      <h3 className="font-bold text-gray-900 text-sm">{faq.question}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed pt-1">{faq.answer}</p>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* --- PAGE: CONTACT COORDINATES --- */}
          {currentPage === 'contact' && (
            <motion.div 
              key="contact" 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -15 }} 
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16"
            >
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Connect With Us</span>
                <h1 className="text-4xl font-heading font-extrabold tracking-tight text-[#222222]">Headquarters Coordinates</h1>
                <p className="text-gray-500 text-sm">Secure an appointment or request customized site tours.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Column 1: Contact Coordinates Card */}
                <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
                  <h3 className="font-heading font-bold text-gray-900 text-lg uppercase tracking-wider border-b border-gray-100 pb-3">Corporate Office</h3>
                  
                  <ul className="space-y-6 text-sm">
                    <li className="flex gap-4">
                      <div className="bg-orange-50 text-[#F97316] p-2.5 rounded-lg shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-bold text-gray-800 uppercase text-[10px] tracking-widest mb-1">Corporate Address</span>
                        <p className="text-gray-600 text-xs leading-relaxed">{activeSettings.address}</p>
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <div className="bg-orange-50 text-[#F97316] p-2.5 rounded-lg shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-bold text-gray-800 uppercase text-[10px] tracking-widest mb-1">Support Hotlines</span>
                        <a href={`tel:${activeSettings.phone}`} className="text-gray-600 text-xs hover:text-[#F97316]">{activeSettings.phone}</a>
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <div className="bg-orange-50 text-[#F97316] p-2.5 rounded-lg shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-bold text-gray-800 uppercase text-[10px] tracking-widest mb-1">Corporate Email</span>
                        <a href={`mailto:${activeSettings.email}`} className="text-gray-600 text-xs hover:text-[#F97316]">{activeSettings.email}</a>
                      </div>
                    </li>

                    <li className="flex gap-4">
                      <div className="bg-orange-50 text-[#F97316] p-2.5 rounded-lg shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-bold text-gray-800 uppercase text-[10px] tracking-widest mb-1">Operating Hours</span>
                        <p className="text-gray-600 text-xs">{activeSettings.hours}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Direct Consultation Form */}
                <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                  <h3 className="font-bold text-gray-900 text-lg uppercase tracking-wider border-b border-gray-100 pb-3">Book Secure session</h3>
                  <form onSubmit={handleGeneralEnquirySubmit} className="space-y-4">
                    {enquiryStatus === 'success' && (
                      <div className="bg-green-50 text-green-700 text-xs p-3 rounded-lg border border-green-100">
                        ✓ Consultation inquiry logged successfully. A partner will contact you within 2 business hours.
                      </div>
                    )}
                    {enquiryStatus === 'error' && (
                      <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-100">
                        ⚠ Please enter your name, valid phone number, and query description.
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Corporate Name *</label>
                        <input 
                          type="text" 
                          placeholder="Your full name" 
                          value={generalEnquiry.name}
                          onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, name: e.target.value })}
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Mobile Contact *</label>
                        <input 
                          type="tel" 
                          placeholder="+91" 
                          value={generalEnquiry.phone}
                          onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, phone: e.target.value })}
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Email Coordinator</label>
                      <input 
                        type="email" 
                        placeholder="name@company.com" 
                        value={generalEnquiry.email}
                        onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, email: e.target.value })}
                        className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Query Class</label>
                      <select 
                        value={generalEnquiry.type}
                        onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, type: e.target.value as any })}
                        className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-[#F97316] outline-none animate-fade-in"
                      >
                        <option value="General">General Consultation</option>
                        <option value="Property">Direct Property Sourcing</option>
                        <option value="Consultation">Wealth & Portfolio Planning</option>
                        <option value="Site Visit">Request Scheduled Site Tour</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Query Details *</label>
                      <textarea 
                        placeholder="Please detail your budget, timeline constraints, or RERA requests..."
                        value={generalEnquiry.message}
                        onChange={(e) => setGeneralEnquiry({ ...generalEnquiry, message: e.target.value })}
                        rows={4}
                        className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                        required
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-sm"
                    >
                      Book Professional Advisor Session ✓
                    </button>
                  </form>
                </div>
              </div>

              {/* Full Interactive GMap Segment */}
              <div className="rounded-2xl overflow-hidden h-96 border border-gray-200 shadow-sm relative">
                <iframe 
                  title="Corporate Headquarters Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.697914801062!2d72.50639911542152!3d23.034863771650307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84cad42c7527%3A0xe62e49c71624a0d8!2sSushila%20Suresh%20Bhavan%2C%20Sindhu%20Bhavan%20Rd%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Corporate Professional Footer */}
      <Footer 
        settings={activeSettings} 
        setCurrentPage={setCurrentPage} 
        onNewsletterSubscribe={handleNewsletterSubscribe} 
      />

      {/* --- POPUP MODAL: PROPERTY ENQUIRY --- */}
      {selectedPropertyEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/80 backdrop-blur-xs animate-fade-in" id="property-enquiry-modal">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg w-full border border-gray-100 animate-scale-up">
            <div className="bg-[#222222] text-white p-5 flex justify-between items-center border-b border-[#F97316]">
              <div>
                <span className="text-[#F97316] text-[10px] font-bold uppercase tracking-widest block">Brochure Request</span>
                <h3 className="font-heading font-bold text-sm text-white leading-tight mt-0.5">{selectedPropertyEnquiry.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedPropertyEnquiry(null)}
                className="text-gray-400 hover:text-white bg-white/10 p-1.5 rounded-full cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handlePropertyEnquirySubmit} className="p-6 space-y-4 text-sm text-[#222222]">
              <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                <img src={selectedPropertyEnquiry.image} alt={selectedPropertyEnquiry.title} className="w-12 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                <div>
                  <span className="block font-heading font-bold text-[#F97316] text-sm">{selectedPropertyEnquiry.price}</span>
                  <span className="block text-xs text-gray-500">{selectedPropertyEnquiry.location}</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your name" 
                  className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Mobile Contact *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+91" 
                    className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Corporate Email</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="name@company.com" 
                    className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Message Detail</label>
                <textarea 
                  name="message"
                  defaultValue={`Please share detailed technical specifications, pricing sheet, and structural blueprints for ${selectedPropertyEnquiry.title}.`}
                  rows={3}
                  className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#F97316] outline-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Log Sourcing Request & Get Brochure
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- LIGHTBOX --- */}
      <Lightbox 
        isOpen={lightbox.isOpen} 
        onClose={() => setLightbox({ ...lightbox, isOpen: false })} 
        images={lightbox.images} 
        activeIndex={lightbox.activeIndex} 
        setActiveIndex={(idx) => setLightbox({ ...lightbox, activeIndex: idx })} 
        titles={lightbox.titles} 
      />

      {/* --- QUICK FLOATING COMMUNICATION WIDGETS --- */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <a 
          href={`https://wa.me/${activeSettings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Balaji%20Consultancy,%20I%20am%20interested%20in%20property%20advisory%20services.`}
          target="_blank" 
          referrerPolicy="no-referrer"
          className="bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-white"
          title="WhatsApp Support Chat"
        >
          <MessageSquare className="w-5 h-5 fill-white text-white" />
        </a>
        
        {/* Phone Button */}
        <a 
          href={`tel:${activeSettings.phone}`}
          className="bg-[#F97316] text-white p-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-white"
          title="Call Principal Sourcing Hotline"
        >
          <Phone className="w-5 h-5 fill-white text-white" />
        </a>
      </div>

    </div>
  );
}
