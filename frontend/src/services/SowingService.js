import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/hpd/';

let token = null

const logInToken = window.localStorage.getItem("logInUser");

const setToken = newToken=>{
    token = `Bearer ${newToken}`;
}

export const getSowingAllAxios = async ()=>{
    setToken(logInToken);
    const config={
        headers:{
            Authorization: token
            
        }
    }

    const response = await axios.get(`${baseUrl}sowing`, config);
    return response.data;
}

export const postSowingAxios = async (data)=>{
    setToken(logInToken);
    const config={
        headers:{
            Authorization: token
            
        }
    }
    const response = await axios.post(`${baseUrl}sowing`,data, config);

    return response;
}

export const putSowingAxios = async (data, id)=>{
    setToken(logInToken);
    const config = {
        headers:{
            Authorization: token
        }
    }
    const response = await axios.put(`${baseUrl}sowing/${id}`, data,config);
    
    return response;
}

export const deleteSowingAxios = async (id)=>{
    setToken(logInToken);
    const config={
        headers:{
            Authorization: token
            
        }
    }
    const response = await axios.delete(`${baseUrl}sowing/${id}`, config);
    return response;
} 