import React, { useEffect, useRef, useState } from "react";
import { initSocket } from "../lib/socket";

type Position = {
  top: number;
  left: number;
};

type UserPositions = {
  username: string;
  latest: Position;
  history: Position[];
};

export default function DeviceTracker() {
  const [userPositions, setUserPositions] = useState<UserPositions[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const width = 500;
  const height = 500;
  const cellSize = 25;

  // Draw background once on offscreen canvas
  useEffect(() => {
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const ctx = offscreenCanvas.getContext("2d");
    if (!ctx) return;

    // Draw colorful grid background (random colors per cell)
    for (let y = 0; y < height; y += cellSize) {
      for (let x = 0; x < width; x += cellSize) {
        const r = 150 + Math.floor(Math.random() * 100);
        const g = 150 + Math.floor(Math.random() * 100);
        const b = 150 + Math.floor(Math.random() * 100);
        ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }

    // Draw grid lines
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    for (let x = 0; x <= width; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    backgroundCanvasRef.current = offscreenCanvas;

    // Draw initial background to main canvas
    const mainCanvas = canvasRef.current;
    const mainCtx = mainCanvas?.getContext("2d");
    if (mainCtx) {
      mainCtx.clearRect(0, 0, width, height);
      mainCtx.drawImage(offscreenCanvas, 0, 0);
    }

    const socket = initSocket();

    socket.on('tracker:update', (data: UserPositions[]) => {
        setUserPositions(data);
    });

    return () => {
        socket.off('tracker:update');
        socket.disconnect();
    }
  }, []);

  // Draw user positions on top of static background
  useEffect(() => {
    const mainCanvas = canvasRef.current;
    if (!mainCanvas) return;
    const ctx = mainCanvas.getContext("2d");
    if (!ctx) return;

    // Draw saved background first
    if (backgroundCanvasRef.current) {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(backgroundCanvasRef.current, 0, 0);
    }

    // Draw each user position as circle + username
    userPositions.forEach(({ username, latest }) => {
      const px = (latest.left / 100) * width;
      const py = (latest.top / 100) * height;

      ctx.beginPath();
      ctx.arc(px, py, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#007bff"; // blue
      ctx.fill();

      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      ctx.fillText(username, px + 12, py + 5);
    });
  }, [userPositions]);

  return (
    <div className="container mt-4">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: "1px solid #ddd", backgroundColor: "#f9f9f9" }}
      />
    </div>
  );
}
