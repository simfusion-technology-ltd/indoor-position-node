# VR/AR Game Location Tracker

This project is a **real-time location tracker** for a VR/AR playground game built with Next.js, Socket.IO, TypeScript, and Bootstrap 4.

Players simulate and track locations via web apps:
- **Location Simulator**: Send simulated user positions via WebSocket to the backend
- **Device Tracker**: Show live user positions on a colorful map canvas with labels

---

## Features

- Next.js frontend with TypeScript and Bootstrap 4 UI  
- Real-time WebSocket communication with Socket.IO  
- User positions updated and broadcast by backend server every 1 second  
- Colorful static grid map background on canvas  
- User positions rendered with labels on canvas  
- Supports multiple simulators and trackers simultaneously  

---

## Project Structure
```
/lib - Socket.IO client helper (initSocket)
/pages
|_ index.tsx - Home page with navbar
|_ location_simulator.tsx - Simulator page sending positions
|_ device_tracker.tsx - Tracker page displaying users on map
/components - Reusable components like Navbar.tsx
/public - Static assets including map.png (optional)
```

---

## Setup and Run

### Prerequisites

- Node.js (v16+ recommended)  
- Backend server running Socket.IO on `http://localhost:4000` (or set env var `NEXT_PUBLIC_SOCKET_URL`)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs on https://localhost:3000

### Environment Variables
- NEXT_PUBLIC_SOCKET_URL - Socket.IO backend URL (default: http://localhost:4000)
- NEXT_PUBLIC_SOCKET_PATH - Socket.IO path (default: /socket.io)

Create a .env.local file to override defaults if needed.

## Usage
1. Open http://localhost:3000/location_simulator
2. Enter a username and click Start to begin sending simulated positions every second.
3. Open http://localhost:3000/device_tracker
4. Watch live user positions update on the colorful map canvas.