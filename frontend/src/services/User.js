import axios from 'axios';

export const baseUrl = 'http://localhost:3001/hsp/adminUsers'

export const getUserFetch = (url)=>{
    return axios.get(url);
}

export const prueba = ()=>{
    console.log('hola')
}