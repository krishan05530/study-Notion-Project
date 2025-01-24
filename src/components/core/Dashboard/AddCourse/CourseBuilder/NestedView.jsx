// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { useState } from 'react'
// import { RxDropdownMenu } from "react-icons/rx";
// import { MdEdit } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { BiSolidDownArrow } from "react-icons/bi";
// import { AiOutlinePlus } from "react-icons/ai";
// import SubSectionModal from './SubSectionModal';
// import ConfirmationModal from '../../../../common/ConfirmationModal';
// import { deleteSection, deleteSubSection } from "../../../.././../services/operations/courseDetailsAPI"
// import { setCourse } from "../../../../../slices/courseSlice"





// const NestedView = ({ handleChangeEditSectionName }) => {
//     const { course } = useSelector((state) => state.course)
//     const { token } = useSelector((state) => state.auth)
//     const dispatch = useDispatch();
//     const [addSubSection, setAddSubSection] = useState(null);
//     const [viewSubSection, setViewSubSection] = useState(null);
//     const [editSubSection, setEditSubSection] = useState(null);
//     const [confirmationModal, setConfirmationModal] = useState(false);


//     useEffect(() => {
//         console.log("Rerendering",course)
//     }, [course])
    
//     const handleDeleteSection = async (sectionId) => {

//         const result = await deleteSection({
//             sectionId,
//             courseid: course._id,
//             token,
//         })
//         console.log("Printing result", result);
//         if (result) {
//             dispatch(setCourse(result));
//         }
//         setConfirmationModal(null);
 
//     }

//     const handleDeleteSubSection = async (subSectionId, sectionId) => {
//         const result = await deleteSubSection({
//             subSectionId,
//             sectionId},
//             token,
//         )
//         if (result) {

//             const updatedCourseContent=course.courseContent.map((section)=>
//                 section.id===sectionId ? result : section)
//                 console.log("Updated course content",updatedCourseContent);
//             const updatedCourse={...course,courseContent:updatedCourseContent};

//             // extra kya kar skate he yaha pe ?
//             dispatch(setCourse(updatedCourse));
//         }
//         setConfirmationModal(null);
//     }


//     return (
//         <div>
//             <div className=' rounded-md bg-richblack-700 p-6 px-8 '>

//                 {course?.courseContent?.map((section) => (
//                     <details key={section._id} open>
//                         <summary className='flex items-center justify-between gap-x-3 border-b-2'>

//                             <div className='flex items-center gap-x-3'>
//                                 <RxDropdownMenu />
//                                 <p className='text-richblack-5'>{section.sectionName}</p>
//                             </div>
//                             <div className='flex items-center gap-x-3'>
//                                 <button
//                                      onClick={()=>handleChangeEditSectionName(section._id, section.sectionName)}
//                                     >
//                                     <MdEdit />
//                                 </button>

//                                 <button onClick={() => {
//                                     setConfirmationModal({
//                                         text1: "Delete this section?",
//                                         text2: "All the lecture in this  section will bedeleted",
//                                         btn1Text: "Delete",
//                                         btn2Text: "Cancel",
//                                         btn1Handler: () => handleDeleteSection(section._id),
//                                         btn2Handler: () => setConfirmationModal(null)
//                                     })
//                                 }}>
//                                     <RiDeleteBin6Line />
//                                 </button>
//                                 <span>|</span>
//                                 <BiSolidDownArrow className={`text-xl text-richblack-300`} />

//                             </div>
//                         </summary>
//                         <div>
//                             {section?.subSection?.map((data) => (
//                                 <div
//                                     key={data?._id}
//                                     onClick={() => setViewSubSection(data)}
//                                     className='flx items-center justify-between gap-x-3 border-b-2'>
//                                     <div className='flex items-center gap-x-3'>
//                                         <RxDropdownMenu />
//                                         <p className='text-richblack-5'>{data.title}</p>
//                                     </div>
//                                     <div className='flex items-center gap-x-3'>
//                                         <button
//                                             onClick={() => setEditSubSection({ ...data, sectionId: section._id })}
//                                         >
//                                             <MdEdit />
//                                         </button>
//                                         <button
//                                             onClick={() =>
//                                                 setConfirmationModal({
//                                                     text1: "Delete this subsection?",
//                                                     text2: "selected lecture will be deleted",
//                                                     btn1Text: "Delete",
//                                                     btn2Text: "Cancel",
//                                                     btn1Handler: () => handleDeleteSubSection(data._id, section._id),
//                                                     btn2Handler: () => setConfirmationModal(null),
//                                                 })}>

//                                             < RiDeleteBin6Line />
//                                         </button>
//                                     </div>

//                                 </div>
//                             ))}

//                             <button onClick={()=>setAddSubSection(section._id)}
//                                 className='mt-4 flex items-center gap-x-2 text-yellow-50'>
//                                 <AiOutlinePlus />
//                                 <p>Add Lecture</p>
//                             </button>
//                         </div>


//                     </details>
//                 ))}
//             </div>

//             {
//                 addSubSection ? (<SubSectionModal
//                     modalData={addSubSection}
//                     setModalData={setAddSubSection}
//                     add={true} />)

//                     : viewSubSection ? (<SubSectionModal
//                         modalData={viewSubSection}
//                         setModalData={setViewSubSection}
//                         view={true} />)
//                         : editSubSection ? (<SubSectionModal
//                             modalData={editSubSection}
//                             setModalData={setEditSubSection}
//                             edit={true} />)
//                             : (<div></div>)



//             }

//             {confirmationModal ? (
//                 <ConfirmationModal
//                     modalData={confirmationModal}
//                 />
//             ) : (<div></div>)}

          

//         </div>
//     )
// }

// export default NestedView




import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-richblack-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-richblack-300" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className={`text-xl text-richblack-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div
                  // ao by this setViewSubSection onClick wont propogate to down 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Add New Lecture to Section */}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  )
}