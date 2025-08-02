import React, { useState } from 'react';
import Header from '../components/Header';
import { useJob } from '../context/JobProvider';

export default function PostJobs({user, logout}) {

  // TODO: 创建3个 useState 变量：description, deadline, pay
  // TODO: 再创建一个 submittedJob 状态变量，用于保存提交的 job

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: 构建一个 job 对象，包含 description, deadline, pay
    // TODO: 把这个 job 保存到 submittedJob 状态中
    // TODO: 清空所有表单输入框
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Header user={user} logout={logout} />  
        <div className="max-w-md md:max-w-xl lg:max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Post a Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Job Description 输入框 */}
            {/* TODO: 用 textarea + tailwind class 美化 */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
            </label>
            <textarea
                className="w-full border rounded-md p-2"
                rows="3"
                placeholder="Describe the job..."
                // TODO: 设置 value 和 onChange
            ></textarea>
            </div>

            {/* Deadline 输入框 */}
            {/* TODO: 用 input[type=date] + tailwind class 美化 */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
            </label>
            <input
                type="date"
                className="w-full border rounded-md p-2"
                // TODO: 设置 value 和 onChange
            />
            </div>

            {/* Pay 输入框 */}
            {/* TODO: 用 input[type=number] + tailwind class 美化 */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Pay ($)
            </label>
            <input
                type="number"
                className="w-full border rounded-md p-2"
                placeholder="e.g., 100"
                // TODO: 设置 value 和 onChange
            />
            </div>

            {/* Submit 按钮 */}
            <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
            Submit
            </button>
        </form>

        {/* TODO: 如果 submittedJob 有值，展示提交结果 */}
        {/* 显示提交结果 */}
        {/* 使用 Tailwind 格式化展示 */}
        <div className="mt-6">
            {/* 提交之后的 job 信息展示 */}
        </div>
        </div>
    </div>
  );
}