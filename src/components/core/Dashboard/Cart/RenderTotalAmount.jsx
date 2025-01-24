// import React from 'react'
// import { useSelector } from 'react-redux'
// import IconBtn from '../../../common/IconBtn'
// import { buyCourse } from '../../../../services/operations/studentFeaturesAPI'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const RenderTotalAmount = () => {
//     const {total} = useSelector((state)=>state.cart)
//     const {cart} = useSelector((state)=>state.cart)
//  const {token} = useSelector((state)=>state.auth)
//  const {user} = useSelector((state)=>state.profile)
//   const {courses} = useSelector((state)=>state.cart)
//   const Navigate =useNavigate();
//   const dispatch = useDispatch();
//     const handleBuyCourse=()=>{
//         // find the id of the courses in the cart
//       const course=cart.map((course)=>(course._id));
//       console.log("Bought these course:",course);

//       buyCourse(token,courses,user,Navigate,dispatch);
//       // TODO: connect to the payment gateway
//     }
//   return (
//     <div>
//       <p>Total</p>
//       <p>Rs {total}</p>
// <IconBtn text="Buy now" 
// onclick={handleBuyCourse}
//     customeClasses={"w-full justify-center"} />
//     </div>
//   )
// }

// export default RenderTotalAmount



import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}