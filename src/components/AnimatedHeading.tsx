import { useEffect, useState } from 'react';

const CHAR_DELAY = 30;
const INITIAL_DELAY = 200;
const CHAR_DURATION = 500;

/** Heading whose characters slide in from the left one by one. `\n` in `text` breaks lines. */
export function AnimatedHeading({ text, className = '', style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), INITIAL_DELAY);
    return () => clearTimeout(t);
  }, []);

  const lines = text.split('\n');

  return (
    <h1 className={className} style={style} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, lineIndex) => {
        // Group characters by word so lines only wrap between words; each character still animates on its own.
        let charIndex = 0;
        const words = line.split(' ');
        const charSpan = (char: string, i: number) => (
          <span
            key={i}
            className="inline-block"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateX(0)' : 'translateX(-18px)',
              transition: `opacity ${CHAR_DURATION}ms ease, transform ${CHAR_DURATION}ms ease`,
              transitionDelay: `${lineIndex * line.length * CHAR_DELAY + i * CHAR_DELAY}ms`,
            }}
          >
            {char}
          </span>
        );
        return (
          <span key={lineIndex} className="block" aria-hidden="true">
            {words.map((word, w) => {
              const start = charIndex;
              charIndex += word.length + 1;
              return (
                <span key={w}>
                  <span className="inline-block whitespace-nowrap">{word.split('').map((c, k) => charSpan(c, start + k))}</span>
                  {w < words.length - 1 && charSpan('\u00A0', start + word.length)}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
