import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const VerifyEmail = () => {
        const [otp, setOtp] = useState("")
        const navigate = useNavigate()

        const handleOtpSubmit = async (e) => {
                e.preventDefault()
                if (otp) {
                        // https://jwt-auth-u6f9.onrender.com/
                        // const response = await axios.post('http://127.0.0.1:8000/account/verify/', { 'otp': otp })
                        const response = await axios.post('https://jwt-auth-u6f9.onrender.com/account/verify/', { 'otp': otp })
                        if (response.status === 200) {
                                navigate('/login')
                                toast.success(response.data.message)
                        }
                }

        }

        return (
                <>
                <section>

                        <div className='container'>
                        <form onSubmit={handleOtpSubmit} className="max-w-md mx-auto  shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h2 className='text-center text-white text-sm font-bold mb-5'>Verify your email</h2>

                             

                                <div className="mb-4">

                                        <input type="text" name="otp" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter your otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
                                </div>

                        
                                <div className="flex items-center justify-between">
                                        <button type="submit" className="btn">
                                               Verify
                                        </button>
                                </div>
                        </form>
                        </div>
                </section>
                </>

        );
};

export default VerifyEmail;