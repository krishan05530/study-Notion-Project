import React, { useState } from 'react'
import { apiConnector } from '../services/apiConnector';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import { categories } from '../services/apis';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
import { useSelector } from 'react-redux';
import Footer from '../components/common/Footer';
const Catalog = () => {



    // fetch all category whenver catalogName chanegs
    const {catalogName} = useParams();
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const { loading } = useSelector((state) => state.profile)
    //Fetch all categories


    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
           
                const category = res?.data?.data?.find((ct) =>
                    ct.name.split(" ").join("-").toLowerCase() === catalogName
                );
                console.log("Category: ", category);
                if (category) {
                    setCategoryId(category._id);
                } else {
                    console.warn(`No category found matching: ${catalogName}`);
                    setCategoryId(null); // Optional: Reset or handle state
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);

    return (


        // <div className='text-white'>
        //     <div>
        //         <p>{`Home /Catalog /`}
        //             <span>
        //                 {catalogPageData?.data?.selectedCategory?.name}
        //             </span>
        //         </p>
        //         <p>
        //             {catalogPageData?.data?.selectedCategory?.name}
        //         </p>
        //         <p>
        //             {catalogPageData?.data?.selectedCategory?.description}
        //         </p>
        //     </div>

        //     <div>
        //         {/* section 1*/}
        //         <div >
        //             <div>Course to get you started</div>
        //             <div className='flex gap-x-3'>
        //                 <p>Most Popular</p>
        //                 <p>New</p>
        //             </div>
        //             <div>
        //                 <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
        //             </div>
                    
        //         </div>
        //         {/* section 2 */}
        //         <div>
        //             <p>Top Course in   {catalogPageData?.data?.selectedCategory?.name}</p>
        //             <div>
        //                 {/* <CourseSlider Course={catalogPageData?.data?.differentCategory?.courses}/> */}
        //                 <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
        //             </div>
        //         </div>

        //         {/* section 3 */}
        //         <div>
        //             <p>Frequently bought </p>
        //             <div className='py-8'>
        //                  <div className='grid grid-cols-1 lg:grid-flow-col-2'>
        //                  {
        //                     catalogPageData?.data?.mostSellingCourses?.slice(0,4)
        //                     .map((course, index)=>(
        //                         <Course_Card course={course} key={index} height={"h-[400px]"} />
        //                     ))
        //                  }
        //                  </div>
        //             </div>
        //         </div>
        //     </div>
        //     {/* <Footer /> */}
        // </div>


        <>
        {/* Hero Section */}
        <div className=" box-content bg-richblack-800 px-4">
          <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
            <p className="text-sm text-richblack-300">
              {`Home / Catalog / `}
              <span className="text-yellow-25">
                {catalogPageData?.data?.selectedCategory?.name}
              </span>
            </p>
            <p className="text-3xl text-richblack-5">
              {catalogPageData?.data?.selectedCategory?.name}
            </p>
            <p className="max-w-[870px] text-richblack-200">
              {catalogPageData?.data?.selectedCategory?.description}
            </p>
          </div>
        </div>
  
        {/* Section 1 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">Courses to get you started</div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p
              className={`px-4 py-2 ${
                active === 1
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer`}
              onClick={() => setActive(1)}
            >
              Most Populer
            </p>
            <p
              className={`px-4 py-2 ${
                active === 2
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer`}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>
          <div>
            <CourseSlider
              Courses={catalogPageData?.data?.selectedCategory?.courses}
            />
          </div>
        </div>
        {/* Section 2 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">
            Top courses in {catalogPageData?.data?.differentCategory?.name}
          </div>
          <div className="py-8">
            <CourseSlider
              Courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>
  
        {/* Section 3 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">Frequently Bought</div>
          <div className="py-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, i) => (
                  <Course_Card course={course} key={i} Height={"h-[400px]"} />
                ))}
            </div>
          </div>
        </div>
  
        <Footer />
      </>

    )
}

export default Catalog
