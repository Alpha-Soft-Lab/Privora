import { useEffect, useRef, useState } from 'react';
import { ICE_SERVERS, WS_URL } from '../utils/constants.js';

export const useCall = (code, localStream) => {
  const [status, setStatus] = useState('connecting');
  const [remotes, setRemotes] = useState({});
  const [failure, setFailure] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!localStream) return undefined;

    const socket = new WebSocket(`${WS_URL}?room=${code}`);
    const connections = {};
    let closedByUs = false;
    socketRef.current = socket;

    const send = (payload) => {
      if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(payload));
    };

    const dropPeer = (id) => {
      connections[id]?.close();
      delete connections[id];
      setRemotes((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    };

    const createConnection = (id) => {
      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
      localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
      pc.onicecandidate = (event) => {
        if (event.candidate) send({ type: 'signal', to: id, data: { candidate: event.candidate } });
      };
      pc.ontrack = (event) => {
        setRemotes((prev) => ({ ...prev, [id]: event.streams[0] }));
      };
      pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'failed') dropPeer(id);
      };
      connections[id] = pc;
      return pc;
    };

    const callPeer = async (id) => {
      const pc = createConnection(id);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      send({ type: 'signal', to: id, data: { description: pc.localDescription } });
    };

    const handleSignal = async (from, data) => {
      let pc = connections[from];
      if (data.description) {
        if (!pc) pc = createConnection(from);
        await pc.setRemoteDescription(data.description);
        if (data.description.type === 'offer') {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          send({ type: 'signal', to: from, data: { description: pc.localDescription } });
        }
      } else if (data.candidate && pc) {
        await pc.addIceCandidate(data.candidate);
      }
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'joined') {
        setStatus('connected');
        await Promise.all(message.peers.map(callPeer));
      } else if (message.type === 'signal') {
        await handleSignal(message.from, message.data);
      } else if (message.type === 'peer-left') {
        dropPeer(message.id);
      } else if (message.type === 'error') {
        setFailure(message.reason);
        setStatus('failed');
      }
    };

    socket.onclose = () => {
      if (!closedByUs) {
        setStatus((current) => (current === 'failed' ? current : 'disconnected'));
      }
    };

    return () => {
      closedByUs = true;
      socket.close();
      Object.keys(connections).forEach((id) => connections[id].close());
      setRemotes({});
    };
  }, [code, localStream]);

  return { status, remotes, failure };
};
