import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/util/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        //   if (!user) return;
        const fetchAllJobs = async () => {
    //         try {
    //             const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
    //             if(res.data.success){
    //                 dispatch(setAllJobs(res.data.jobs));
    //             }
    //         } catch (error) {
    //             console.log(error);
    //             if(error.response){
    //     // Server responded with a status code outside 2xx
    //     console.error("Server Response:", error.response.data);
    // } else if(error.request){
    //     // Request was made but no response
    //     console.error("No response from server:", error.request);
    // } else {
    //     // Other errors
    //     console.error("Axios config error:", error.message);
    // }
    //         }
    //     }
    //     fetchAllJobs();
    // },[])
     try {
      const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
        withCredentials: true
      });
      if (res.data.success) dispatch(setAllJobs(res.data.jobs));
    } catch (error) {
      if (error.response) console.error("Server Response:", error.response.data);
      else if (error.request) console.error("No response from server:", error.request);
      else console.error("Axios error:", error.message);
    }
  };
  fetchAllJobs();
}, [searchedQuery, dispatch]);
}

export default useGetAllJobs
