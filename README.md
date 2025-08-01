# NeatNest
NeatNest app for cleaner who are looking fast jobs
```
job-portal/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobCard.jsx           # Reusable component to display job info (title, budget, apply button)
│   │   │   └── Header.jsx            # Navigation bar with user info and logout button
│   │   ├── pages/
│   │   │   ├── Login.jsx             # Login/register form, handles authentication
│   │   │   ├── PostJobs.jsx          # Create new jobs, view posted jobs, manage applications
│   │   │   └── FindJobs.jsx          # Browse available jobs, apply for jobs, view application status
│   │   ├── App.jsx                   # Main app component with routing and global state
│   │   └── index.js                  # React app entry point, renders App component
│   ├── package.json                  # Frontend dependencies (React, axios, react-router-dom)
│   └── .env                          # Frontend environment variables (API URL)
├── server/                    # Node.js Backend 
│   ├── controllers/
│   │   ├── auth.js                   # Handle user registration, login, JWT token generation
│   │   ├── jobs.js                   # Create jobs, get all jobs, get user jobs, close jobs
│   │   └── applications.js           # Apply for jobs, approve applications, get applications
│   ├── models/
│   │   ├── db.js                     # PostgreSQL database connection and pool setup
│   │   └── queries.js                # All SQL queries for users, jobs, applications, stats
│   ├── routes/
│   │   └── api.js                    # All API endpoints routing (/auth, /jobs, /applications)
│   ├── kafka/
│   │   ├── producer.js               # Send events to Kafka (job created, applied, approved)
│   │   └── consumer.js               # Listen to Kafka events and update user statistics
│   ├── app.js                        # Express server setup, middleware, start server and Kafka
│   ├── package.json                  # Backend dependencies (Express, KafkaJS, PostgreSQL, JWT)
│   └── .env                          # Backend environment variables (DB config, Kafka config)
├── database/
│   └── setup.sql                     # Database schema creation (users, jobs, applications, stats tables)
└── README.md                         # Project documentation and setup instructions
```

┌─────────────────┐    ┌─────────────────┐
│     Client      │    │     Server      │
│   (React App)   │────│   (Node.js)     │
│                 │    │  Single App     │
└─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │     Kafka       │
                       │ (Local Install) │
                       └─────────────────┘
                                │
                       ┌─────────────────┐
                       │   PostgreSQL    │
                       │ (Local Install) │
                       └─────────────────┘
Login Page
╔══════════════════════════════════════╗
║            Job Portal                ║
╠══════════════════════════════════════╣
║                                      ║
║  Username: [________________]        ║
║  Password: [________________]        ║
║                                      ║
║          [    LOGIN    ]             ║
║                                      ║
║  No account? [Register]              ║
║                                      ║
╚══════════════════════════════════════╝
Main Dashboard
╔══════════════════════════════════════╗
║  Job Portal              [Logout]    ║
╠══════════════════════════════════════╣
║                                      ║
║  Hello Alex! Choose what to do:      ║
║                                      ║
║  [Post Jobs]  [Find Jobs]  [My Stats]║
║                                      ║
║  ════════════════════════════════════║
║           Latest Jobs                ║
║  ┌────────────────────────────────┐  ║
║  │ Build Website | $500 | [Apply] │  ║
║  └────────────────────────────────┘  ║
║  ┌────────────────────────────────┐  ║
║  │ Create Mobile App|$800 |[Apply]│  ║
║  └────────────────────────────────┘  ║
║                                      ║
╚══════════════════════════════════════╝

Post Jobs Page Interface
╔══════════════════════════════════════════════════════════════════════════════╗
║  Job Portal                                          Alex | [Logout]         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  [← Back to Dashboard]                                                       ║
║                                                                              ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                           CREATE NEW JOB                                    ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                                                                              ║
║  Job Title: [_____________________________________________]                  ║
║                                                                              ║
║  Description:                                                                ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ Describe what you need done, required skills, timeline, etc...         │ ║
║  │                                                                        │ ║
║  │                                                                        │ ║
║  │                                                                        │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  Budget: $[_______]    Deadline: [MM/DD/YYYY]                              ║
║                                                                              ║
║                           [  POST JOB  ]                                    ║
║                                                                              ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                            MY POSTED JOBS                                   ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ Build E-commerce Website                               Posted: 2 days ago│ ║
║  │ Budget: $1500 | Status: Open | Applications: 5                          │ ║
║  │ [View Applications] [Edit Job] [Close Job]                               │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ Mobile App UI Design                                   Posted: 1 week ago│ ║
║  │ Budget: $800 | Status: Closed | Applications: 12                        │ ║
║  │ [View Applications] [Reopen Job]                                         │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ API Integration Project                                Posted: 3 days ago│ ║
║  │ Budget: $600 | Status: Open | Applications: 3                           │ ║
║  │ [View Applications] [Edit Job] [Close Job]                               │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

