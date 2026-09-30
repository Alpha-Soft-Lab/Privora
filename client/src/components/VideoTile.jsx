import { useEffect, useRef } from 'react';
import { VideoOffIcon } from './Icons.jsx';

const VideoTile = ({ stream, label, local = false, camOn = true, className = '' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-line bg-panel ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={local}
        className={`h-full w-full object-cover ${local ? '-scale-x-100' : ''} ${camOn ? '' : 'invisible'}`}
      />
      {!camOn && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-mist">
          <VideoOffIcon />
          <span className="text-sm">Camera off</span>
        </div>
      )}
      <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium backdrop-blur">
        {label}
      </span>
    </div>
  );
};

export default VideoTile;
