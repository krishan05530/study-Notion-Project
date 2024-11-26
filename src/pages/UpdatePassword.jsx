import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
export default function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);

    // use prevdata and then update its field value
    const handleOnChnage = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const { password, confirmPassword } = formData;
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }
    return (
        <div className='text-white'>
            {
                loading ? (<div>Loading .. </div>)
                    :
                    (<div>
                        <h1>Choose new password</h1>
                        <p>Almost done. Enter your new password and youre all set.</p>
                        <form onSubmit={handleOnSubmit}>
                            <label>
                                <p>New Password <sup>*</sup></p>
                                <input required type={showPassword ? "text" : "password"}
                                    name='password' placeholder='Enter Password'
                                    onChange={handleOnChnage} 
                                    className='w-full p-6 bg-richblack-600 text-richblack-5' 
                                    />

                                <span onClick={() => setShowPassword((prev) => !prev)}>
                                    {
                                        showPassword ? <FaEyeSlash fontSize={24} /> : <FaEye fontSize={24} />
                                    }
                                </span>
                            </label>

                            <label>
                                <p>Confirm New Password <sup>*</sup></p>
                                <input required type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword' placeholder='Enter Confirm Password'
                                    onChange={handleOnChnage}
                                    className='w-full p-6 bg-richblack-600 text-richblack-5' 
                                    />

                                <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {
                                        showConfirmPassword ? <FaEyeSlash fontSize={24} /> : <FaEye fontSize={24} />
                                    }
                                </span>
                            </label>

                            <button type='submit'>Reset Password</button>
                        </form>

                        <div>
                            <Link to="/login">
                            BACK to login
                            </Link>
                        </div>

                    </div>)
            }
        </div>
    )
}
