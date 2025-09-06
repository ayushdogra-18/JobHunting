import express from 'express';
import cookieParser from 'cookie-parser';  //to parse cookies
import cors from 'cors'; // to handle cross-origin requests
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import connectDB from './utils/db.js';
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoute from './routes/application.route.js';
dotenv.config({});
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true})); // to parse urlencoded data
app.use(cookieParser()); // to parse cookies


//for production---------------------------->
const corsOptions = {
  origin: ["http://localhost:5173", "https://job-hunt-portal-18.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


//for development-------------------------->
// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };
//  app.use(cors(corsOptions));
//all api's   for eg :---> http://localhost:8000/api/vi/login
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/company",companyRoutes);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoute);



const PORT = process.env.PORT || 3000;







app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})