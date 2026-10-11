import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  serviceTitle = 'Free Consultation',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#162A1D]/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-modal overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9F5] text-[#526056] hover:text-[#162A1D] hover:bg-[#E8EFE9] transition-colors z-20"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <EnquiryForm
          defaultService={serviceTitle}
          source="modal"
          title={`Enquire for ${serviceTitle}`}
          onSuccess={() => {}}
        />
      </div>
    </div>
  );
};

