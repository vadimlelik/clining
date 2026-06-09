type IconProps = { className?: string };

export function IconSparkles({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l1.2 4.2L17.5 7.5l-4.3 1.2L12 13l-1.2-4.3L6.5 7.5l4.3-1.3L12 2zM5 14l.8 2.8L8.5 18l-2.7.8L5 21.5l-.8-2.7L1.5 18l2.7-.8L5 14zm14 0l.8 2.8 2.7.8-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8.8-2.8z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconSofa({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 12V8a2 2 0 012-2h12a2 2 0 012 2v4M4 12v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12h16M7 18v2M17 18v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTruck({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 8h11v8H3V8zm11 2h3l3 3v3h-6v-6zM7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconShield({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3l7 3v6c0 4.5-3.2 7.8-7 9-3.8-1.2-7-4.5-7-9V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDroplet({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M12 2.5c3.5 4.5 6 7.8 6 11a6 6 0 11-12 0c0-3.2 2.5-6.5 6-11z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPhone({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M5 4h4l2 5-2 1.5a11 11 0 005.5 5.5L16 14l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMenu({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
