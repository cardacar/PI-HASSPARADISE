import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/hpd/';

let token = null

const logInToken = window.localStorage.getItem("logInUser");

const setToken = newToken=>{
    token = `Bearer ${newToken}`;
}


export const getFumigationAllAxios = async ()=>{
    setToken(logInToken);
    const config={
        headers:{
            Authorization: token
            
        }
    }

    const response = await axios.get(`${baseUrl}fumigation`, config);
    return response.data;
}

export const postFumigationnAxios = async (data)=>{
    setToken(logInToken);
    const config={
        headers:{
            Authorization: token
            
        }
    }
    const response = await axios.post(`${baseUrl}fumigation`,data, config);

    return response;
}

export const putFumigationnAxios = async (data, id)=>{
    setToken(logInToken);
    const config = {
        headers:{
            Authorization: token
        }
    }
    const response = await axios.put(`${baseUrl}fumigation/${id}`, data,config);
    
    return response;
}

export const deleteFumigationAxios = async (id)=>{
    setToken(logInToken);
    const config={
        headers:{
            Authorization: token
            
        }
    }
    const response = await axios.delete(`${baseUrl}fumigation/${id}`, config);
    return response;
} 