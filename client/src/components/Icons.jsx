const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const MicIcon = () => (
  <svg {...base}>
    <rect x="9" y="3" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);

export const MicOffIcon = () => (
  <svg {...base}>
    <path d="M3 3l18 18M9 9v2a3 3 0 0 0 5 2.2M15 9.3V6a3 3 0 0 0-5.9-.8M5 11a7 7 0 0 0 11.2 5.6M19 11a7 7 0 0 1-.6 2.8M12 18v3" />
  </svg>
);

export const VideoIcon = () => (
  <svg {...base}>
    <rect x="3" y="6" width="12" height="12" rx="3" />
    <path d="M15 10l6-3v10l-6-3z" />
  </svg>
);

export const VideoOffIcon = () => (
  <svg {...base}>
    <path d="M3 3l18 18M15 11V9a3 3 0 0 0-3-3H8M5 6.2A3 3 0 0 0 3 9v6a3 3 0 0 0 3 3h6a3 3 0 0 0 2.8-2M15 10l6-3v10l-3.5-1.8" />
  </svg>
);

export const PhoneOffIcon = () => (
  <svg {...base}>
    <path d="M3 13c5-5 13-5 18 0l-2.5 2.5-3-1.5v-2.5a9 9 0 0 0-6 0V14l-3 1.5z" />
  </svg>
);

export const CopyIcon = () => (
  <svg {...base}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
);

export const CheckIcon = () => (
  <svg {...base}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const DownloadIcon = () => (
  <svg {...base}>
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </svg>
);
