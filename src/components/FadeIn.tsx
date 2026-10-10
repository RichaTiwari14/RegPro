import { useEffect, useState, type ReactNode } from 'react';

/** Fades its children in after `delay` ms, over `duration` ms. */
export function FadeIn({
  delay = 0,
  duration = 1000,
  className = '',
  children,
}: {
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className={`transition-opacity ${visible ? 'opacity-100' : 'opacity-0'} ${className}`} style={{ transitionDuration: `${duration}ms` }}>
      {children}
    </div>
  );
}
