import React from 'react'
import { motion } from 'framer-motion'
import googleLogo from '../assets/companies/google.webp'
import amazon from '../assets/companies/amazon.svg'
import atlassian from '../assets/companies/atlassian.svg'
import netflix from '../assets/companies/netflix.png'
import meta from '../assets/companies/meta.svg' 
import microsoft from '../assets/companies/microsoft.webp'
import  uber from '../assets/companies/uber.svg' 

const companies = [
  { id: 1, name: 'Google', path: googleLogo },
  { id: 2, name: 'Facebook', path: meta },
  { id: 3, name: 'Netflix', path:  netflix},
  { id: 4, name: 'Amazon', path: amazon },
  { id: 5, name: 'Atlassian', path: atlassian },
  { id: 6, name: 'Microsoft', path: microsoft },
    { id: 7, name: 'Uber', path: uber }
];


const CompanyCarousel = () => {
  const repeatedCompanies = [...companies, ...companies]; 

  return (
    <div className="overflow-hidden py-6 bg-black">
      <motion.div
        className="flex gap-16 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'linear',
        }}
      >
        {repeatedCompanies.map(({ id, name, path }, index) => (
          <div key={index} className="w-40 flex justify-center">
            <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CompanyCarousel;

