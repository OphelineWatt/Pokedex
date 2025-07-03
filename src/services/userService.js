import { data } from "react-router-dom";
import API from "./api";

export const register = (data) => API.post('/register',data);
export const login = (data) => API.post('/login',data);
export const getProfile = () => API.get ('/profile', {
    headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const updateProfile = (data) => API.put('/profile/update', data,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
})

export const updatePassword = (data) => API.put('/profile/password', data,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
})


