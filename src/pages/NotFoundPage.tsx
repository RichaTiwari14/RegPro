import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO title="Page Not Found | Regpro" description="The page you are looking for does not exist." />

      <main className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#FAF9F5]">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-[#E3EAE4] shadow-card">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF1E8] text-[#C87D55] flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>

          <h1 className="font-serif text-4xl font-bold text-[#162A1D] mb-2">404</h1>
          <h2 className="font-serif text-xl font-bold text-[#162A1D] mb-3">Page Not Found</h2>
          <p className="text-sm text-[#526056] mb-8 leading-relaxed">
            The page you are looking for might have been moved or does not exist. Browse our services or return home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#162A1D] text-white text-xs sm:text-sm font-semibold shadow-subtle hover:bg-[#1D3525] transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#DEE8E0] text-[#162A1D] text-xs sm:text-sm font-semibold hover:bg-[#FAF9F5] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Services</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

