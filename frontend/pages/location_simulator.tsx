'use client';
import { useEffect, useState, useRef } from 'react';
import { initSocket } from '../lib/socket';

export default function LocationSimulator() {
  const [username, setUsername] = useState('');
  const [started, setStarted] = useState(false);
  const [position, setPosition] = useState({ top: 50, left: 50 });

  // Keep current position in ref to avoid stale closure inside setInterval
  const positionRef = useRef(position);
  positionRef.current = position;

  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!started) return;

    socketRef.current = initSocket();

    // Optionally send username on connect or start
    socketRef.current.emit('simulator:join', { username });

    // Start sending position every second
    const interval = setInterval(() => {
      const currentPos = positionRef.current;

      // Small random walk step between -5 and 5
      const deltaTop = Math.floor(Math.random() * 11) - 5;
      const deltaLeft = Math.floor(Math.random() * 11) - 5;

      let newTop = currentPos.top + deltaTop;
      let newLeft = currentPos.left + deltaLeft;

      // Clamp within 0-100
      newTop = Math.min(100, Math.max(0, newTop));
      newLeft = Math.min(100, Math.max(0, newLeft));

      const newPosition = { top: newTop, left: newLeft };
      setPosition(newPosition);

      // Send position + username to server
      socketRef.current.emit('simulator:position', { username, position: newPosition });

      console.log('Sending position', newPosition);
    }, 1000);

    return () => {
      clearInterval(interval);
      socketRef.current?.disconnect();
    };
  }, [started, username]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setStarted(true);
    } else {
      alert('Please enter a username');
    }
  };

  return (
    <div className="container mt-4">
      {!started ? (
        <form onSubmit={handleStart} className="form-inline">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Start
          </button>
        </form>
      ) : (
        <>
          <h3>Username: {username}</h3>
          <p>
            Current position - Top: {position.top}, Left: {position.left}
          </p>
          <button className="btn btn-danger" onClick={() => setStarted(false)}>
            Stop
          </button>
        </>
      )}
    </div>
  );
}
