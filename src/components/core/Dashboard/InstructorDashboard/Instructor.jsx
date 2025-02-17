import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import InstructorChart from './InstructorChart'
import { useState } from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { Link } from 'react-router-dom'
const Instructor = () => {
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);

            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            console.log("instructorApiData", instructorApiData);

            if (instructorApiData.length) {
                setInstructorData(instructorApiData);
            }
            if (result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);
    return (
        <div className='text-white'>
            <div>
                <h1>{user?.firstName}</h1>
                <p>Lets start somehting new</p>
            </div>

            {loading ? (<div className='spinner'> </div>) : (
                courses.length > 0 ?
                    (
                        <div>
                            <div>
                                <InstructorChart courses={instructorData} />
                                <div>
                                    <p>Statistics</p>
                                    <div>
                                        <p>Total Courses</p>
                                        <p>{courses.length}</p>
                                    </div>
                                    <div>
                                        <p>Total Students</p>
                                        <p>{totalStudents}</p>
                                    </div>
                                    <div>
                                        <p>Total Income </p>
                                        <p>{totalAmount}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* Render 3 Courses */}
                                <div>
                                    <p>Your Courses</p>
                                    <Link to="/dashboard/my-courses">
                                        <p>View All</p>
                                    </Link>
                                </div>
                                <div>
                                    {
                                        courses.slice(0, 3).map((course) => (
                                            <div>
                                                <img
                                                    src={course.thumbnail} />
                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <div>
                                                        <p>{course.studentsEnrolled.length} students</p>
                                                        <p>|</p>
                                                        <p>Rs{course.price}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>


                    ) : (<div>
                        you have not created any courses yet
                        <Link to ="/dashboard/addCourse">
                        create a course
                        </Link>
                    </div>)
            )}
        </div>
    )
}

export default Instructor
