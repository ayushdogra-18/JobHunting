
 import {Job} from '../models/job.model.js';

// //admin post job
// export const postJob = async (req, res) => {
//     try {
//         const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
//         const userId = req.id;
//         if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
//             return res.status(400).json({
//                 message: "All fields are required",
//                 success: false
//             })
//         }
//         const job = await Job.create({
//             title,
//              description,
//              requirements:requirements.split(","), 
//              salary:Number(salary),
//               location,
//                jobType, 
//                experienceLevel:experience, 
//                position, 
//                companyId:companyId,
//                created_by:userId,
              
//         });
//         return res.status(201).json({
//             message: "New Job created succesfully",
//             job,
//             success: true
//         })
//     } catch (err) {
//         console.log(err);
        
//     }
// }
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), 
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experience),
      position: Number(position),
      company: companyId,       
      created_by: userId
    });

    return res.status(201).json({
      message: "New Job created successfully",
      job,
      success: true
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAlljobs=async(req,res)=>{
    try{
        const keyword=req.query.keyword || "";
        const query={
             $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        const jobs=await Job.find(query).populate({
            path:"company",
        }).sort({createdAt:-1}); //newest job first
        if(!jobs){
            return res.status(404).json({message:"No job found",success:false});
        }
        return res.status(200).json({message:"Jobs found",jobs,success:true});
    }catch(err){
        console.log(err);
        
    }
}

//for students
export const getJobById=async(req,res)=>{
    try{
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
          path:"applications"
        });
        if(!job){
            return res.status(404).json({message:"No job found",success:false});
        }
        return res.status(200).json({message:"Job found",job,success:true});
    }catch(err){
        console.log(err);
    }
}

// for recurtors how many job created 
export const getAdminJobs=async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


