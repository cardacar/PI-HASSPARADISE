import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/hpd/';
/* let token = null
const setToken = newToken=>{
    token = `Bearer ${newToken}`;
} */
export const getFertilizationAllAxios = async (token)=>{
    const config={
        headers:{
            Authorization: `Bearer ${token}`
            
        }
    }
    const response = await axios.get(`${baseUrl}fertilization`, config);
    //console.log(response.data)
    return response.data;
}