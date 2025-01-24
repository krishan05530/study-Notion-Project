import React from 'react'
import { useSelector } from 'react-redux' ;
import { useState } from 'react' ;
import { useEffect } from 'react' ;
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI' ;
import ProgressBar from "@ramonak/react-progress-bar";


const EnrolledCourses = () => {
  const {token} = useSelector((state) => state.auth) ;
  const [enrolledCourses,setEnrolledCourses]=useState(null);


  const getEnrolledCourses=async()=>{
    try{
      const response =await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    }
    catch(error)
    {
      console.log("error in getting enrolled courses",error);
    }
  }
  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className='text-white'>
      <div>  Enrolled courses</div>
       {
        !enrolledCourses ? (
          <div>loading...</div>
        ):(
          !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>):
          (
            <div>
              <div>
                <p>Course Name</p>
                <p>Course Description</p>
                <p>Course progress</p>
                </div>
                {/* card to created */}

                {
                enrolledCourses.map((course, index)=>(
                  <div key={index}>
                    <div>
                      <img src={course.thumbnail} alt=""/>
                      <div>
                        <p>{course.courseName}</p>
                        <p>{course.courseDescription}</p>
                      </div>
                    </div>

                    <div>
                       {course?.totalDuration}
                    </div>
                    <div>
                      <p>Progress : {course.progressPercentage || 0}</p>
                      <ProgressBar completed={course.progressPercentage || 0}
                       height='8px'
                       isLabelVisible={false}
                        />
                    </div>

                  </div>
                ))  
                }
              </div>
          )
        )
       }
    </div>
  )
}

export default EnrolledCourses
