# Multi-stage Dockerfile for booking-dashboard

# Stage 1: Build Client
FROM node:20-alpine AS client-build
WORKDIR /app

# Copy client files
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm install
COPY client/ ./
RUN npm run build

EXPOSE 5173

# Stage 2: Server
FROM node:20-alpine AS server
WORKDIR /app

# Copy server files
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install --production

WORKDIR /app
COPY server/ ./server/

EXPOSE 4000

# stage 3: Final Stage
FROM node:20-alpine AS final
WORKDIR /app

# copy root package files
COPY package*.json ./
RUN npm install --production

# Copy server from server stage
COPY --from=server /app/server ./server
# Copy built client from client-build stage
COPY --from=client-build /app/client/dist ./server/public

WORKDIR /app
RUN npm install -g concurrently
CMD ["concurrently", "\"cd client && npm run dev -- --host\"", "\"cd server && npm start\""]