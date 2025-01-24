import React from 'react'
import { useState } from 'react';
const ViewCourse = () => {
const[reviewModal,setReviewModal]=useState(false);


  return (
   <>
   <div>
    <VideoDetailsSidebar />

    <div>
        <Outlet/>
    </div>
   </div>

   {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
   </>
  )
}

export default ViewCourse
