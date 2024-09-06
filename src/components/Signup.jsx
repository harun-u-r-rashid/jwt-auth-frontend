import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: ''
    });

    const handleSigninWithGoogle = async (response) => {
        const payload = response.credential;
        try {
            console.log("Payload being sent:", payload); // Log payload
            // https://jwt-auth-u6f9.onrender.com/
            // const server_res = await axios.post("http://127.0.0.1:8000/social/google/", { 'access_token': payload });
            const server_res = await axios.post("https://jwt-auth-u6f9.onrender.com/social/google/", { 'access_token': payload });
            console.log("Server response:", server_res.data);
            navigate("/profile");
        } catch (error) {
            console.error("Google Sign-in Error:", error.response ? error.response.data : error.message);
            toast().fire({
                icon:'error',
                title: error
            });
        }
    };


    useEffect(() => {
        // Global google
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleSigninWithGoogle
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large", text: "continue_with", shape: "circle" }
        );
    }, []);



    const [error, setError] = useState("");




    const handleOnChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, first_name, last_name, password, confirm_password } = formdata;

        if (!email || !first_name || !last_name || !password || !confirm_password) {
            toast.error('All fields are required!')
    
        } else if (password !== confirm_password) {
            
        
        } else {
           
            try {
                console.log("Request Payload: ", formdata); 
                // https://jwt-auth-u6f9.onrender.com/
                // const res = await axios.post("http://127.0.0.1:8000/account/register/", formdata);
                const res = await axios.post("https://jwt-auth-u6f9.onrender.com/account/register/", formdata);
                const response = res.data;
                console.log("Response: ", response); 

                if (res.status === 201) {
                    navigate("/verify"); 
                    toast.success(response.message);
                }
            } catch (error) {
                toast.error(error);
            }
        }
    };

    const { email, first_name, last_name, password, confirm_password } = formdata;

    return (
       <>
       <section>
       <div className='container'>
                    
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto  shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className='text-center text-white text-sm font-bold mb-5'>Create Account</h2>
                        {/* <p className="text-red-500 mb-4">{error ? error : ""}</p> */}

                        <div className="mb-4">
                           
                            <input type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter your email' value={email} onChange={handleOnChange} />
                        </div>

                        <div className="mb-4">
                           
                            <input type="text" name="first_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='First Name' value={first_name} onChange={handleOnChange} />
                        </div>

                        <div className="mb-4">
                           
                            <input type="text" name="last_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Last Name' value={last_name} onChange={handleOnChange} />
                        </div>

                        <div className="mb-4">
                         
                            <input type="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Password' value={password} onChange={handleOnChange} />
                        </div>

                        <div className="mb-4">
                           
                            <input type="password" name="confirm_password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Confrim Password' value={confirm_password} onChange={handleOnChange} />
                        </div>

                        <div className="flex items-center justify-between">
                            <button type="submit" className="btn">
                                Sign Up
                            </button>
                        </div>

                        <div>
                       
                        <h1 className='have-account'>Have Account? 
                        <Link to="/login/"> Sign In</Link>

                        </h1>
                          
                        </div>
                    </form>
                    


                    <div className='googleContainer' id='signInDiv'></div>
                    {/* <br />
                    <div className='githubContainer'>
                        <button>Signup with GitHub</button>
                    </div> */}
                </div>
       </section>
       </>
    );
};

export default Signup;

