import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PinInput from './PinInput.jsx';
import Button from './Button.jsx';
import { findRoom } from '../services/api.js';
import { CODE_LENGTH } from '../utils/constants.js';

const JoinRoomCard = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (value) => {
    setCode(value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const room = await findRoom(code);
      if (room.full) {
        setError('That room is full.');
        return;
      }
      navigate(`/room/${code}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full min-w-0 flex-col items-stretch gap-6"
    >
      <PinInput value={code} onChange={handleChange} disabled={loading} />
      <div className="flex w-full flex-col gap-3">
        <div className="w-full [&>button]:w-full">
          <Button
            type="submit"
            disabled={code.length !== CODE_LENGTH || loading}
          >
            {loading ? 'Checking room' : 'Join call'}
          </Button>
        </div>
        {error && (
          <p role="alert" className="text-sm text-signal">
            {error}
          </p>
        )}
      </div>
    </form>
  );
};

export default JoinRoomCard;