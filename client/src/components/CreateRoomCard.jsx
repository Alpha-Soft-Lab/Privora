import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import { MicIcon, VideoIcon } from './Icons.jsx';
import { createRoom } from '../services/api.js';

const CreateRoomCard = () => {
  const navigate = useNavigate();
  const [loadingType, setLoadingType] = useState(null);
  const [error, setError] = useState('');

  const handleCreate = async (type) => {
    setLoadingType(type);
    setError('');
    try {
      const { code } = await createRoom(type);
      navigate(`/room/${code}`);
    } catch (err) {
      setError(err.message);
      setLoadingType(null);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex w-full flex-col gap-3 [&>button]:w-full [&>button]:justify-center">
        <Button className="cursor-pointer" variant="outline" onClick={() => handleCreate('audio')} disabled={Boolean(loadingType)}>
          <MicIcon />
          {loadingType === 'audio' ? 'Creating room' : 'Start voice call'}
        </Button>
        <Button className="cursor-pointer" variant="outline" onClick={() => handleCreate('video')} disabled={Boolean(loadingType)}>
          <VideoIcon />
          {loadingType === 'video' ? 'Creating room' : 'Start video call'}
        </Button>
      </div>
      {error && (
        <p role="alert" className="text-center text-sm text-signal">
          {error}
        </p>
      )}
    </div>
  );
};

export default CreateRoomCard;