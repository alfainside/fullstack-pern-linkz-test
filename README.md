# Fullstack PERN linkz test

## Tech Stack
- NestJS (Typescript)
- Postgresql
- Prisma
- ReactJs

## Prerequisites
- Node v.18+
- Typescript v.4+
- Docker

## How to Start The Project
- You need to run both, frontend and backend

### Frontend
- cd frontend
- yarn install
- copy .env.example to .env
- Complete the env vars using these env vars
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```
- yarn start
- visit http://localhost:3001

### Backend
- cd backend
- yarn install
- cd docker
- docker-compose up -d (if you are not linux user, make sure you run on WSL terminal. This command will automatically run mysql and phpmyadmin. Or you can run mysql and phpmyadmin using your own way)
- copy .env.example to .env
- Complete the env vars using these env vars (if you run using the docker-compose. if not, just adjust with your own env vars)
```
APP_NAME=Backend Service - Linkz Test
PORT=3001
MYSQL_HOST=localhost
MYSQL_DATABASE=linkzdb_test
MYSQL_USER=admin
MYSQL_PASSWORD=root
```
- yarn start

### Database Migration
- cd backend
- yarn migrate-up (for run migration)
- yarn migrate-down (for undo migration)

## Testing
- cd backend
- yarn test or yarn test:cov
