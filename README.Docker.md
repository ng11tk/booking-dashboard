# Docker Setup for Booking Dashboard

## Prerequisites

- Docker installed on your machine
- Docker Compose installed

## Quick Start

### Option 1: Using Docker Compose (Recommended for Development)

1. **Start all services** (MongoDB + Server + Client):

```bash
npm run docker:up
# or
docker-compose up -d
```

2. **View logs**:

```bash
npm run docker:logs
# or
docker-compose logs -f
```

3. **Stop all services**:

```bash
npm run docker:down
# or
docker-compose down
```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend GraphQL: http://localhost:4000/graphiql
   - MongoDB: localhost:27017

### Option 2: Using Single Dockerfile (Production)

1. **Build the image**:

```bash
npm run docker:build
# or
docker build -t booking-dashboard .
```

2. **Run the container**:

```bash
npm run docker:run
# or
docker run -p 4000:4000 --env-file server/.env booking-dashboard
```

3. **Access the application**:
   - Application: http://localhost:4000

## Docker Compose Services

### MongoDB

- Port: 27017
- Database: booking-dashboard
- Data persisted in Docker volume: `mongodb_data`

### Server (Backend)

- Port: 4000
- GraphQL endpoint: http://localhost:4000/graphql
- GraphiQL interface: http://localhost:4000/graphiql
- Hot reload enabled (development mode)

### Client (Frontend)

- Port: 5173
- Vite dev server with hot reload
- Proxies API requests to backend

## Environment Variables

The `.env` file in the server directory contains:

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 4000)
- `JWT_SECRET`: Secret for JWT authentication

For Docker Compose, MongoDB URI is automatically set to use the mongodb service.

## Useful Commands

```bash
# Build and start services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f [service-name]

# Stop services
docker-compose down

# Remove volumes (clears database)
docker-compose down -v

# Restart a specific service
docker-compose restart server

# Execute command in container
docker-compose exec server npm install <package>

# Remove all containers and images
docker-compose down --rmi all
```

## Troubleshooting

### MongoDB connection issues

- Ensure MongoDB container is healthy: `docker-compose ps`
- Check logs: `docker-compose logs mongodb`

### Port already in use

- Change ports in docker-compose.yml
- Or stop the conflicting service

### Hot reload not working

- Volume mounts may need adjustment based on your OS
- Try rebuilding: `docker-compose up --build`

## Production Deployment

For production, use the single Dockerfile approach:

1. Build the image
2. Push to container registry
3. Deploy with proper environment variables
4. Use external MongoDB (not containerized for production)
