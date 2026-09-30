import VideoTile from './VideoTile.jsx';
import WaitingState from './WaitingState.jsx';

const VideoGrid = ({ code, localStream, camOn, remotes }) => {
  const remoteEntries = Object.entries(remotes);
  const alone = remoteEntries.length === 0;

  return (
    <div className="relative min-h-0 flex-1">
      {alone && <WaitingState code={code} />}
      {alone ? (
        <VideoTile stream={localStream} label="You" local camOn={camOn} className="h-full w-full" />
      ) : (
        <>
          <div
            className={`grid h-full gap-3 ${remoteEntries.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}
          >
            {remoteEntries.map(([id, stream]) => (
              <VideoTile key={id} stream={stream} label="Guest" className="h-full w-full" />
            ))}
          </div>
          <VideoTile
            stream={localStream}
            label="You"
            local
            camOn={camOn}
            className="absolute bottom-4 right-4 h-36 w-28 shadow-2xl sm:h-44 sm:w-64"
          />
        </>
      )}
    </div>
  );
};

export default VideoGrid;
