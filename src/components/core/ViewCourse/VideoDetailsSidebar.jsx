import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
const VideoDetailsSidebar = ({ setReviewModal }) => {
    
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { sectionId, subSectionId } = useParams();
    console.log("section adn subsection id",sectionId, subSectionId);
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);


    useEffect(() => {
        const setActiveFlags = () => {
            if (!courseSectionData.length)
                return;
             

            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )

            // cureent active subsection index
            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            // setting active status
            // active, current section
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // active video (current  subsection)
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname])


    const handleAddReview=()=>{
        console.log("I am inside Add handleAddReview")
        setReviewModal(true);
    }
    return (
        <>

            <div className='text-white'>
                {/* for button and Headings */}
                <div>
                    {/* for button */}
                    <div>
                        <div onClick={() => navigate("/dashboard/enrolled-courses")} >
                            Back
                        </div>

                        <div >
                            <IconBtn
                                text="Add review"
                                onclick={()=>handleAddReview()}
                            />
                        </div>
                   
                    </div>


                    {/* for heading or title */}
                    <div>
                        <p>{courseEntireData?.courseName}</p>
                        <p>{completedLectures?.length}/{totalNoOfLectures}</p>
                    </div>

                    {/* for sections and subsections */}
                    <div>
                        {
                            courseSectionData.map((course, index) => ( // here course represent section data 
                                <div
                                    onClick={() => setActiveStatus(course?._id)}
                                    key={index}>
                                    {/* sections */}
                                    <div>
                                        <div>
                                            {course?.sectionName}
                                        </div>
                                        {/* TODO: Add  arrow Icon and handle rotate logic */}

                                    </div>

                                    {/* subsections only for current section */}
                                    <div>
                                        {
                                            activeStatus === course?._id && (
                                                <div>
                                                    {
                                                        course.subSection.map((topic, index) => (
                                                            <div
                                                                className={`flex gap-3  p-5 
                                                                    ${videoBarActive === topic?._id ? "bg-yellow-200" 
                                                                        : "bg-richblack-900 text-white"}`}
                                                                        key={index}
                                                                        onClick={() => {
                                                                            navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                                         )
                                                                            setVideoBarActive(topic?._id);
                                                                        }}>
                                                                <input
                                                                    type='checkbox'
                                                                    checked={completedLectures.includes(topic?._id)}
                                                                   
                                                                    onChange={()=>{}}
                                                                    />
                                                        {/* <input
                                                        type='checkbox'
                                                        checked= {completedLectures.includes(topic?._id)}
                                                        onChange={() => {}}
                                                        /> */}
                                                                <span>
                                                                    {topic.title}
                                                                </span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>


            </div>

      
        </>
    )
}

export default VideoDetailsSidebar
