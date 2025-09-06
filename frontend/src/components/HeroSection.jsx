import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-6 md:px-12 lg:px-20">
      <div className="flex flex-col gap-8 my-16">
        {/* Top Badge */}
        <span className="mx-auto px-6 py-2 rounded-full bg-gray-100 text-[#F83002] font-semibold shadow-sm tracking-wide">
          No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-snug">
          Search, Apply & <br />
          Get your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Corporis expedita facere voluptatem tempore, itaque nulla?
        </p>

        {/* Search Bar */}
        <div className="flex w-full max-w-xl shadow-lg border border-gray-200 pl-5 pr-2 py-2 rounded-full items-center gap-3 mx-auto bg-white">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full text-gray-700 text-base"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#6A38C2] hover:bg-[#F83002] transition-colors duration-300 p-3"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
