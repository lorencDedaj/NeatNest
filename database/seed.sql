-- database/seed.sql

INSERT INTO users (email, password, role) VALUES
('recruiter2@example.com', 'password', 'recruiter'),
('applicant2@example.com', 'password', 'applicant'),
('recruiter@example.com', 'password123', 'recruiter'),
('applicant@example.com', 'password456', 'applicant');

-- The trigger created in setup.sql will automatically create
-- corresponding entries in the user_stats table for these two users.

-- Insert a sample job posted by the recruiter (user_id = 1)
INSERT INTO jobs (recruiter_id, title, description, budget) VALUES
(1, 'Senior React Developer', 'Looking for an experienced React developer to join our team.', 120000.00);

-- Insert a sample application from the applicant (user_id = 2) for the job (job_id = 1)
INSERT INTO applications (job_id, applicant_id, status) VALUES
(1, 2, 'pending');