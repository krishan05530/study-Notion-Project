import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {

    const { user } = useSelector((state) => state.profile);

    // to check validity authenticaion
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();





    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
    } = course;

// if valid user but its instructor
    const handleAddToCart = () => {
       if(user && user?.accountType===ACCOUNT_TYPE.INSTRUCTOR)
       {
        toast.error("Instructor can't buy course");
       }
      // of authorized person come to buy course
       if(token)
        {
            console.log("dispatching add to cart");
           dispatch(addToCart(course));
           return;
        }
 // if unauthorized person come to buy course , then show confirmation modal
       setConfirmationModal({
        text1:"You are not logged in",
        text2:"pls loggin to add to cart",
        btn1text:"Login",
        btn2text:"cancel",
        btn1Handler:()=>navigate("/login"),
        btn2Handler:()=>setConfirmationModal(null)
       })
    }

 

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    };
    

    return (
        <div >
            <img
                src={ThumbnailImage}
                alt='Thumbnail'
                className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
            />
            <div>
                Rs.{CurrentPrice}
            </div>
            <div className='flex flex-col gap-y-6'>
                {/* course data->studentEnrolled->currentloggedin user ki id match kro , agar present he , it mean usne course purchase kar liye he  */}
                {/* buy button if havnt bought the course, after then chnage it to go to course */}
                <button
                    className='bg-yellow-50 w-fit  text-richblack-900'

                    onClick={
                        user && course?.studentsEnrolled.includes(user._id) ?
                            () => navigate(`/dashboard/enrolled-courses`) : handleBuyCourse
                    }
                >
                    {
                        user && course?.studentsEnrolled.includes(user._id) ? "Go to course" : "Buy now"
                    }
                </button>

                {/* when student is not enrolled then show add to cart  */}

                {
                    (!course?.studentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart} className='bg-yellow-50 w-fit  text-richblack-900'>
                            Add to cart
                        </button>
                    )
                }


            </div>
            <div>
                <p>
                    30-days money back guarantee
                </p>
                <p>
                    this course includes
                </p>
                <div className='flex flex-col gap-y-3'>
                    {
                        course?.instructions?.map((item, index) => (
                            <p key={index} className='flex gap-2'>
                                <span>{item}</span>
                            </p>
                        ))
                    }

                </div>
            </div>


            <div >
                <button onClick={handleShare}
                    className='mx-auto flex items-center gap-2  p-6 text-yellow-50'>
                    share
                </button>
            </div>
        </div>
    )

}

export default CourseDetailsCard