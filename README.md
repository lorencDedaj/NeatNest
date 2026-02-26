# NeatNest

NeatNest is a full-stack job posting app with a React frontend and an Express backend. It uses Kafka for asynchronous job event processing, PostgreSQL for persistence, and email notifications for newly posted jobs.

## Features

- Google sign-in (frontend)
- Recruiter flow to post jobs
- Job seeker flow to browse jobs
- Express REST API for jobs and users
- Kafka producer/consumer for job events
- PostgreSQL storage for users/jobs
- Email notifications via Nodemailer when new jobs are processed

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express, KafkaJS, pg
- Database: PostgreSQL
- Messaging: Apache Kafka (with Zookeeper via Docker Compose)
- Auth UI: Google OAuth (`@react-oauth/google`)

## Project Structure

```text
.
├── client/              # React + Vite frontend
├── server/              # Express API + Kafka producer/consumer
├── database/            # SQL setup/seed scripts
├── docker-compose.yml   # Kafka + Zookeeper local services
├── package.json         # Root workspace scripts
└── README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL (local or remote)
- Docker + Docker Compose (for Kafka/Zookeeper)
- Google OAuth Client ID (for frontend login)
- Gmail app password (or working SMTP creds) for email notifications

## Environment Variables

### `server/.env`

Create `server/.env` with:

```env
PORT=8000
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=neatnest
DB_PASSWORD=your_db_password
DB_PORT=5432
KAFKA_BROKERS=localhost:9092
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NOTIFICATION_TO=recipient@example.com
```

### `client/.env`

Create `client/.env` with:

```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## Installation

From the repo root:

```bash
npm install
npm run install-client
npm run install-server
```

Or use the helper script:

```bash
npm run install-all
```

## Database Setup

1. Create a PostgreSQL database (example: `neatnest`).
2. Run SQL scripts from `database/`.

Example:

```bash
psql -U <user> -d neatnest -f database/setup.sql
psql -U <user> -d neatnest -f database/seed.sql
```

Note: The SQL scripts in `database/` and some server controllers are not fully in sync in this branch. Review table definitions before seeding/running if you hit schema errors.

## Running Kafka (Docker)

Start Kafka and Zookeeper:

```bash
docker compose up -d
```

Stop them:

```bash
docker compose down
```

## Running the App

### Option 1: Start frontend and backend separately

Backend:

```bash
npm run dev-server
```

Frontend:

```bash
npm run dev-client
```

### Option 2: Use the root dev helper

```bash
npm run dev
```

## Local URLs

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

Vite proxies `/api/*` requests from the frontend to the backend.

## API Endpoints (Current Routes)

### Health / Root

- `GET /` - API welcome message

### Jobs

- `POST /api/jobs` - Sends a job payload to Kafka (then consumer stores it in PostgreSQL)
- `GET /api/jobs` - Returns all jobs from PostgreSQL
- `GET /api/jobs/:id` - Returns a job by ID

### Users

- `GET /api/users` - Returns all users
- `GET /api/users/:id` - Returns a user by ID
- `POST /api/users` - Creates a user and emits a Kafka user event
- `DELETE /api/users/:id` - Deletes a user

## Example Job Payload (`POST /api/jobs`)

```json
{
  "description": "Deep clean 2-bedroom apartment",
  "deadline": "2026-03-01T16:00:00.000Z",
  "budget": 150,
  "createdBy": "Alex"
}
```

## Kafka Flow (Jobs)

1. Frontend submits a job to `POST /api/jobs`
2. Backend producer publishes the message to Kafka topic `jobs`
3. Kafka consumer reads the message
4. Consumer inserts job into PostgreSQL
5. Consumer sends an email notification

## Known Issues / Notes

- `server/app.js` defines `POST /api/jobs` directly and also mounts `server/routes/jobs.js`; the direct route handles the request first.
- `server/kafka/producer.js` currently sends all messages to the `jobs` topic even when a different topic name is passed.
- `database/setup.sql`, `database/seed.sql`, and controller queries reference different schemas in places.
- `server/models/db.js` logs database connection environment values on startup (including presence of secrets), which may not be desirable outside local development.

## CI

A basic GitHub Actions workflow exists at `.github/workflows/ci.yml` and currently runs a placeholder step.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally (frontend, backend, Kafka, DB)
4. Open a pull request

## License

No license is currently specified in this repository.
