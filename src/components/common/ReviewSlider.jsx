import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay } from "swiper/modules"; // Import modules
import ReactStars from "react-rating-stars-component";
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncatWords = 15;

  useEffect(() => {

    const fetchAllReviews = async () => {
      const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
      console.log("lOGGING RESPONSE IN FETCH ALL REVIW", data);
      // console.log("lOGGING RESPONSE IN FETCH ALL REVIW2", data.data);
      // console.log("lOGGING RESPONSE IN FETCH ALL REVIW3", data?.data?.data);

      if (data?.success) {
        console.log("insode this");
        setReviews(data.data);
      }

      console.log("Printing review", reviews);
    }
    fetchAllReviews();
  }, []);
  // return (
  //   <div className='text-white'>
  //     <div className='h-[190px] max-w-maxContent'>
  //       <Swiper
  //         slidesPerView={4}
  //         spaceBetween={24}
  //         loop={true}
  //         FreeMode={true}
  //         autoplay={{
  //           delay: 2500,

  //         }}
  //         modules={[FreeMode, Pagination, Autoplay]}
  //         className='w-full'>

  //         {
  //           reviews.map((review, index) => (
  //             // console.log("review inside", review);
  //             // console.log("review firstanme", review?.user?.firstName);
  //             <SwiperSlide key={index}>
               
  //               <img
  //                 src={review?.user?.image
  //                   ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
  //                 alt='profile pic'
  //                 className='h-9 w-9 object-cover rounded-full'
  //               />
  //               <p>{review?.user?.firstName}</p>
  //               <p>{review?.user?.lastName}</p>

  //               <p>{review?.course?.courseName}</p>
  //               <p>
  //                 {review?.review}
  //               </p>
  //               <p>{review.rating.toFixed(1)}</p>
  //               <ReactStars
  //                 count={5}
  //                 size={24}
  //                 value={review.rating}
  //                 edit={false}
  //                 activeColor="#ffd700"
  //                 emptyIcon={<FaStar/>}
  //                 halfIcon={<FaStarHalfAlt/>}
  //               />
  //             </SwiperSlide>
  //           ))
  //         }
  //       </Swiper>

  //     </div>

  //   </div>
  // )

  return (
    <div className='text-white'>
        <div className='h-[190px] max-w-maxContent'>
            <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay: 2500,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className='w-full'
            >

                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <img
                            src={review?.user?.image
                             ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                              alt='Profile Pic'
                              className='h-9 w-9 object-cover rounded-full'
                            />
                            <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p>{review?.course?.courseName}</p>
                            <p>
                                {review?.review}
                            </p>
                            <p>{review?.rating.toFixed(1)}</p>
                            <ReactStars 
                                count={5}
                                value={review.rating}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    </div>
  )


}

export default ReviewSlider
