
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import  VideoDetailsSidebar  from '../components/core/ViewCourse/VideoDetailsSidebar';
// import { CourseReviewModal } from '../components/core/ViewCourse/CourseReviewModal';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';


import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
const ViewCourse = () => {
const[reviewModal,setReviewModal]=useState(false);
const {courseId}= useParams();
console.log("courseId",courseId);
const {token}=useSelector((state)=>state.auth);

const dispatch=useDispatch();

useEffect(()=>{
    const setCourseSpecificDetails =async()=>{
        const courseData=await getFullDetailsOfCourse(courseId,token);
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
        
         console.log("setCourseSectionData",courseData.courseDetails.courseContent);
        dispatch(setEntireCourseData(courseData.courseDetails));
        console.log("setEntireCourseData",courseData.courseDetails);
        dispatch(setCompletedLectures(courseData.completedVideos))
        console.log("setCompletedLectures",courseData.completedVideos);

         let lectures=0;

         courseData?.courseDetails?.courseContent?.forEach((sec)=>{
            lectures+=sec.subSection.length
         })
         dispatch(setTotalNoOfLectures(lectures));
         
    }

    setCourseSpecificDetails();
},[]);


  return (
   <>
   <div>
    <VideoDetailsSidebar setReviewModal={setReviewModal} />
    <div>
        <Outlet/>
    </div>
    { reviewModal&& (<CourseReviewModal setReviewModal={setReviewModal}/>) }
   </div>

   
   </>
  )
}

export default ViewCourse
