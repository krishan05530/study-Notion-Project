import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json";

// // react useFrom hook : so we dont have to hanlde state avlidation and managment
// const ContactUsForm = () => {
//     const [loading, setLoading] = useState(false);
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors, isSubmitSuccessful }
//     } = useForm();


//     const submitContactForm = async (data) => {
//         // contactUS controller :->  
//         console.log(data);
//         try {
//             setLoading(true);
//             //const response= await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
//             const response = { status: "ok" }; // mock response
//             console.log(response);
//             setLoading(false);
//         }
//         catch (error) {
//             console.log("Error", error.message);
//             setLoading(false);
//         }
//     }


//     useEffect(() => {
//         if (isSubmitSuccessful) {
//             reset(
//                 {
//                     email: "",
//                     firstname: "",
//                     lastname: "",
//                     message: "",
//                     phoneNo: "",
//                 }
//             );
//         }
//     }, [reset, isSubmitSuccessful]);
//     // we use some kind of form in which the shape of form chnages(form structure chnages) if option selected that why , the reset defination also chnages, hence we use reset as a dependency




const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );

    //krishan
    return (
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex flex-col gap-14'>
                <div className='flex gap-5 '>
                    {/* firstNAme */}
                    <div className='flex flex-col'>
                        <label htmlFor='firstname'> first Name </label>

                        <input type='text'
                            name='firstname'
                            id="firstname"
                            placeholder='Enter first name'
                            className='text-black'
                            {...register("firstname", { required: true })}
                        />
                        {
                            errors.firstName && (
                                <span>
                                    please enter your first name
                                </span>
                            )
                        }

                    </div>



                    {/* lastname */}
                    <div className='flex flex-col'>
                        <label htmlFor='lastname'> Last Name </label>

                        <input type='text'
                            name='lastname'
                            id="lastname"
                            placeholder='Enter Last name'
                            className='text-black'
                            {...register("lastname")}
                        />

                    </div>


                </div>

                {/* email */}
                <div className='flex flex-col'>
                    <label htmlFor='email'> Email Add </label>

                    <input type='email'
                        name='email'
                        id="email"
                        placeholder='Enter email Add'
                        className='text-black'
                        {...register("email", { required: true })}
                    />
                    {
                        errors.email && (
                            <span>
                                please enter your email Addres
                            </span>
                        )
                    }

                </div>

        

                {/* phone no */}
                <div className='flex flex-col gap-2 '>
                    <label htmlFor='phonenumber'>phone Number</label>
                    <div className='flex flex-row gap-5 '>
                        {/* dropdown */}
                      
                        <select
                            name='dropdown'
                            id="dropdown"
                            className='bg-richblack-800 w-[90px]'
                            {...register("countrycode", { required: true })}>
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code}-{element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>



   

                     
                            <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 6789'
                            className='text-black w-[calc(100%-100px)] '
                            {...register("phoneNo", {
                                 required: {value:true, message:"Enter the phone Number"},
                                 maxLength:{value:10,message :"invalid phone Number"},
                                 minLength:{value:8,message:"Invalid phone number"}})}
                            />
                   

                          
                    </div>
                    {
                        errors.phoneNo && (
                             <span>
                                {errors.phoneNo.message}
                             </span>
                        )
                    }


         
                </div>

                {/* message */}
                <div className='flex flex-col'>
                    <label htmlFor='message'>
                        Message
                    </label>
                    <textarea
                        name='message'
                        id='message'
                        cols="30"
                        rows="7"
                        placeholder='Enter your message'
                        className='text-black'
                        {...register("message", { required: true })} />

                    {
                        errors.message && (
                            <span>
                                please enter your message
                            </span>
                        )
                    }
                </div>

                {/* button */}
                <button type='submit'
                    className='rounded-md bg-yellow-50 
                    text-center px-6 text-[16px] 
                    font-bold text-black' > Send Message </button>

            </div>

        </form>
    )





  
}

export default ContactUsForm




