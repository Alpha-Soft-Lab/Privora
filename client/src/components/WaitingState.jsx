const WaitingState = ({ code }) => (
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/55 px-6 text-center backdrop-blur-sm">
    <p className="text-mist">Waiting for someone to join room</p>
    <p className="text-7xl font-semibold tracking-[0.2em] sm:text-8xl">{code}</p>
    <p className="max-w-xs text-sm text-mist">Share this code or the invite link. The call starts when they arrive.</p>
  </div>
);

export default WaitingState;