When "View Applications" is clicked:
╔══════════════════════════════════════════════════════════════════════════════╗
║  Applications for: "Build E-commerce Website"                   [← Back]    ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  Job Details: Budget: $1500 | Posted: 2 days ago | Status: Open            ║
║                                                                              ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                             APPLICATIONS (5)                                ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ john_dev                                            Applied: 1 day ago   │ ║
║  │ Status: Pending                                                          │ ║
║  │ "I have 5 years experience in React and Node.js..."                     │ ║
║  │                                    [APPROVE] [REJECT] [View Profile]     │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ sarah_designer                                      Applied: 2 hours ago │ ║
║  │ Status: Pending                                                          │ ║
║  │ "I specialize in full-stack development and have built..."               │ ║
║  │                                    [APPROVE] [REJECT] [View Profile]     │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ mike_coder                                          Applied: 1 day ago   │ ║
║  │ Status: APPROVED ✓                                                       │ ║
║  │ "Expert in e-commerce platforms, ready to start immediately"             │ ║
║  │                                             [Contact] [View Profile]     │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝


╔══════════════════════════════════════════════════════════════════════════════╗
║  Job Portal                                          Alex | [Logout]         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  [← Back to Dashboard]                                                       ║
║                                                                              ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                           AVAILABLE JOBS                                    ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                                                                              ║
║  Filter: [All Jobs ▼] Budget: $[___] - $[___] [Apply Filter] [Clear]       ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ Build E-commerce Website                           Posted: 2 days ago    │ ║
║  │ Budget: $1500 | Deadline: 01/15/2025 | Applications: 5                  │ ║
║  │ "Looking for full-stack developer to build online store with React..."   │ ║
║  │ Skills: React, Node.js, MongoDB, Payment Integration                     │ ║
║  │                                              [APPLY NOW] [View Details]  │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ API Integration Project                            Posted: 3 days ago    │ ║
║  │ Budget: $600 | Deadline: 12/30/2024 | Applications: 3                   │ ║
║  │ "Need to integrate third-party APIs into existing system..."             │ ║
║  │ Skills: REST APIs, JavaScript, JSON, Authentication                      │ ║
║  │                                              [APPLY NOW] [View Details]  │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ Mobile App UI Design                               Posted: 1 week ago    │ ║
║  │ Budget: $800 | Deadline: 01/20/2025 | Applications: 8                   │ ║
║  │ "Design modern UI/UX for iOS and Android mobile app..."                  │ ║
║  │ Skills: Figma, UI/UX Design, Mobile Design, Prototyping                 │ ║
║  │                                              [APPLY NOW] [View Details]  │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                          MY APPLICATIONS                                    ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ React Dashboard Development                        Applied: 1 day ago    │ ║
║  │ Budget: $900 | Status: PENDING ⏳                                        │ ║
║  │ "Waiting for employer response..."                                       │ ║
║  │                                              [View Job] [Withdraw]       │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ Website Bug Fixes                                  Applied: 3 days ago   │ ║
║  │ Budget: $300 | Status: APPROVED ✅                                       │ ║
║  │ "Congratulations! You got the job. Contact employer."                    │ ║
║  │                                              [View Job] [Contact Client] │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ Logo Design Project                                Applied: 1 week ago   │ ║
║  │ Budget: $200 | Status: REJECTED ❌                                       │ ║
║  │ "Sorry, employer chose another candidate."                               │ ║
║  │                                              [View Job]                  │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                           MY STATISTICS                                     ║
║  ══════════════════════════════════════════════════════════════════════════  ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ Total Applications: 15        │ Jobs Completed: 8                        │ ║
║  │ Pending Applications: 3       │ Success Rate: 53%                        │ ║
║  │ Total Earnings: $2,400        │ Average Job Value: $300                  │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════════════╗
║  Apply for Job: "Build E-commerce Website"                     [← Back]     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  Job Details:                                                                ║
║  • Budget: $1500                                                             ║
║  • Deadline: 01/15/2025                                                      ║
║  • Posted by: john_employer                                                  ║
║  • Current Applications: 5                                                   ║
║                                                                              ║
║  ──────────────────────────────────────────────────────────────────────────  ║
║                                                                              ║
║  Full Description:                                                           ║
║  "Looking for an experienced full-stack developer to build a modern         ║
║  e-commerce website. Must have experience with React, Node.js, MongoDB,     ║
║  and payment gateway integration. The project includes user authentication, ║
║  product catalog, shopping cart, and admin dashboard..."                    ║
║                                                                              ║
║  Required Skills:                                                            ║
║  • React.js & JavaScript                                                     ║
║  • Node.js & Express                                                         ║
║  • MongoDB Database                                                          ║
║  • Payment Integration (Stripe/PayPal)                                       ║
║  • Responsive Design                                                         ║
║                                                                              ║
║  ──────────────────────────────────────────────────────────────────────────  ║
║                                                                              ║
║  Your Application Message:                                                   ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │ Hi! I'm interested in your e-commerce project. I have 5+ years of      │ ║
║  │ experience with React and Node.js, and I've built similar projects...  │ ║
║  │                                                                        │ ║
║  │                                                                        │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║                        [SUBMIT APPLICATION] [Cancel]                        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

