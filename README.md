# Fullstack PERN linkz test

## Tech Stack
- NestJS (Typescript)
- Postgresql
- Mikrorm
- ReactJs

## Prerequisites
- Node v.18+
- Typescript v.4+
- Docker

## How to Start The Project
- You need to run both, frontend and backend

### Frontend
- cd frontend
- npm install
- npm start
- visit http://localhost:3000

### Backend
- cd backend
- npm install
- cd docker
- docker-compose up -d
- copy .env.example to .env
- npm run start

### Database Migration
- cd backend
- npm run migrate-mikrorm-create (from create migration mikrorm)
- npm run migrate-mikrorm-up (for run migration mikrorm)
- npm run migrate-mikrorm-down (for undo migration mikrorm)

## Testing
- cd backend
- npm test or npm test:cov
