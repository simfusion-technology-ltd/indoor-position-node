FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build Next.js app
RUN npm run build

# Expose frontend port (default Next.js production port)
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "start"]
