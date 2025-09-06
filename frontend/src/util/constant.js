//for production------------------------------------->
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://jobhunting-1.onrender.com";
    
    console.log("MODE:", import.meta.env.MODE);
    console.log("BASE_URL:", BASE_URL);


// // Export all your endpoints here
export const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;


//for development-------------------------------->
// export const USER_API_END_POINT="http://localhost:8000/api/v1/user";
// export const JOB_API_END_POINT="http://localhost:8000/api/v1/job";
// export const APPLICATION_API_END_POINT="http://localhost:8000/api/v1/application";
// export const COMPANY_API_END_POINT="http://localhost:8000/api/v1/company";