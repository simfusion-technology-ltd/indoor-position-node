import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

type PositionType = {
  top: number;
  left: number;
}

type SocketPositionDataType = {
  username: string;
  position: PositionType;
}

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    path: process.env.SOCKET_PATH || '/socket.io',
    cors: {
      origin: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
      credentials: true
    }
  });

  const positions = new Map<string, PositionType[]>();

  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // basic ping-pong event
    socket.on('ping-server', (payload) => {
      socket.emit('pong', { time: new Date().toISOString(), payload });
    });

    // room example
    socket.on('join-room', (room: string) => {
      socket.join(room);
      socket.emit('joined', { room });
    });

    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${socket.id} (${reason})`);
    });

    socket.on('simulator:position', (data: SocketPositionDataType) => {
      console.log('simulator:position', data);
      if (data?.username && data?.position) {
        const userPositions = positions.get(data.username) || [];
        userPositions.push(data.position);
        // Keep only latest 3 positions
        if (userPositions.length > 3) {
          userPositions.shift(); // remove oldest
        }
        positions.set(data.username, userPositions);
      }
    });
  });

  setInterval(() => {
    if (positions.size > 0) {
      // Prepare broadcast data:
      // For each user, send the latest position (last in array) plus optionally last 3 positions for history
      const latestPositions = Array.from(positions.entries()).map(
        ([username, posArray]) => ({
          username,
          latest: posArray[posArray.length - 1],
          history: [...posArray], // or last 3 positions
        })
      );
      io.emit('tracker:update', latestPositions);
      console.log('tracker:update', latestPositions);
    }
  }, 1000);
}

export function getIO() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}