import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';

// reset your password page 
// check your email page
const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch=useDispatch();

    // from auth state after destructre
    const { loading } = useSelector((state) => state.auth);

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
    return (
        <div className='text-white flex justify-center items-center '>
            {
                loading ? (<div>Loading .. </div>) :
                    (<div>
                        <h1>
                            {
                                !emailSent ? "reset Your Password " : "check your email"
                            }
                        </h1>
                        <p>
                            {
                                !emailSent ? "Have n fear . we'll email you instrunction to rset your password. if you dont have acess to your email we can try account recovery" :
                                    `we have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label className='bg-richblack-600'>
                                        <p>Email Address</p>
                                        <input required type='email'
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter your emal Address' 
                                           className='text-black' ></input>
                                    </label>


                                )
                            }
                            <button type='submit'>
                                {
                                    !emailSent ? "Reset Pasword" : "Resent Email"
                                }   

                            </button>
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
export default ForgotPassword

