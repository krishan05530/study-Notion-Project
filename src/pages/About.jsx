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
const About = () => {
    return (
        <div className='mx-auto mt-[100px text-white'>
            <section>
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
            </section>

            {/* section2 */}
            <section>
                <div>
                    <Quote />

                </div>
            </section>

            {/* section 3 */}
            <section>
                <div className='flex flex-col '>
                     
                     {/* foudnign tory */}
                    <div className='flex '>
                         {/* founding story left box */}
                        <div>
                            <h1>Our Founding Story</h1>
                            <p>
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p>
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>
                        {/* founding story right box */}
                        <div>
                        <img src={FoundingStory}  alt='founding story'/>
                        </div>
                        
                    </div>

                    {/* vision and mission */}
                   <div className='flex'>
                    {/* left box */}
                    <div>
                        <h1>Our Vision</h1>
                        <p>
                            Our vision is to revolutionize the way we learn by providing an innovative platform that combines technology, expertise, and community to create an unparalleled educational experience.
                        </p>
                    </div>
                        
                        {/* right box */}
                        <div>
                            <h1>Our Mission</h1>
                            <p>
                                Our mission is to empower individuals to reach their full potential by providing high-quality, accessible, and flexible learning opportunities. We are committed to fostering a dynamic and interactive learning environment that inspires creativity, critical thinking, and collaboration.
                            </p>
                        </div>
                   </div>

                </div>
            </section>

             {/* section4 */}
             <StatsComponent/>

             {/* section 5 */}
             <section className='mx-auto flex flex-col items-center justify-center gap-5 mb-[140px] '>
                <LearningGrid/>
                <ContactFormSection/>
                </section>
            
            <section>
                <div>
                    Review From other learner
                    {/* <ReviewSlider/> */}
                </div>
                </section>

                <Footer/>
        </div>
    )
}

export default About
