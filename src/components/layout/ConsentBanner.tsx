import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { analyticsConfigured, getConsent, setConsent } from '@/lib/analytics';

/** Asks before loading analytics. Shown only when GA4 / Meta Pixel IDs are configured. */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(analyticsConfigured() && getConsent() === null), []);
  const choose = (v: 'granted' | 'denied') => {
    setConsent(v);
    setVisible(false);
  };
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed inset-x-3 bottom-[88px] z-[60] mx-auto max-w-xl rounded-xl border border-line bg-white p-5 shadow-lift md:bottom-6"
        >
          <p className="text-sm text-ink">
            We use analytics cookies to understand how visitors use this site. See our{' '}
            <Link to="/privacy-policy" className="text-navy-800 underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => choose('granted')} className="btn-navy !py-2">
              Accept
            </button>
            <button type="button" onClick={() => choose('denied')} className="btn-outline !py-2">
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
