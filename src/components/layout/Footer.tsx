import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { companyConfig, getPhoneLink } from '../../data/company';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#122217] text-[#D8E2D9] pt-16 pb-12 border-t border-[#1D3525]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-[#25422F]">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6C4 6 12 7 15 13C16.5 16 15 20 15 20" stroke="#FAF9F5" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M4 14C4 14 9 15 11 18" stroke="#FAF9F5" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="18" cy="8" r="2.5" fill="#C87D55" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Regpro
              </span>
            </Link>

            <p className="text-xs text-[#A8BCAE] italic font-serif">
              "{companyConfig.subtagline}"
            </p>

            <p className="text-xs text-[#8DA190] leading-relaxed">
              Regpro is India&apos;s trusted business registration, government documentation, and statutory compliance assistance platform for ambitious founders and enterprises.
            </p>

            {/* Badges */}
            <div className="flex items-center gap-3 pt-2 text-[#ABC0B0]">
              <div className="flex items-center gap-1.5 text-[11px] bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
                <span>100% Secure &amp; Confidential</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8BCAE]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8BCAE]">
              <li>
                <Link to="/services/private-limited-company-registration" className="hover:text-white transition-colors">
                  Business Registration
                </Link>
              </li>
              <li>
                <Link to="/services/gst-registration" className="hover:text-white transition-colors">
                  GST Registration
                </Link>
              </li>
              <li>
                <Link to="/services/udyam-msme-registration" className="hover:text-white transition-colors">
                  MSME Registration
                </Link>
              </li>
              <li>
                <Link to="/services/trademark-registration" className="hover:text-white transition-colors">
                  Trademark Registration
                </Link>
              </li>
              <li>
                <Link to="/services/dpiit-startup-india-recognition" className="hover:text-white transition-colors">
                  Startup India Recognition
                </Link>
              </li>
              <li>
                <Link to="/services/llp-registration" className="hover:text-white transition-colors">
                  LLP Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-[#A8BCAE]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#52B788] shrink-0" />
                <a href={getPhoneLink()} className="hover:text-white transition-colors">
                  {companyConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#52B788] shrink-0" />
                <a href={`mailto:${companyConfig.email}`} className="hover:text-white transition-colors">
                  {companyConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#52B788] shrink-0 mt-0.5" />
                <span>
                  {companyConfig.address}, {companyConfig.city}, {companyConfig.country}
                </span>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#A8BCAE]">
              <p className="font-semibold text-white mb-0.5">Assistance Hours:</p>
              <p>{companyConfig.officeHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E9081]">
          <p>&copy; {new Date().getFullYear()} Regpro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#25422F]">|</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

