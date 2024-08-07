# BattleField Indoor Game Backend Server

## Quick start (dev)

1. copy `.env.example` to `.env` and edit values
2. npm install
3. npm run dev

Open http://localhost:4000/health

Socket.IO endpoint: ws://localhost:4000 with path `/socket.io` (default)

## Build

npm run build
npm start

## Docker

Build: docker build -t es-ts-backend .
Run: docker run -e PORT=4000 -p 4000:4000 es-ts-backend