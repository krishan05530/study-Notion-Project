// import React from 'react'




// import { Swiper, SwiperSlide } from 'swiper/react';
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'

// import Course_Card from './Course_Card'

// const CourseSlider = ({ Courses }) => {
//     return (
//         <>
//            {
//                 Courses?.length ? (
//                 <Swiper 
//                 slidesPerView={1}
//                 loop={true}
//                 spaceBetween={200}
//                 pagination={true}
//                 modules={[Autoplay,Pagination,Navigation]}
//                 className="mySwiper"
//                 autoplay={{
//                 delay: 1000,
//                 disableOnInteraction: false,
//                 }}
//                 navigation={true}
//                 breakpoints={{
//                     1024:{slidesPerView:3,}
//                 }}
//                 >
//                     {
//                         Courses?.map((course, index) =>
//                         (
//                             <SwiperSlide key={index}>
//                                 <Course_Card course={course} Height={"h-[250px]"} />
//                             </SwiperSlide>

//                         ))
//                     }
//                 </Swiper>
//                 ):
//                 (<p>No course found</p>)
//               }
//         </>

//     )
// }

// export default CourseSlider




// import React from 'react'

// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// import { Autoplay } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// import Course_Card from './Course_Card'

// const CourseSlider = ({Courses}) => {
//   return (
//     <>
//         {
//             Courses?.length ? (
//                 <Swiper
//                      loop={true}
//                     spaceBetween={200}
//                     centeredSlides={true}
//                     autoplay={{
//                       delay: 1000,
//                       disableOnInteraction: false,
//                     }}
//                     pagination={{
//                       clickable: true,
//                     }}
//                     navigation={true}
//                     modules={[Autoplay, Pagination, Navigation]}
//                     className="mySwiper"
//                 >
//                     {
//                         Courses?.map((course, index)=> (
//                             <SwiperSlide key={index}>
//                                 <Course_Card course={course} Height={"h-[250px]"} />
//                             </SwiperSlide>
//                         ))
//                     }   
//                 </Swiper>
//             ) : (
//                 <p>No Course Found</p>
//             )

//         }
//     </>
//   )
// }

// export default CourseSlider






// import {Swiper, SwiperSlide} from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import { Navigation, Pagination, Scrollbar, A11y,FreeMode } from 'swiper/modules';
// // import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
// import { Autoplay}  from 'swiper'

// import Course_Card from './Course_Card'

// const CourseSlider = ({Courses}) => {
//   return (
//     <>
//       {Courses?.length ? (
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={25}
//           loop={true}
//           modules={[FreeMode, Pagination]}
//           breakpoints={{
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//           className="max-h-[30rem]"
//         >
//           {Courses?.map((course, i) => (
//             <SwiperSlide key={i}>
//               <Course_Card course={course} Height={"h-[250px]"} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p className="text-xl text-richblack-5">No Course Found</p>
//       )}
//     </>
//   )
// }

// export default CourseSlider


import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Autoplay } from "swiper/modules"; // Import modules

import Course_Card from "./Course_Card";

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]} // Add modules here
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
