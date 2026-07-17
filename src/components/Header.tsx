import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, Landmark, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  contactPhone: string;
  contactWhatsApp: string;
}

export default function Header({ currentPage, setCurrentPage, contactPhone, contactWhatsApp }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Properties', id: 'properties' },
    { label: 'Investment', id: 'investment' },
    { label: 'Projects', id: 'projects' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Blog', id: 'blog' },
    { label: 'FAQs', id: 'faqs' },
    { label: 'Contact', id: 'contact' },
    { label: 'Admin', id: 'admin' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Upper Info Strip */}
      <div className="bg-[#222222] text-white text-xs py-2 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center border-b border-gray-800 gap-2">
        <div className="flex items-center gap-4 text-gray-300">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#F97316]" /> RERA Registered Advisory
          </span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline text-gray-400">Ahmedabad Real Estate & Investment Specialists</span>
        </div>
        <div className="flex items-center gap-6">
          <a href={`tel:${contactPhone}`} className="hover:text-[#F97316] transition-colors flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-[#F97316]" /> {contactPhone}
          </a>
          <a 
            href={`https://wa.me/${contactWhatsApp.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            referrerPolicy="no-referrer"
            className="hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5 text-green-500 fill-green-500" /> WhatsApp Support
          </a>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Left */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            id="header-logo"
          >
            <div className="bg-[#F97316] p-2.5 rounded-lg text-white group-hover:scale-105 transition-transform duration-300">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-heading font-bold text-lg md:text-xl text-[#222222] tracking-tight leading-none">
               A
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                Consultancy Services
              </span>
            </div>
          </button>

          {/* Menu Center (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === item.id 
                    ? 'text-[#F97316] bg-orange-50/60 font-semibold' 
                    : 'text-gray-600 hover:text-[#F97316] hover:bg-gray-50'
                }`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Button Right */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              id="header-cta"
            >
              Consultation
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#F97316] focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 shadow-xl absolute w-full left-0 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-[#F97316] bg-orange-50 font-semibold border-l-4 border-[#F97316]'
                      : 'text-gray-600 hover:text-[#F97316] hover:bg-gray-50'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-center bg-[#F97316] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#EA580C] transition-all"
                >
                  Book Free Consultation
                </button>
                <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
                  <span>{contactPhone}</span>
                  <span>|</span>
                  <span>Ahmedabad, Gujarat</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
