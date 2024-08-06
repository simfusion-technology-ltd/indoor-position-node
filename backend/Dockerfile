# Use official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Expose backend port (adjust if different)
EXPOSE 4000

# Run backend production server
CMD ["npm", "start"]
