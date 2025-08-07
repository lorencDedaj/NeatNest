import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

export default function FindJobs({ user, logout }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: loading state
  const [error, setError] = useState(null); // Optional: error state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await res.json();
        setJobs(data.jobs || data); // Adjust if your backend returns { jobs: [...] }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} logout={logout} />
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Available Jobs
        </h2>

        {loading && <p className="text-gray-500">Loading jobs...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {job.description}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Deadline:</strong>{' '}
                {new Date(job.deadline).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Pay:</strong> ${job.budget}
              </p>

              {/* Optional future feature */}
              {/* <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded">Accept</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
