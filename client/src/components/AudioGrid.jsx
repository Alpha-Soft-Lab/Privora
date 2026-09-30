import AudioTile from './AudioTile.jsx';
import WaitingState from './WaitingState.jsx';

const AudioGrid = ({ code, micOn, remotes }) => {
  const remoteEntries = Object.entries(remotes);

  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-3xl border border-line bg-panel p-4">
      {remoteEntries.length === 0 ? (
        <WaitingState code={code} />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {remoteEntries.map(([id, stream]) => (
            <AudioTile key={id} stream={stream} label="Guest" />
          ))}
          <AudioTile label="You" local muted={!micOn} />
        </div>
      )}
    </div>
  );
};

export default AudioGrid;
