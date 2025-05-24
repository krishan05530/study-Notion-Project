import React, { use, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { current } from '@reduxjs/toolkit';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { Player } from 'video-react';
import { FaRegCirclePlay } from "react-icons/fa6";
import IconBtn from '../../common/IconBtn';
import "video-react/dist/video-react.css";
// import css

//pending controller for markascompleted in controller
const VideoDetails = () => {

  const { courseId, sectionId, subSectionId } = useParams();
  console.log("courseId sectionId subSectionID", courseId, sectionId, subSectionId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) {
        return;
      }
      if (!courseId && !sectionId && !subSectionId) {
        navigate('/dashboard/enrolled-courses');
      }
      else {
        // lets assume all three field are present
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId);
        console.log("filtered data", filteredData);

        const filteredVideoData = filteredData[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );
        console.log("filtered video data", filteredVideoData);
        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }

    }
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname])



  const isFirstVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }

  }


  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1) {
      return true;
    } else {
      return false;
    }
  }




  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== noOfSubSections - 1) {

      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    }
    else {
      // different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    }
    else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  }

  // const handleLectureCompletion = async () => {
  //   // dumy code , bad me we will replcae it withh actualcaa
  //   setLoading(true);
  //   const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);
  //   if (res) {
  //     dispatch(updateCompletedLectures(subSectionId));
  //   }
  //   setLoading(false);
  // }


  const handleLectureCompletion = async() => {

    ///dummy code, baad me we will replace it witht the actual call
    setLoading(true);
    //PENDING - > Course Progress PENDING
    const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
    //state update
    if(res) {
        dispatch(updateCompletedLectures(subSectionId)); 
    }
    setLoading(false);

  }

  return (
    <div>
      {
        !videoData ? (<div>No data found</div>) :
          (

            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData.videoUrl}>
              <FaRegCirclePlay />

              {
                videoEnded && (
                  <div>
                           {
                                !completedLectures.includes(subSectionId) && (
                                    <IconBtn 
                                        disabled={loading}
                                        onclick={() => handleLectureCompletion()}
                                        text={!loading ? "Mark As Completed" : "Loading..."}
                                    />
                                )
                            }
 {/* <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              /> */}



                    <div>
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className='blackButton'>
                          prev
                        </button>
                      )}

                      {
                        !isLastVideo() && (
                          <button
                            disabled={loading}
                            onClick={goToNextVideo}
                            className='blackButton'>
                            Next
                          </button>
                        )
                      }


                    </div>
                  </div>
                )
              }

            </Player>


          )
      }

      <h1>
        {videoData.title}
      </h1>
      <p>
        {videoData.description}
      </p>
    </div>
  )
}

export default VideoDetails
