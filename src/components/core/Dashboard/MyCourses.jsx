import React, { useEffect } from 'react'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { VscAdd } from "react-icons/vsc"
import { useState } from 'react'
import IconBtn from '../../common/IconBtn'
import CoursesTable from "../Dashboard/InstructorCourses/CoursesTable";

 import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

// only for instructor
const MyCourses = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    // on first render

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token)
            console.log("result1", result);
            if(result){
                setCourses(result)
            }
        }
        fetchCourses();
    }, [])

    return (
        <div className='text-white'>
            <div className='flex  justify-between'>
                <h1>My courses</h1>
                <IconBtn
                    text="Add course"
                    onclick={() => navigate("/dashboard/add-course")}
                // TODO icon add
                >
                      <VscAdd />
                    </IconBtn>

            </div>
            {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
        </div>



    )
}

export default MyCourses
