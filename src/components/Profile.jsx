import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const Profile = () => {

        const navigate = useNavigate()
        const user = JSON.parse(localStorage.getItem('user'))
        const jwt_access = localStorage.getItem('access')

        useEffect(() => {
                if (jwt_access === null && !user) {
                        navigate('/login')
                }
                else {
                        getSomeData()
                }

        }, [jwt_access, user])


        const refresh = JSON.parse(localStorage.getItem('refresh'))

        const getSomeData = async () => {
                const resp = await axiosInstance.get("account/get-something/")
                if (resp.status === 200) {
                        console.log(resp.data)
                }
        }


        const handleLogout = async () => {
                const res = await axiosInstance.post('account/logout/', { "refresh_token": refresh })
                if (res.status === 200) {
                        localStorage.removeItem('access')
                        localStorage.removeItem('refresh')
                        // localStorage.removeItem('user')

                        navigate('/login')
                        toast.success('Logout Successfull!')
                }
        }
        return (

                <>
                        <section>

                                <div className='container profile-containar'>

                                <h1 className='text-white'>Hello, {user.fullname}</h1>
                                <p className='text-white'>Welcome to your profile</p>
                                <button onClick={handleLogout} className='logout-btn mt-5 text-white'>Logout</button>

                                </div>
                               
                        </section>


                </>
        );
};

export default Profile;