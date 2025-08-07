import React, { useState } from 'react';
import Header from '../components/Header';

export default function PostJobs({ user, logout }) {
  const [formJob, setFormJob] = useState({
    description: '',
    deadline: '',
    budget: '',
    createdBy: user,
  });

  const [submittedJob, setSubmittedJob] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormJob((prev) => ({
      ...prev,
      [name]: value,
      createdBy: user,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const deadlineDate = new Date(formJob.deadline);

    if (isNaN(deadlineDate.getTime())) {
      alert('Invalid deadline format.');
      return;
    }

    const jobToSubmit = {
      description: formJob.description,
      deadline: deadlineDate.toISOString(),
      budget: Number(formJob.budget),
      createdBy: formJob.createdBy,
    };

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobToSubmit),
      });

      if (!response.ok) {
        throw new Error('Failed to submit job!');
      }

      const jobRes = await response.json();
      setSubmittedJob(jobRes.payload);
      setSuccessMessage('🎉 Job submitted successfully!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 4000); // clears message after 4 seconds

      // Clear form
      setFormJob({
        description: '',
        deadline: '',
        budget: '',
        createdBy: user,
      });
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  const handleReset = () => {
    setFormJob({
      description: '',
      deadline: '',
      budget: '',
      createdBy: user,
    });
    setSubmittedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} logout={logout} />
      <div className="max-w-md md:max-w-xl lg:max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Post a Job</h2>
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md shadow-sm text-sm">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="space-y-4"
        >
          {/* Job Description */}
          <div>
            <label
              htmlFor="jobDesc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description
            </label>
            <textarea
              id="jobDesc"
              name="description"
              className="w-full border rounded-md p-2"
              rows="3"
              placeholder="Describe the job..."
              value={formJob.description}
              onChange={handleChange}
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="datetime-local"
              name="deadline"
              className="w-full border rounded-md p-2"
              value={formJob.deadline}
              onChange={handleChange}
            />
          </div>

          {/* Budget / Pay */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pay ($)
            </label>
            <input
              type="number"
              name="budget"
              className="w-full border rounded-md p-2"
              placeholder="e.g., 100"
              value={formJob.budget}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-6"
          >
            Submit
          </button>
          <button
            type="reset"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Reset
          </button>
        </form>

        {/* Display Submitted Job */}
        {submittedJob && (
          <div className="mt-6 p-4 border rounded-md bg-gray-100 text-sm text-gray-800">
            <h3 className="font-semibold mb-2">Job Submitted:</h3>
            <p>
              <strong>Description:</strong> {submittedJob.description}
            </p>
            <p>
              <strong>Deadline:</strong>{' '}
              {new Date(submittedJob.deadline).toLocaleString()}
            </p>
            <p>
              <strong>Budget:</strong> ${submittedJob.budget}
            </p>
            <p>
              <strong>Created By:</strong> {submittedJob.createdBy}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
