import React from 'react'
import { useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';
const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch();


    return (
        <div>
            {
                cart.map((course, index) =>(
                    <div key={index}>
                        <div>
                            <img src={course?.thumbnail} alt='' />
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                <div>
                                    {/* getavergae Rating aPi connnect */}
                                    <span>4.8</span>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        edit={false}
                                        isHalf={true}
                                        emptyIcon={<GiNinjaStar />}
                                        fullIcon={<GiNinjaStar />}
                                        activeColor="#ffd700"
                                    />
                                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                                </div>
                            </div>
                        </div>

                        {/* remove from cart */}
                        <div>
                            <button
                                onclick={() => { dispatch(removeFromCart(course.Id)) }} >
                                <RiDeleteBinLine />
                                <span>  Remove</span>
                                {/* on clikung it , remove from cart */}
                            </button>
                            <p>Rs. {course?.price}</p>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses
