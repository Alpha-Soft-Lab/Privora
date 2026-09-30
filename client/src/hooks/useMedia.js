import { useCallback, useEffect, useRef, useState } from 'react';

export const useMedia = (withVideo) => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(withVideo);
  const streamRef = useRef(null);

  const start = useCallback(async () => {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('unsupported');
      return;
    }
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
        video: withVideo ? { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } : false,
      });
      streamRef.current = media;
      setStream(media);
    } catch (err) {
      setError(err.name === 'NotAllowedError' ? 'denied' : 'unavailable');
    }
  }, [withVideo]);

  useEffect(() => {
    start();
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [start]);

  const toggle = useCallback((kind, setter) => {
    const tracks = kind === 'audio' ? streamRef.current?.getAudioTracks() : streamRef.current?.getVideoTracks();
    if (!tracks?.length) return;
    const next = !tracks[0].enabled;
    tracks.forEach((track) => {
      track.enabled = next;
    });
    setter(next);
  }, []);

  const toggleMic = useCallback(() => toggle('audio', setMicOn), [toggle]);
  const toggleCam = useCallback(() => toggle('video', setCamOn), [toggle]);

  return { stream, error, micOn, camOn, toggleMic, toggleCam, retry: start };
};
