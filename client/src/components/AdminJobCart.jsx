import React from "react";
import { useNavigate } from "react-router-dom";

export const AdminJobCart = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-md hover:scale-[1.02] transition-all duration-300 w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
      <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3">{job.title}</h3>

      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-300 mb-4">
        <span className="text-lg font-medium">{job.company || "Company"}</span>
        <span className="text-base mt-2 sm:mt-0">{job.location}</span>
      </div>

      
      <div className="border-t border-gray-700 my-4"></div>

      
      <p className="text-gray-400 text-base sm:text-lg mb-5 line-clamp-3">
        {job.description}
      </p>

      
      <button
        className="bg-indigo-600 text-white w-full py-3 text-lg rounded-xl hover:bg-indigo-500 transition"
        onClick={() => navigate(`/adminjob`, { state: { job } })}
>
  More Details
</button>
    </div>
  );
};
