import React, { useEffect, useMemo, useRef } from 'react';

type Props = {
  text: string;
  className?: string;
  mode?: 'word' | 'char';
  stagger?: number; // seconds between items (default 0.05s)
  duration?: number; // ms
};

export function TextReveal({ text, className = '', mode = 'word', stagger = 0.05, duration = 900 }: Props) {
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const selector = mode === 'char' ? '.apple-char' : '.apple-word';
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(selector));

    nodes.forEach((n, i) => {
      const delay = (i * stagger).toFixed(3);
      n.style.animationDelay = `${delay}s`;
      n.style.animationDuration = `${duration}ms`;
      // ensure smooth rendering during the animated blur/translate
      n.style.willChange = 'opacity, transform, filter';
    });
  }, [text, mode, stagger, duration]);

  if (mode === 'char') {
    const chars = Array.from(text);
    return (
      <span ref={containerRef} className={className} aria-hidden={true}>
        {chars.map((ch, i) => (
          <span key={i} className="apple-text-reveal apple-char">
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
        <span className="sr-only">{text}</span>
      </span>
    );
  }

  // default: word mode
  const words = text.split(/(\s+)/);
  return (
    <span ref={containerRef} className={className} aria-hidden={true}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) {
          // render a non-breaking sequence of spaces to preserve spacing
          return (
            <span key={`s-${i}`} className="apple-text-reveal apple-word" aria-hidden={true}>
              {Array.from({ length: w.length }).map((_, si) => (
                <span key={si}>&nbsp;</span>
              ))}
            </span>
          );
        }

        return (
          <span key={i} className="apple-text-reveal apple-word" aria-hidden={true}>
            {w}
          </span>
        );
      })}
      <span className="sr-only">{text}</span>
    </span>
  );
}

export default TextReveal;
