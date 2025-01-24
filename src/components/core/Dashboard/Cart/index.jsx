import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'
const Cart = () => {
// need to check if state.cart
    const { total,totalItems} = useSelector((state)=>state.cart)  

  return (
    <div className='text-white'>
      <h1>Your Cart</h1>
      <p>{totalItems}Courses in Cart</p>
      { total > 0 
        ?(<div>
            <RenderCartCourses/>
            <RenderTotalAmount/>
        </div>

        ):(<div>your cart is empty</div>)
      }
    </div>
  )
}

export default Cart
