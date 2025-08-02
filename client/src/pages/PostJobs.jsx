import React, { useState } from 'react';
import Header from '../components/Header';
import { useJob } from '../context/JobProvider';

export default function PostJobs({user, logout}) {

  // TODO: 创建3个 useState 变量：description, deadline, pay
  // TODO: 再创建一个 submittedJob 状态变量，用于保存提交的 job
  const [formJob, setFormJob] = useState({
    description:'',
    deadline: '',
    budget: '',
    createdBy:user
  });
  const [submittdJob, setSubmittedJob] = useState(null);

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormJob((pre)=>({
        ...pre,
        [name]: value,
    }))
  }

  const handleSubmit =async (e) => {
    e.preventDefault();

    const deadlineDate = new Date(formJob.deadline);

    if (isNaN(deadlineDate.getTime())) {
        alert("无效的时间格式，请重新输入");
        return;
    }
    // TODO: 构建一个 job 对象，包含 description, deadline, pay
    const jobToSubmit={
        description: formJob.description,
        deadline: deadlineDate.toISOString(),
        budget: Number(formJob.budget),
        createdBy: formJob.createdBy
    }
    console.log(JSON.stringify(jobToSubmit))
    

    try {
        const response = await fetch("/api/jobs",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(jobToSubmit),
        })
        if (!response.ok){
            throw new Error("Failed to submit job!");
        }
        const jobres = await response.json();
        // TODO: get savedJob from backend and save.
        setSubmittedJob(jobres.payload);
        
        // TODO: clear the input form.
        setFormJob({
            description:'',
            deadline: '',
            budget: '',
            createdBy: ''
        })
    }catch(err){
        console.error("Submit failed:", err);
    }

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
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='jobDesc'>
                Job Description
            </label>
            <textarea
                id="jobDesc"
                name='description'
                className="w-full border rounded-md p-2"
                rows="3"
                placeholder="Describe the job..."
                onChange={handleChange}
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
                type="datetime-local"
                className="w-full border rounded-md p-2"
                name="deadline"
                onChange={handleChange}
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
                name="budget"
                onChange={handleChange}
                // TODO: 设置 value 和 onChange
            />
            </div>

            {/* Submit 按钮 */}
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