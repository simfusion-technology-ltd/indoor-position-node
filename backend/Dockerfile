# Use node image
FROM node:20-alpine AS base
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
COPY tsconfig.json ./

RUN npm ci --only=production

COPY . .
RUN npm run build

CMD ["node", "dist/server.js"]