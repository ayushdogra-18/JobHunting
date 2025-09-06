import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Mobile App Developer",
    "DevOps Engineer",
    "UI/UX Designer",
    "Machine Learning Engineer",
    "Cloud Engineer",
    "Cybersecurity Analyst",
    "Blockchain Developer",
    "QA Tester",
    "Game Developer",
    "Product Manager",
    "Digital Marketing Specialist",
    "Content Writer",
    "SEO Specialist",
    "Network Engineer",
    "Business Analyst"
];

const CategoryCarousel = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const searchJobHandler=(query)=>{
          dispatch(setSearchedQuery(query));
          navigate("/browse");
        }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>{
                    category.map((cat, index) =>
                    (
                        <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                            <Button  onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full ">{cat}</Button>
                        </CarouselItem>
                    ))
                }

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
