import React, { useState } from 'react';
import { Landmark, Mail, Phone, MapPin, Clock, MessageSquare, Facebook, Linkedin, Twitter, ArrowUp, Send } from 'lucide-react';
import { AppSettings } from '../types';

interface FooterProps {
  settings: AppSettings;
  setCurrentPage: (page: string) => void;
  onNewsletterSubscribe: (email: string) => Promise<boolean>;
}

export default function Footer({ settings, setCurrentPage, onNewsletterSubscribe }: FooterProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setLoading(true);
    setStatus('idle');
    try {
      const ok = await onNewsletterSubscribe(email);
      if (ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-gray-300 border-t-4 border-[#F97316] relative pt-16 pb-8" id="corporate-footer">
      
      {/* Scroll to Top Trigger */}
      <button 
        onClick={scrollToTop} 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F97316] text-white p-3.5 rounded-full shadow-lg hover:bg-[#EA580C] hover:scale-105 active:scale-95 transition-all focus:outline-none"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Company Profile */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="bg-[#F97316] p-2 rounded-lg text-white">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-heading font-bold text-lg text-white tracking-tight leading-none">
                  BALAJI
                </span>
                <span className="block text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                  Consultancy Services
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Balaji Consultancy Services is Ahmedabad's premier corporate real estate acquisition and high-yield investment advisory firm, trusted by businesses, luxury families, and NRI portfolios.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a 
                href={settings.facebook} 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="bg-gray-800 hover:bg-[#F97316] p-2.5 rounded-lg text-gray-400 hover:text-white transition-all focus:outline-none"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={settings.linkedin} 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="bg-gray-800 hover:bg-[#F97316] p-2.5 rounded-lg text-gray-400 hover:text-white transition-all focus:outline-none"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={settings.twitter} 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="bg-gray-800 hover:bg-[#F97316] p-2.5 rounded-lg text-gray-400 hover:text-white transition-all focus:outline-none"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 border-b border-gray-800 pb-2">
              Corporate Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home Page', id: 'home' },
                { label: 'About Our Mission', id: 'about' },
                { label: 'Sourcing Services', id: 'services' },
                { label: 'Featured Properties', id: 'properties' },
                { label: 'Investment Planning', id: 'investment' },
                { label: 'Corporate Projects', id: 'projects' },
                { label: 'Press & Blogs', id: 'blog' },
                { label: 'Frequently Asked Questions', id: 'faqs' }
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleNavClick(link.id)}
                    className="text-gray-400 hover:text-[#F97316] transition-colors text-left focus:outline-none"
                  >
                    • {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contacts & Address */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 border-b border-gray-800 pb-2">
              Head Office Coordinates
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <span className="text-gray-400 leading-relaxed text-xs">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F97316] shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-gray-400 hover:text-[#F97316]">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F97316] shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-[#F97316]">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <span className="text-gray-400 text-xs">
                  {settings.hours}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Sourcing */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider border-b border-gray-800 pb-2">
              Corporate Intelligence
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to Balaji’s Private Market Intelligence for monthly premium property reports and Ahmedabad growth audits.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  placeholder="Enter Corporate Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800/80 text-white placeholder-gray-500 border border-gray-700 rounded-lg py-2.5 px-3.5 text-xs focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] w-full focus:outline-none"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white p-2.5 rounded-lg transition-all focus:outline-none shrink-0"
              >
                {loading ? <span className="animate-spin block">...</span> : <Send className="w-4 h-4" />}
              </button>
            </form>
            {status === 'success' && (
              <p className="text-green-400 text-xs font-semibold animate-fade-in">
                ✓ Subscription confirmed successfully.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-xs animate-fade-in">
                ⚠ Please enter a valid corporate email.
              </p>
            )}

            {/* Embedded Mini-Map Placeholder for Ahmedabad */}
            <div className="mt-2 rounded-lg overflow-hidden border border-gray-800 h-24 relative bg-gray-950">
              <iframe 
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.697914801062!2d72.50639911542152!3d23.034863771650307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84cad42c7527%3A0xe62e49c71624a0d8!2sSushila%20Suresh%20Bhavan%2C%20Sindhu%20Bhavan%20Rd%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, opacity: 0.8 }} 
                allowFullScreen={false} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Balaji Consultancy Services. All Rights Reserved. Private Real Estate & Wealth Advisory.
          </p>
          <div className="flex gap-6 text-gray-400">
            <span>RERA No: PR/GJ/AHMEDABAD/BODAKDEV/AA00412/170726</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
