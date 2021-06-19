import axios from 'axios';

export const baseUrl = 'http://localhost:3001/api/hpd/'

export const loginAxios = async (cedula,password)=>{
    
    const response = await axios.post(`${baseUrl}auth/signIn`,{cedula,password})
    if(response.data.message){
        const message = response.data.message
        return {message:message}
    }
    const token = response.data.token;
    return {token:token};
}
