import { MicIcon, MicOffIcon, PhoneOffIcon, VideoIcon, VideoOffIcon } from './Icons.jsx';

const round = 'flex h-14 w-14 items-center justify-center rounded-full transition active:scale-95';

const CallControls = ({ micOn, camOn, showCamera, onToggleMic, onToggleCam, onLeave }) => (
  <div className="flex items-center justify-center gap-4 py-4">
    <button
      onClick={onToggleMic}
      aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
      className={`${round} ${micOn ? 'border border-line hover:border-mist' : 'bg-paper text-ink'}`}
    >
      {micOn ? <MicIcon /> : <MicOffIcon />}
    </button>
    {showCamera && (
      <button
        onClick={onToggleCam}
        aria-label={camOn ? 'Turn camera off' : 'Turn camera on'}
        className={`${round} ${camOn ? 'border border-line hover:border-mist' : 'bg-paper text-ink'}`}
      >
        {camOn ? <VideoIcon /> : <VideoOffIcon />}
      </button>
    )}
    <button
      onClick={onLeave}
      aria-label="Leave call"
      className={`${round} bg-signal text-white hover:brightness-110`}
    >
      <PhoneOffIcon />
    </button>
  </div>
);

export default CallControls;
