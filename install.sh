#!/usr/bin/env bash
set -e  # exit on any error

echo "Setting up project (Backend + Frontend)..."

# --- Backend setup ---
echo "Installing backend dependencies..."
cd backend

if [ -f ".env_example" ] && [ ! -f ".env" ]; then
    cp .env_example .env
    echo "Copied backend .env file"
fi

npm install
echo "Backend dependencies installed"

cd ..

# --- Frontend setup ---
echo "Installing frontend dependencies..."
cd frontend

if [ -f ".env_example" ] && [ ! -f ".env" ]; then
    cp .env_example .env
    echo "Copied frontend .env file"
fi

npm install
echo "Frontend dependencies installed"

cd ..

# --- Start servers ---
echo "Starting backend and frontend servers..."

# Run both servers in parallel
cd backend && npm run dev &
cd frontend && npm run dev &

echo "Both backend and frontend are starting..."
echo "Backend: http://localhost:4000  (or your configured port)"
echo "Frontend: http://localhost:300  (or your configured port)"
wait
