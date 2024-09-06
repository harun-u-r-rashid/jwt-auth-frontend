import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'



const token = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : ""
const refresh_token = localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : ""

// https://jwt-auth-u6f9.onrender.com/
// const baseURL = 'http://127.0.0.1:8000/'
const baseURL = 'https://jwt-auth-u6f9.onrender.com/'

const axiosInstance = axios.create({
        baseURL: baseURL,
        'Content-type': 'application/json',
        headers: {
                Authorization: localStorage.getItem('access') ? `Bearer ${token}` : null
        }
});



axiosInstance.interceptors.request.use(async req => {
        if (token) {
                req.headers.Authorization =  `Bearer ${token}`
                const user = jwtDecode(token)
                const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
                if (!isExpired) {
                        return req
                }

                else {
                        const res = await axios.post(`${baseURL}account/token/refresh/`, { refresh: refresh_token })
                        console.log(res.data)

                        if (res.status === 200) {
                                localStorage.setItem('access', JSON.stringify(res.data.access))
                                req.headers.Authorization = `Bearer ${res.data.access}`
                                return req
                        }
                        else {
                                const res = await axios.post(`${baseURL}/account/logout`, { 'refresh_token': refresh })
                                if (res.status === 200) {
                                        localStorage.removeItem('access')
                                        localStorage.removeItem('refresh')
                                        localStorage.removeItem('user')
                                }
                        }
                }
        }
})


export default axiosInstance



