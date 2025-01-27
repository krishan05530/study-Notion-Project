import React, { useState } from 'react'
import { apiConnector } from '../services/apiconnector';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import { categories } from '../services/apis';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';
const Catalog = () => {



    // fetch all category whenver catalogName chanegs
    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

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


        <div className='text-white'>
            <div>
                <p>{`Home /Catalog /`}
                    <span>
                        {catalogPageData?.data?.selectedCategory?.name}
                    </span>
                </p>
                <p>
                    {catalogPageData?.data?.selectedCategory?.name}
                </p>
                <p>
                    {catalogPageData?.data?.selectedCategory?.description}
                </p>
            </div>

            <div>
                {/* section 1*/}
                <div >
                    <div>Course to get you started</div>
                    <div className='flex gap-x-3'>
                        <p>Most Popular</p>
                        <p>New</p>
                    </div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                    </div>
                    
                </div>
                {/* section 2 */}
                <div>
                    <p>Top Course in   {catalogPageData?.data?.selectedCategory?.name}</p>
                    <div>
                        {/* <CourseSlider Course={catalogPageData?.data?.differentCategory?.courses}/> */}
                        <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
                    </div>
                </div>

                {/* section 3 */}
                <div>
                    <p>Frequently bought </p>
                    <div className='py-8'>
                         <div className='grid grid-cols-1 lg:grid-flow-col-2'>
                         {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course, index)=>(
                                <Course_Card course={course} key={index} height={"h-[400px]"} />
                            ))
                         }
                         </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>

    )
}

export default Catalog
