import { useEffect, useRef } from 'react';

const AudioTile = ({ stream, label, local = false, muted = false }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="flex h-56 w-44 flex-col items-center justify-center gap-3 rounded-3xl border border-line bg-panel sm:h-72 sm:w-64">
      <img
        src="/logo.png"
        alt=""
        className="h-20 w-20 rounded-full border border-line object-cover sm:h-28 sm:w-28"
      />
      <span className="text-sm font-medium">{label}</span>
      {local && muted && <span className="text-xs text-mist">Muted</span>}
      {!local && <audio ref={audioRef} autoPlay />}
    </div>
  );
};

export default AudioTile;
