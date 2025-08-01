-- Create ENUM types for status fields to enforce restrictions, ensure data consistency and prevent typos 
CREATE TYPE user_role AS ENUM ('recruiter', 'applicant');
CREATE TYPE job_status AS ENUM ('open', 'closed');
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');

-- -----------------------------------------------------
-- Table: users
-- Stores user account information.
-- -----------------------------------------------------
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table: jobs
-- Stores job postings created by recruiters.
-- -----------------------------------------------------
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  recruiter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  budget NUMERIC(10, 2),
  status job_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  closed_at TIMESTAMPTZ
);

-- -----------------------------------------------------
-- Table: applications
-- Links applicants (users) to jobs.
-- -----------------------------------------------------
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status application_status NOT NULL DEFAULT 'pending',
  applied_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  -- An applicant can only apply to a specific job once
  UNIQUE (job_id, applicant_id)
);

-- -----------------------------------------------------
-- Table: user_stats
-- Stores aggregated statistics for users, updated by Kafka.
-- This creates a one-to-one relationship with the users table.
-- -----------------------------------------------------
CREATE TABLE user_stats (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  jobs_posted INTEGER DEFAULT 0,
  applications_sent INTEGER DEFAULT 0,
  applications_received INTEGER DEFAULT 0
);

-- Create a trigger to automatically insert a new row in user_stats when a new user is created
CREATE OR REPLACE FUNCTION create_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_stats(user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_create
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_stats();


-- Add indexes on foreign keys for faster lookups
CREATE INDEX idx_jobs_recruiter_id ON jobs(recruiter_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_applicant_id ON applications(applicant_id);