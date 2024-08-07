import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
const PATH = process.env.NEXT_PUBLIC_SOCKET_PATH || '/socket.io';

let socket: Socket | null = null;

export function initSocket() {
  if (!socket) {
    socket = io(URL, {
      path: PATH,
      withCredentials: true
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) throw new Error('Socket not initialized');
  return socket;
}