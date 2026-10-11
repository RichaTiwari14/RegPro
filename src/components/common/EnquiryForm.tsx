import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../data/company';

interface EnquiryFormProps {
  defaultService?: string;
  source?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  defaultService = '',
  source = 'website',
  title = 'Get a Free Consultation',
  compact = false,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: defaultService,
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Please enter a valid full name';
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      // In production, this can POST to a Formspree / EmailJS / server endpoint configured in env
      // e.g. await fetch(import.meta.env.VITE_LEAD_API_URL, { method: 'POST', body: JSON.stringify({...formData, source}) });
      // We simulate realistic API request delay:
      if (source) {
        // Track lead source
      }
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStatus('success');
      if (onSuccess) onSuccess();
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send details. Please contact us directly on WhatsApp or phone.');
    }
  };

  const whatsappFollowUpText = `Hi Regpro! I just submitted an enquiry on your website for ${
    formData.service || 'business services'
  }. Name: ${formData.fullName}, Phone: ${formData.phone}. Please connect with me!`;

  if (status === 'success') {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DEE8E0] shadow-card text-center">
        <div className="w-16 h-16 bg-[#E8EFE9] text-[#162A1D] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#2E6F40]" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#162A1D] mb-2">Thank You, {formData.fullName.split(' ')[0]}!</h3>
        <p className="text-[#526056] text-sm mb-6">
          Your enquiry for <span className="font-medium text-[#162A1D]">{formData.service || 'Regpro Services'}</span> has been received. Our senior legal & tax consultant will review your details and reach out within 15–30 minutes.
        </p>

        {/* WhatsApp follow-up CTA */}
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E3EAE4] mb-4">
          <p className="text-xs text-[#526056] mb-3">Want an immediate consultation without waiting?</p>
          <a
            href={getWhatsAppLink(whatsappFollowUpText)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#1A3324] hover:bg-[#152A1E] text-white px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-subtle"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            Connect Instantly on WhatsApp
          </a>
        </div>

        <button
          onClick={() => {
            setStatus('idle');
            setFormData({ fullName: '', phone: '', email: '', service: defaultService, message: '' });
          }}
          className="text-xs text-[#526056] hover:text-[#162A1D] underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl border border-[#DEE8E0] shadow-card ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'}`}>
      <div className="mb-6">
        <h3 className="font-serif text-2xl font-bold text-[#162A1D] tracking-tight">{title}</h3>
        <p className="text-[#526056] text-sm mt-1">
          Speak with our compliance experts for free guidance tailored to your business.
        </p>
      </div>

      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#162A1D] mb-1.5 uppercase tracking-wider">
            Full Name <span className="text-[#C87D55]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: '' });
            }}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-[#162A1D] bg-[#FCFBF9] focus:bg-white focus:outline-none transition-all ${
              errors.fullName ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#E3EAE4] focus:border-[#162A1D]'
            }`}
          />
          {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-[#162A1D] mb-1.5 uppercase tracking-wider">
            Phone Number <span className="text-[#C87D55]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#7E9081]">
              +91
            </span>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm text-[#162A1D] bg-[#FCFBF9] focus:bg-white focus:outline-none transition-all ${
                errors.phone ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#E3EAE4] focus:border-[#162A1D]'
              }`}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-[#162A1D] mb-1.5 uppercase tracking-wider">
            Email Address <span className="text-[#C87D55]">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            className={`w-full px-4 py-3 rounded-xl border text-sm text-[#162A1D] bg-[#FCFBF9] focus:bg-white focus:outline-none transition-all ${
              errors.email ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-[#E3EAE4] focus:border-[#162A1D]'
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* Message / Requirement */}
        <div>
          <label className="block text-xs font-semibold text-[#162A1D] mb-1.5 uppercase tracking-wider">
            Message <span className="text-[#7E9081] font-normal normal-case">(Optional)</span>
          </label>
          <textarea
            rows={ compact ? 2 : 3 }
            placeholder="Tell us about your requirement (e.g. need GST for Bangalore office, forming Pvt Ltd, etc.)"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[#E3EAE4] text-sm text-[#162A1D] bg-[#FCFBF9] focus:bg-white focus:border-[#162A1D] focus:outline-none transition-all resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-[#162A1D] hover:bg-[#1D3525] text-white py-3.5 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-card hover:shadow-float transition-all duration-200 disabled:opacity-70 group cursor-pointer"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Your Details...
            </>
          ) : (
            <>
              Submit &amp; Get Expert Advice
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {/* Or WhatsApp Link underneath, matching mock */}
        <div className="pt-2 text-center">
          <a
            href={getWhatsAppLink(`Hi Regpro, I'd like to get advice on ${formData.service || 'registration services'}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2E6F40] hover:text-[#162A1D] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Or chat on WhatsApp for instant support</span>
          </a>
        </div>
      </form>
    </div>
  );
};
