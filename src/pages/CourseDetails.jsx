import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'
import Error from './Error'
import ConfirmationModal from '../components/common/ConfirmationModal'
import RatingStars from '../components/common/RatingStars'
import { formatDate } from '../services/formatDate'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'




const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading } = useSelector((state) => state.profile);

  const { paymentLoading } = useSelector((state) => state.course);
  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {

    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
      }
      catch (error) {
        console.log("Could not fetch course details", error);
      }
    }
    getCourseFullDetails();
    console.log(" printing courseData", courseData);

  }, [courseId]);


  // averga rating count
  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReivews);
    setAverageReviewCount(count)
  }, [courseData])

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    let lectures = 0;

    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length;
    })
    setTotalNoOfLectures(lectures);

  }, [courseData])


  const [isActive,setIsActive]=useState(Array(0)); // empty array

  // if open then close , if close then open , mean do toggle
  
  const handleActive=(id)=>{
    setIsActive(
      !isActive[id] 
      ? isActive.concate(id)
      : isActive.filter((e)=>e!==id)
    )
  }

  
  // To update
  const handleBuyCourse = () => {
    console.log("buy course clicked");
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please login to buy the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null)
    })

  }

  if (loading || !courseData) {
    return (
      <div className='text-white'>
        Loading
      </div>
    )
  }


  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    )
  }

  const {
    id: course_id,
    courseName,
    courseDescriptive,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData?.data?.courseDetails;



  return (
    <div className='flex flex-col  text-white'>

      <div className='relative flex flex-col justify-start p-8'>
        <p>{courseName}</p>
        <p>{courseDescriptive}</p>
        <div className='flex  gap-x-2'>

          <span>{avgReviewCount}</span>
          <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
          <span>{`(${ratingAndReviews.length} reviews)`}</span>
          <span>{`(${studentsEnrolled.length}student Enrolled )`} </span>
        </div>
        <div>
          <p>Created By {`(${instructor.firstName})`}</p>
        </div>

        <div className='flex gap-x-3'>
          <p>Created At {formatDate(createdAt)}</p>
          <p>
            {" "}English
          </p>
        </div>

        <div>
          <CourseDetailsCard
            course={courseData?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>

      </div>



      <div>
        <p>What you  will learn</p>
        <div>
          {whatYouWillLearn}
        </div>
      </div>

      <div>
        <div>
          <p>Course Content </p>
        </div>

        <div className='flex gap-x-3 justify-between'>

          <div>
            <span>{courseContent.length} section(s)</span>
            <span>
              {totalNoOfLectures}lectures
            </span>

            <span>
              {courseData.data?.totalDuration} total length
            </span>

          </div>


          <div>
            {/* need to array to show which one has to show open , if array is empty then dont open lecture*/}
            <button
            // empty the array
            onClick={()=>setIsActive([])}>
              Collapse all section 
            </button>
          </div>

        </div>



      </div>





      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </div>
  )
}

export default CourseDetails


/*
flow : 
button click -> handleBuyCourse -> buyCourse -> script load ->order intiate->option created -> then on succes it will call handler function 
*/