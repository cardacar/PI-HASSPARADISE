import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/hpd/';

let token = null

const logInToken = window.localStorage.getItem("logInUser");

const setToken = newToken=>{
    token = `Bearer ${newToken}`;
}


export const getFertilizationAllAxios = async ()=>{
    setToken(logInToken);
    const config={
        headers:{
            Authorization: token
            
        }
    }

    const response = await axios.get(`${baseUrl}fertilization`, config);
    return response.data;
}

export const postFertilizationAxios = async (data)=>{
    setToken(logInToken);
    const config={
        headers:{
            Authorization: token
            
        }
    }
    const response = await axios.post(`${baseUrl}fertilization`,data, config);

    return response;
}

export const putFertilizationAxios = async (data, id)=>{
    setToken(logInToken);
    const config = {
        headers:{
            Authorization: token
        }
    }
    const response = await axios.put(`${baseUrl}fertilization/${id}`, data,config);
    
    return response;
}

export const deleteFertilizationAxios = async (id)=>{
    setToken(logInToken);
    const config={
        headers:{
            Authorization: token
            
        }
    }
    const response = await axios.delete(`${baseUrl}fertilization/${id}`, config);
    return response;
} 