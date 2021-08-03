import axios from "axios";
import * as urlAPI from './URL'

//const latitude = '5.689333256489724', longitude = '-75.17554532853384';

export const getIp = async()=>{

    const response = await axios.get(`${urlAPI.baseUrl}precipitation`)

    
    return response.data;
}