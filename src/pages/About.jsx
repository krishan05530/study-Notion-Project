import React from 'react'
import HighlightText from "../components/core/HomePage/HighlightText.js"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats.jsx'
import LearningGrid from '../components/core/AboutPage/LearningGrid.jsx'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection.jsx'
import Footer from '../components/common/Footer.jsx'
import ReviewSlider from '../components/common/ReviewSlider.jsx'
const About = () => {
    return (
        <div className='mx-auto mt-[100px text-white'>
            {/* <section>
                <div>
                    <header>
                        Driving Innovation in Online Education for a Brighter Future
                        <p>
                            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                        <HighlightText text={"Brighter Future"} />
                    </header>
                    <div className='flex gap-x-3 mx-auto'>
                        <img src={BannerImage1} />
                        <img src={BannerImage2} />
                        <img src={BannerImage3} />
                    </div>
                </div>
            </section> */}

            <section className="bg-richblack-700">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
                    <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                        Driving Innovation in Online Education for a
                        <HighlightText text={"Brighter Future"} />
                        <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                            Studynotion is at the forefront of driving innovation in online
                            education. We're passionate about creating a brighter future by
                            offering cutting-edge courses, leveraging emerging technologies,
                            and nurturing a vibrant learning community.
                        </p>
                    </header>
                    <div className="sm:h-[70px] lg:h-[150px]"></div>
                    <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
                        <img src={BannerImage1} alt="" />
                        <img src={BannerImage2} alt="" />
                        <img src={BannerImage3} alt="" />
                    </div>
                </div>
            </section>

            {/* section2 */}
            {/* <section>
                <div>
                    <Quote />

                </div>
            </section> */}


            <section className="border-b border-richblack-700">
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="h-[100px] "></div>
                    <Quote />
                </div>
            </section>

            {/* section 3 */}
            {/* <section>
                <div className='flex flex-col '>
                     
                     
                    <div className='flex '>
                       
                        <div>
                            <h1>Our Founding Story</h1>
                            <p>
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p>
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>

                        <div>
                        <img src={FoundingStory}  alt='founding story'/>
                        </div>
                        
                    </div>

               
                   <div className='flex'>
               
                    <div>
                        <h1>Our Vision</h1>
                        <p>
                            Our vision is to revolutionize the way we learn by providing an innovative platform that combines technology, expertise, and community to create an unparalleled educational experience.
                        </p>
                    </div>
             
                        <div>
                            <h1>Our Mission</h1>
                            <p>
                                Our mission is to empower individuals to reach their full potential by providing high-quality, accessible, and flexible learning opportunities. We are committed to fostering a dynamic and interactive learning environment that inspires creativity, critical thinking, and collaboration.
                            </p>
                        </div>
                   </div>

                </div>
            </section> */}

            <section>
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                    <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                        <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Our Founding Story
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Our e-learning platform was born out of a shared vision and
                                passion for transforming education. It all began with a group of
                                educators, technologists, and lifelong learners who recognized
                                the need for accessible, flexible, and high-quality learning
                                opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                As experienced educators ourselves, we witnessed firsthand the
                                limitations and challenges of traditional education systems. We
                                believed that education should not be confined to the walls of a
                                classroom or restricted by geographical boundaries. We
                                envisioned a platform that could bridge these gaps and empower
                                individuals from all walks of life to unlock their full
                                potential.
                            </p>
                        </div>

                        <div>
                            <img
                                src={FoundingStory}
                                alt=""
                                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                Our Vision
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                With this vision in mind, we set out on a journey to create an
                                e-learning platform that would revolutionize the way people
                                learn. Our team of dedicated experts worked tirelessly to
                                develop a robust and intuitive platform that combines
                                cutting-edge technology with engaging content, fostering a
                                dynamic and interactive learning experience.
                            </p>
                        </div>
                        <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                                Our Mission
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* section4 */}
            <StatsComponent />

            {/* section 5 */}
            {/* <section className='mx-auto flex flex-col items-center justify-center gap-5 mb-[140px] '>
                <LearningGrid/>
                <ContactFormSection/>
                </section> */}

            <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
                <LearningGrid />
                <ContactFormSection />
            </section>

            <div>
                    <h1 className="text-center text-4xl font-semibold mt-8">
                        Reviews from other learners
                    </h1>

                    <ReviewSlider />
                </div>
    





            <Footer />
        </div>
    )


    // return (
    //     <div>
    //       <section className="bg-richblack-700">
    //         <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
    //           <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
    //             Driving Innovation in Online Education for a
    //             <HighlightText text={"Brighter Future"} />
    //             <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
    //               Studynotion is at the forefront of driving innovation in online
    //               education. We're passionate about creating a brighter future by
    //               offering cutting-edge courses, leveraging emerging technologies,
    //               and nurturing a vibrant learning community.
    //             </p>
    //           </header>
    //           <div className="sm:h-[70px] lg:h-[150px]"></div>
    //           <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
    //             <img src={BannerImage1} alt="" />
    //             <img src={BannerImage2} alt="" />
    //             <img src={BannerImage3} alt="" />
    //           </div>
    //         </div>
    //       </section>

    //       <section className="border-b border-richblack-700">
    //         <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
    //           <div className="h-[100px] "></div>
    //           <Quote />
    //         </div>
    //       </section>

    //       <section>
    //         <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
    //           <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
    //             <div className="my-24 flex lg:w-[50%] flex-col gap-10">
    //               <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
    //                 Our Founding Story
    //               </h1>
    //               <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
    //                 Our e-learning platform was born out of a shared vision and
    //                 passion for transforming education. It all began with a group of
    //                 educators, technologists, and lifelong learners who recognized
    //                 the need for accessible, flexible, and high-quality learning
    //                 opportunities in a rapidly evolving digital world.
    //               </p>
    //               <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
    //                 As experienced educators ourselves, we witnessed firsthand the
    //                 limitations and challenges of traditional education systems. We
    //                 believed that education should not be confined to the walls of a
    //                 classroom or restricted by geographical boundaries. We
    //                 envisioned a platform that could bridge these gaps and empower
    //                 individuals from all walks of life to unlock their full
    //                 potential.
    //               </p>
    //             </div>

    //             <div>
    //               <img
    //                 src={FoundingStory}
    //                 alt=""
    //                 className="shadow-[0_0_20px_0] shadow-[#FC6767]"
    //               />
    //             </div>
    //           </div>

    //           <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
    //             <div className="my-24 flex lg:w-[40%] flex-col gap-10">
    //               <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
    //                 Our Vision
    //               </h1>
    //               <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
    //                 With this vision in mind, we set out on a journey to create an
    //                 e-learning platform that would revolutionize the way people
    //                 learn. Our team of dedicated experts worked tirelessly to
    //                 develop a robust and intuitive platform that combines
    //                 cutting-edge technology with engaging content, fostering a
    //                 dynamic and interactive learning experience.
    //               </p>
    //             </div>
    //             <div className="my-24 flex lg:w-[40%] flex-col gap-10">
    //               <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
    //               Our Mission
    //               </h1>
    //               <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
    //               Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </section>

    //       <StatsComponent />
    //       <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
    //         <LearningGrid />
    //         <ContactFormSection />
    //       </section>

    //       <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
    //         {/* Reviws from Other Learner */}
    //         <h1 className="text-center text-4xl font-semibold mt-8">
    //           Reviews from other learners
    //         </h1>
    //         {/* <ReviewSlider /> */}
    //         <ReviewSlider />
    //       </div>
    //       {/* <Footer /> */}
    //       <Footer />
    //     </div>
    //   )
}

export default About
