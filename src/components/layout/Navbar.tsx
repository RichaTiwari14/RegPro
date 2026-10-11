import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { servicesData } from '../../data/services';
import { getWhatsAppLink, getPhoneLink, companyConfig } from '../../data/company';

interface NavbarProps {
  onOpenConsultation: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E3EAE4] py-3.5 shadow-subtle'
            : 'bg-[#FAF9F5] py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#162A1D] flex items-center justify-center text-white shadow-subtle group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6C4 6 12 7 15 13C16.5 16 15 20 15 20" stroke="#FAF9F5" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M4 14C4 14 9 15 11 18" stroke="#FAF9F5" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="18" cy="8" r="2.5" fill="#C87D55" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#162A1D] leading-none">
                  Regpro
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#7E9081] mt-0.5">
                  Business &amp; Legal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <Link
                        to="/services"
                        className={`px-3 py-2 text-sm font-medium rounded-full transition-colors inline-flex items-center gap-1 ${
                          location.pathname.startsWith('/services')
                            ? 'text-[#162A1D] font-semibold bg-[#E8EFE9]'
                            : 'text-[#526056] hover:text-[#162A1D] hover:bg-[#E8EFE9]/50'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      </Link>

                      {/* Dropdown Menu */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-modal border border-[#E3EAE4] p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                          <div className="px-3 py-1.5 border-b border-[#F4EFE6] mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#7E9081]">
                              Key Services
                            </span>
                            <Link to="/services" className="text-[11px] font-semibold text-[#162A1D] hover:underline">
                              View All 15 &rarr;
                            </Link>
                          </div>
                          <div className="space-y-1">
                            {servicesData.slice(0, 6).map((service) => (
                              <Link
                                key={service.slug}
                                to={`/services/${service.slug}`}
                                className="block px-3 py-2 text-xs rounded-xl hover:bg-[#FAF9F5] transition-colors"
                              >
                                <div className="font-semibold text-[#162A1D]">{service.name}</div>
                                <div className="text-[#7E9081] text-[11px] flex justify-between mt-0.5">
                                  <span>{service.category}</span>
                                  <span className="font-semibold text-[#C87D55]">{service.startingPrice}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                      isActive
                        ? 'text-[#162A1D] font-semibold bg-[#E8EFE9]'
                        : 'text-[#526056] hover:text-[#162A1D] hover:bg-[#E8EFE9]/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Button & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              {/* Primary Consultation Pill Button as in mock */}
              <button
                onClick={() => onOpenConsultation()}
                className="hidden sm:inline-flex items-center gap-2 bg-[#162A1D] hover:bg-[#1D3525] text-white text-xs lg:text-sm font-semibold px-5 py-2.5 rounded-full shadow-subtle hover:shadow-card transition-all duration-200 cursor-pointer"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#162A1D] md:hidden hover:bg-[#E8EFE9] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-30 bg-[#FAF9F5] flex flex-col md:hidden p-6 animate-in fade-in duration-200 overflow-y-auto">
          <div className="flex flex-col space-y-2 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-4 py-3 text-base font-semibold text-[#162A1D] rounded-xl hover:bg-[#E8EFE9] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#E3EAE4] pt-6 space-y-3 mt-auto">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#162A1D] text-white py-3.5 px-5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-card"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#E8EFE9] text-[#162A1D] rounded-full text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-[#2E6F40]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={getPhoneLink()}
                className="flex items-center justify-center gap-2 py-3 px-3 bg-[#E8EFE9] text-[#162A1D] rounded-full text-xs font-semibold"
              >
                <Phone className="w-4 h-4 text-[#162A1D]" />
                <span>Call Us</span>
              </a>
            </div>

            <p className="text-center text-xs text-[#7E9081] pt-2">
              {companyConfig.city}, India &bull; {companyConfig.phoneDisplay}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

