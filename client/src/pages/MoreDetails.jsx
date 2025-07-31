import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const MoreDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState({});

    const jobFetch = async () => {
        try {
            const res = await axios.get(`/jobs/${id}`);
            setJob(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    console.log(job);
    const jobsalary = job.salary;

    useEffect(() => {
        jobFetch();
    }, []);
    

    return (
        <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen text-white px-6 py-4">
            
            <button 
                onClick={() => navigate(-1)} 
                className="flex justify-center p-2 items-center md:ml-6 mt-6  h-10 w-15 rounded-lg text-2xl  text-gray-400  hover:bg-gray-700 hover:text-gray-300  transition-colors duration-200"
                >
                {/* <span className="text-xl">←</span> */}
                <span className="text-4xl font-medium ">←</span>
            </button>
            
            <h2 className="mt-6 ml-2 md:ml-10 text-6xl font-bold">{job.title}</h2>
            <div className="mt-6 m-3 md:m-10 flex flex-row justify-between">

            <p className="text-2xl">{job.location}</p>
            
            <p className="text-2xl">Salary:$ {jobsalary}</p>
            </div>
            <p className="mt-6 ml-2 md:ml-10 text-4xl font-bold">About this job</p>
            <p className="mt-6 ml-2 md:ml-10 text-2xl">Apply is seeking an experiencd Data Scientist to join our analytics team, You will be responsoble for analyzing dataset to uncover insights and drive data-driven descison making.  </p>
            
        </div>
    );
};
