import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios"; // Adjust the path as necessary
// import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export const JobCart = ({ job }) => {

const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]); // store jobIds

    const handleSaveClick = async (jobId) => {
      try {
      if (savedJobs.includes(jobId)) {
        // unsave
        await axios.post("/saveJobs/unsave", { jobId });
        setSavedJobs(savedJobs.filter((id) => id !== jobId));
        toast.success("Job removed from saved jobs ❌");
      } else {
        // save
        await axios.post("/saveJobs/save", { jobId });
        setSavedJobs([...savedJobs, jobId]);
        toast.success("Job saved successfully ✅");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

    const saved = savedJobs.includes(job._id);


  const handelClick = (id)=>{
    navigate(`/jobs/${id}`)
  }
  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800 shadow-md   hover:scale-[1.02] transition-all duration-200 ">
      <h3 className="text-white text-2xl font-bold mb-2">{job.title}</h3>

      <div className="flex items-center justify-between text-gray-300 mb-3">
        <span className="text-xl font-medium">{job.company || 'Logo'}</span>
        <span className="text-lg">{job.location}</span>
      </div>
        <div className="border-1 border-gray-500 mt-5 mb-3 "></div>
      <p className="text-gray-400 text-lg mb-4 line-clamp-3 ">{job.description}</p>

      <div className="flex justify-between mt-auto ">
            <button className="bg-gray-700 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-600" 
            onClick={() => handelClick(job._id)}
            >
            More Details
            </button>

            {saved ? (
                  <button
                    className="border border-red-500  hover:border-gray-500 hover:text-white text-red-500 px-6 py-3 rounded-lg  font-medium"
                    onClick={() => handleSaveClick(job._id)}
                  >
                    Unsave Job
                  </button>
                ) : (
                  <button
                    className="border border-gray-500 hover:border-red-500 hover:text-red-500 px-6 py-3 rounded-lg text-white font-medium"
                    onClick={() => handleSaveClick(job._id)}
                  >
                    Save Job
                  </button>
                )}
      </div>
    </div>
  );
};
