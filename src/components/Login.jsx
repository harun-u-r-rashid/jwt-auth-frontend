import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {


        const navigate = useNavigate()


        const [error, setError] = useState("")

        const [isloading, setIsLoading] = useState(false)


        const [logindata, setLoginData] = useState({
                email: "",
                password: ""
        })

        const handleLogin = (e) => {
                setLoginData({ ...logindata, [e.target.name]: e.target.value })
        }

        const handleSubmit = async (e) => {
                e.preventDefault()
                const { email, password } = logindata
                if (!email || !password) {
                        setError("email and password are required!")


                }
                else {
                        setIsLoading(true)
                        // https://jwt-auth-u6f9.onrender.com/
                        // const res = await axios.post('http://127.0.0.1:8000/account/login/', logindata)
                        const res = await axios.post('https://jwt-auth-u6f9.onrender.com/account/login/', logindata)
                        const responce = res.data
                        console.log("responce", responce)

                        setIsLoading(false)

                        const user = {
                                'email': responce.email,
                                'fullname': responce.full_name
                        }

                        console.log(user);


                        if (res.status === 200) {
                                // localStorage.setItem("user", JSON.stringify(user))
                                localStorage.setItem('access', JSON.stringify(responce.access_token))
                                localStorage.setItem('refresh', JSON.stringify(responce.refresh_token))
                                navigate('/profile')
                                toast.success("login successfull")

                        }
                }

        }



        return (
                <section>
                <div className='container'>

                        <form onSubmit={handleSubmit} className="max-w-md mx-auto  shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h2 className='text-center text-white text-sm font-bold mb-5'>Sign In</h2>

                                {isloading && (
                                        <p className='text-white'>Loading...</p>
                                )}
                                {/* <p className="text-red-500 mb-4">{error ? error : ""}</p> */}

                                <div className="mb-4">

                                        <input type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter your email' value={logindata.email} onChange={handleLogin} />
                                </div>

                                <div className="mb-4">

                                        <input type="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Password' value={logindata.password} onChange={handleLogin} />
                                </div>



                                <div className="flex items-center justify-between">
                                        <button type="submit" className="btn">
                                                Sign In
                                        </button>
                                </div>
                        </form>

                </div>
        </section>
        );
};

export default Login;