import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMedia } from '../hooks/useMedia.js';
import { useCall } from '../hooks/useCall.js';
import { findRoom } from '../services/api.js';
import RoomHeader from '../components/RoomHeader.jsx';
import VideoGrid from '../components/VideoGrid.jsx';
import AudioGrid from '../components/AudioGrid.jsx';
import CallControls from '../components/CallControls.jsx';
import Notice from '../components/Notice.jsx';
import Button from '../components/Button.jsx';
import { CODE_LENGTH } from '../utils/constants.js';

const mediaMessages = (audioOnly) => ({
  denied: `${audioOnly ? 'Microphone' : 'Camera and microphone'} access is blocked. Allow it in your browser settings, then try again.`,
  unavailable: `No ${audioOnly ? 'microphone' : 'camera or microphone'} was found. Connect one and try again.`,
  unsupported: 'Calls need a secure connection. Open this app over HTTPS or on localhost.',
});

const failureMessages = {
  'not-found': ['Room not found', 'No room exists with this code. Check the digits or start a new call.'],
  full: ['Room is full', 'Everyone allowed in this room is already on the call.'],
  invalid: ['Invalid code', 'Room codes are four digits.'],
};

const RoomView = ({ code, type }) => {
  const navigate = useNavigate();
  const audioOnly = type === 'audio';
  const media = useMedia(!audioOnly);
  const call = useCall(code, media.stream);
  const leave = () => navigate('/');

  if (media.error) {
    return (
      <Notice
        title={audioOnly ? "Can't reach your microphone" : "Can't reach your camera"}
        message={mediaMessages(audioOnly)[media.error]}
      >
        <Button onClick={media.retry}>Try again</Button>
        <Button variant="outline" onClick={leave}>Back home</Button>
      </Notice>
    );
  }

  if (call.failure) {
    const [title, message] = failureMessages[call.failure] || failureMessages['not-found'];
    return (
      <Notice title={title} message={message}>
        <Button onClick={leave}>Back home</Button>
      </Notice>
    );
  }

  if (call.status === 'disconnected') {
    return (
      <Notice title="Connection lost" message="You were disconnected from the server. Rejoin to continue the call.">
        <Button onClick={() => window.location.reload()}>Rejoin call</Button>
        <Button variant="outline" onClick={leave}>Leave</Button>
      </Notice>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col px-4 sm:px-8">
      <RoomHeader code={code} connected={call.status === 'connected'} audioOnly={audioOnly} />
      {audioOnly ? (
        <AudioGrid code={code} micOn={media.micOn} remotes={call.remotes} />
      ) : (
        <VideoGrid code={code} localStream={media.stream} camOn={media.camOn} remotes={call.remotes} />
      )}
      <CallControls
        micOn={media.micOn}
        camOn={media.camOn}
        showCamera={!audioOnly}
        onToggleMic={media.toggleMic}
        onToggleCam={media.toggleCam}
        onLeave={leave}
      />
    </div>
  );
};

const Room = () => {
  const { code } = useParams();
  const validCode = new RegExp(`^\\d{${CODE_LENGTH}}$`).test(code);
  const [room, setRoom] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!validCode) return undefined;
    let active = true;
    setRoom(null);
    setError('');
    findRoom(code)
      .then((data) => active && setRoom(data))
      .catch((err) => active && setError(err.message));
    return () => {
      active = false;
    };
  }, [code, validCode]);

  if (!validCode) return <Navigate to="/" replace />;

  if (error) {
    return (
      <Notice title="Room not found" message={error}>
        <Button onClick={() => navigate('/')}>Back home</Button>
      </Notice>
    );
  }

  if (!room) return null;

  return <RoomView code={code} type={room.type} />;
};

export default Room;
