import axios from 'axios';

export const baseUrl = 'http://localhost:3001/hsp/'

export const getUserFetch = (url, data)=>{
    return axios.post(url,data);
}

export const prueba = ()=>{
    console.log('hola')
}