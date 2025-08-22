import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "../api/axios";
import { toast } from "react-hot-toast";

export const JobPost = () => {
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [requirements, setRequirements] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [about, setAbout] = useState("");

  const requirementsArray = requirements
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

    
    const handelSumit = async () => {
        try{
            if (!title || !description || !company || !location || !salary || !about || requirementsArray.length === 0) {
              toast.error("Please fill all fields");
              return;
            }
            
            toast.loading("Submiting job...");
            const res = await axios.post('/jobs',{
                title,
                description,
                company,
                location,
                salary,
                requirements : requirementsArray,
                about
            })
            if(res.status === 201){
                toast.success("Job posted successfully");
                setTitle("");
                setDescription("");
                setCompany("");
                setLocation("");
                setSalary("");
                setRequirements("");
                setAbout("");
            }
            toast.dismiss();
            // console.log(res);
        }
        catch(err){
            console.error(err);
            toast.error("Failed to post job");
        }
    };



  
//   console.log(requirementsArray);

  const handleLocationChange = (e) => {
    const loc = e.target.value;
    setLocation(loc);
    fetchFilteredJobs({ location: loc, company });
  };

  const handleCompanyChange = (e) => {
    const comp = e.target.value;
    setCompany(comp);
    fetchFilteredJobs({ location, company: comp });
  };

  const locations = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Bangalore",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Hyderabad",
    "Remote",
  ];

  const companies = [
    { id: 1, name: "Google" },
    { id: 2, name: "Facebook" },
    { id: 3, name: "Netflix" },
    { id: 4, name: "Amazon" },
    { id: 5, name: "Atlassian" },
    { id: 6, name: "Microsoft" },
    { id: 7, name: "Uber" },
    { id: 8, name: "IBM" },
    { id: 9, name: "Insightify" },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black min-h-screen">
      <Navbar />
      <h2 className="text-white text-4xl md:text-6xl font-bold text-center my-8">
        Post a Job
      </h2>

      <div className="space-y-4 max-w-2xl mx-auto px-4">
        <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
        />

        <input
          type="text"
          required
          placeholder="Job Description"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
        />

        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="flex-1 p-4 bg-gray-900 text-white rounded-xl border border-gray-700"
            value={location}
            onChange={handleLocationChange}
          >
            <option value="">Filter by Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc.toLowerCase()}>
                {loc}
              </option>
            ))}
          </select>

          <select
            className="flex-1 p-4 bg-gray-900 text-white rounded-xl border border-gray-700"
            value={company}
            onChange={handleCompanyChange}
          >
            <option value="">Filter by Company</option>
            {companies.map((comp) => (
              <option key={comp.id} value={comp.name.toLowerCase()}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Salary"
          required
          onChange={(e) => setSalary(e.target.value)}
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
        />

        <textarea
          onChange={(e) => setAbout(e.target.value)}
          required
          placeholder="About job"
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
        />

        <textarea
          placeholder="Requirements (one per line)"
          required
          className="w-full p-4 bg-gray-900 text-white rounded-xl border border-gray-700 outline-none"
          onChange={(e) => setRequirements(e.target.value)}
        />

        <button className="w-full md:w-[200px] mt-2 mb-5 p-3 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition"
            onClick={handelSumit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
