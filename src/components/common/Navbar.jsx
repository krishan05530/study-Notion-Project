import React, { useEffect } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropdown from "../core/Auth/ProfileDropDown"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import { IoMdArrowDropdownCircle } from "react-icons/io";



const subLinks = [
    {
        title: "python",
        link: "/catalog/python",
    }
    , {
        title: "web dev",
        link: "/catalog/web-development",
    }

];

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.auth);
    const location = useLocation();

    //const [subLinks, setSubLinks] = React.useState([]);

    //  const fetchData= async ()=>{
    //     try{
    //         const result= await apiConnector("GET",categories.CATEGORIES_API)
    //         console.log("printing sublink result",result);
    //         setSubLinks(result.data.data);
    //        }
    //        catch(error){
    //            console.log("could not fetch catalog list");
    //            }
    // };

    //  useEffect( () => { 
    //    // fetchData();
    //  }, [] );






    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

                {/* image */}
                <Link to='/'>
                    <img src={logo} width={160} height={42} alt='logo img not found' />
                </Link>

                {/* Navlink */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className='relative flex  items-center gap-2 group'>
                                                <p className='text-richblack-25'>{link.title}</p>
                                                <IoMdArrowDropdownCircle />

                     <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                 top-[40%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 w-[300px]'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                                    {
                                                        subLinks.length ? (

                                                            subLinks.map((subLink, index) => (
                                                                <Link to={`${subLink.link}`} key={index}>

                                                                    <p className=''>{subLink.title}</p>

                                                                </Link>
                                                            ))

                                                        ) : (<div></div>)

                                                    }

                                                </div>


                                            </div>






                                        ) : (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25"
                                                    : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>

                </nav>



                {/* Login /signup dashboARD */}
                <div className='flex gap-4 items-center '>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <CiShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )


                    }

                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Signup
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown />

                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar
