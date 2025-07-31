import Navbaar from '../components/Navbar';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { JobCart } from '../components/JobCart';

export const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  

  const fetchJobs = async () => {
    try {
      toast.loading('Loading jobs...');
      const res = await axios.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.log('Fetching jobs failed:', err);
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const locations = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh"
  ];

  const companies = [
    { id: 1, name: 'Google' },
    { id: 2, name: 'Facebook' },
    { id: 3, name: 'Netflix' },
    { id: 4, name: 'Amazon' },
    { id: 5, name: 'Atlassian' },
    { id: 6, name: 'Microsoft' },
    { id: 7, name: 'Uber' },
    { id: 8, name: 'IBM' }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen">
      <Navbaar />
      <h2 className="text-white text-5xl md:text-7xl font-bold text-center my-8">Latest Jobs</h2>

      <section className="px-4 md:px-20">
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search Jobs by Title..."
            className="flex-1 p-3 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition">
            Search
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <select className="w-full md:w-[795px] p-3 bg-gray-900 text-white  rounded-xl border border-gray-700">
            <option value="">Filter by Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location.toLowerCase()}>
                {location}
              </option>
            ))}
          </select>

          <select className="w-full md:w-[795px] p-3 bg-gray-900 text-white rounded-xl border border-gray-700">
            <option value="">Filter by Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.name.toLowerCase()}>
                {company.name}
              </option>
            ))}
          </select>

          <button className="px-6 py-3 bg-red-600 cursor-pointer text-white rounded-xl hover:bg-red-700 transition">
            Clear Filter
          </button>
        </div>
      </section>

      <div className="px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job, index) => <JobCart key={index} job={job} />)
          ) : (
            <p className="text-white text-center col-span-full">No Jobs Found</p>
          )}
        </div>
      </div>
    </div>
  );
};
