import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/util/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDesciption = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id])

  return (
    <div className="max-w-6xl mx-auto my-12 px-6">
      {/* Job Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-extrabold text-3xl text-gray-900">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-3 mt-5">
              <Badge className="text-blue-700 font-semibold px-4 py-1 rounded-full bg-blue-50" variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#F83002] font-semibold px-4 py-1 rounded-full bg-red-50" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209B7] font-semibold px-4 py-1 rounded-full bg-purple-50" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 
              ${isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7209B7] hover:bg-[#F83002] text-white shadow-md'}`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 className="border-b-2 border-gray-200 font-bold text-xl pb-4 text-gray-800">Job Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-6">
          <h2 className="font-bold">Role: <span className="font-normal text-gray-700">{singleJob?.title}</span></h2>
          <h2 className="font-bold">Location: <span className="font-normal text-gray-700">{singleJob?.location}</span></h2>
          <h2 className="font-bold">Description: <span className="font-normal text-gray-700">{singleJob?.description}</span></h2>
          <h2 className="font-bold">Experience: <span className="font-normal text-gray-700">{singleJob?.experience}</span></h2>
          <h2 className="font-bold">Salary: <span className="font-normal text-gray-700">{singleJob?.salary} LPA</span></h2>
          <h2 className="font-bold">Total Applicants: <span className="font-normal text-gray-700">{singleJob?.applications?.length}</span></h2>
          <h2 className="font-bold">Posted Date: <span className="font-normal text-gray-700">{singleJob?.createdAt.split("T")[0]}</span></h2>
        </div>
      </div>
    </div>
  )
}

export default JobDesciption
