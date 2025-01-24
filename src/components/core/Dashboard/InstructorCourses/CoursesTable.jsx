import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { Table, Tbody, Thead, Tr, Td } from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants'
import { deleteCourse } from '../../../../services/operations/courseDetailsAPI'
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../slices/courseSlice'
import ConfirmationModal from "../../../common/ConfirmationModal";
const CoursesTable = ({ courses, setCourses }) => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)


    // const handleCourseDelete = async (courseId) => {
    //     setLoading(true);
    //     // deletet
    //     await deleteCourse({ courseId: courseId }, token);

    //     const result = await fetchInstructorCourses(token);
    //     console.log("result1",result);
    //     if (result) {
    //         setCourses(result);
    //     }
    //     setConfirmationModal(null);
    //     setLoading(false);

    // }

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
          setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
      }



    return (
        <div className='text-white'>

            <Table>
                <Thead>
                    <Tr className='flex gap-x-10 border-richblue-800 p-8'>
                        <th>Course </th>
                        <th>Duration</th>
                        <th>price</th>
                        <th>Action {" "}</th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td>No courses found</Td>
                            </Tr>
                        ) :
                            (
                                courses.map((course) => (
                                    <Tr key={course._id} className='flex gap-x-10  border-richblack-800 p-8'>
                                        <Td className='flex gap-x-4'>
                                            <img src={course?.thumbnail} alt='course thumbanil'
                                                className='h-[150px] w-[220px] rounded-lg object-cover' />

                                            <div className='flex flex-col gap-y-2'>
                                                <p>{course.courseName}</p>
                                                <p>{course.courseDescription}</p>
                                                <p>Created:</p>
                                                {
                                                    course.status === COURSE_STATUS.DRAFT ? (
                                                        <p className='text-yellow-50'>DRAFTED</p>
                                                    ) :
                                                        (
                                                            <p className='text-yellow-50'>PUBLISHED</p>
                                                        )
                                                }
                                            </div>

                                        </Td>
                                        <Td>2hr 30min</Td>
                                        <Td>
                                            ${course.price}
                                        </Td>
                                        <Td className=''>
                                            <button
                                                disabled={loading}
                                             onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}
                                                className='mr-[90px]'
                                               >
                                                Edit
                                            </button>

                                            <button
                                                disabled={loading}
                                          

                                                  onClick={() => {
                                                    setConfirmationModal({
                                                      text1: "Do you want to delete this course?",
                                                      text2:
                                                        "All the data related to this course will be deleted",
                                                      btn1Text: !loading ? "Delete" : "Loading...  ",
                                                      btn2Text: "Cancel",
                                                      btn1Handler: !loading
                                                        ? () => handleCourseDelete(course._id)
                                                        : () => {},
                                                      btn2Handler: !loading
                                                        ? () => setConfirmationModal(null)
                                                        : () => {},
                                                    })
                                                  }}

                                                
                                                
                                                >
                                                Delete
                                            </button>
                                        </Td>
                                    </Tr>
                                ))
                            )
                    }
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CoursesTable
