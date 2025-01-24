import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import RenderSteps from '../AddCourse/RenderSteps'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setEditCourse } from '../../../../slices/courseSlice'
import { useEffect } from 'react'
import { setCourse } from '../../../../slices/courseSlice'

const EditCourse = () => {
    const dispatch = useDispatch()

    // getting course id frm PAramas as id is sent in url by edit button in coursetable
    const { courseId } = useParams();
    const { course } = useSelector(state => state.course)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(state => state.auth)



    // get course detials
    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token);

            if (result?.courseDetails) {
                // itd state varibale to true
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        }
        populateCourseDetails();
    }, [])


    if (loading) {
        return (
            <div>Loading.......</div>
        )
    }


    return (
        <div>
            <h1 className='text-white'> Edit Course</h1>
            <div>
                { 
                // if data exist in course then rendersteps, course is get by useeffect 
                    course ? (<RenderSteps />) : (<p className='text-white'>Course Not Found</p>)
                }
            </div>
        </div>
    )
}

export default EditCourse
