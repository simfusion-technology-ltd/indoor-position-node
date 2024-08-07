'use client';
import { useEffect, useState } from 'react';
import { initSocket } from '../lib/socket';

export default function ChatBox() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = initSocket();

    socket.on('connect', () => {
      console.log('Connected to socket server', socket.id);
    });

    socket.on('pong', (data) => {
      setMessages((prev) => [...prev, `Pong: ${JSON.stringify(data)}`]);
    });

    socket.on('notification', (data) => {
      setMessages((prev) => [...prev, `Notification: ${JSON.stringify(data)}`]);
    });

    return () => {
      socket.off('pong');
      socket.off('notification');
    };
  }, []);

  const sendPing = () => {
    const socket = initSocket();
    socket.emit('ping-server', { msg: input || 'Hello server!' });
    setInput('');
  };

  return (
    <div className="card p-3">
      <h2 className="mb-3">ChatBox / Realtime Demo</h2>
      <div className="input-group mb-3">
        <input
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type ping payload"
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={sendPing}>
            Send Ping
          </button>
        </div>
      </div>
      <ul className="list-group">
        {messages.map((m, idx) => (
          <li key={idx} className="list-group-item">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}