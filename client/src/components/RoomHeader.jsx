import { useState } from 'react';
import Logo from './Logo.jsx';
import { CheckIcon, CopyIcon } from './Icons.jsx';

const RoomHeader = ({ code, connected, audioOnly }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/room/${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <Logo size={36} showName={false} />
        <span className="text-sm text-mist">{audioOnly ? 'Voice call' : 'Video call'}</span>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`h-2.5 w-2.5 rounded-full ${connected ? 'bg-paper' : 'animate-pulse bg-mist'}`}
          aria-label={connected ? 'Connected' : 'Connecting'}
        />
        <span className="text-xl font-semibold tracking-[0.25em]">{code}</span>
        <button
          onClick={copyLink}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium transition hover:border-mist"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy invite link'}
        </button>
      </div>
    </header>
  );
};

export default RoomHeader;
