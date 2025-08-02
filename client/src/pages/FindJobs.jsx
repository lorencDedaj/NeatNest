import React, { useState } from 'react';
import Header from '../components/Header';
export default function FindJobs({user, logout}) {
  // TODO: 用 useState 创建 jobs 列表（先用静态模拟数据）
  const [jobs, setJobs] = useState([
    {
      id: 1,
      description: 'Clean 2-bedroom apartment',
      deadline: '2025-08-05',
      pay: 120,
    },
    {
      id: 2,
      description: 'Move furniture to garage',
      deadline: '2025-08-03',
      pay: 80,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
        <Header user={user} logout={logout} />  
        <div className="max-w-4xl mx-auto p-6 mt-10">
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Jobs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TODO: 用 map 遍历 jobs 数组 */}
            {jobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                {/* TODO: 美化 job 描述 */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.description}</h3>

                {/* TODO: deadline 和 pay 的显示 */}
                <p className="text-sm text-gray-600 mb-1">
                <strong>Deadline:</strong> {job.deadline}
                </p>
                <p className="text-sm text-gray-600">
                <strong>Pay:</strong> ${job.pay}
                </p>

                {/* TODO: 可选后续按钮：接单、收藏等 */}
                {/* <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded">Accept</button> */}
            </div>
            ))}
        </div>
        </div>
    </div>
  );
}