import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/hpd/';

export const getUsersAxios = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${baseUrl}userAdmin`, config);
    response.data.forEach((datetime, index) => {
        response.data[index].birthDate = datetime.birthDate.split('T')[0];
        if(response.data[index].role[0]==='60a18e786596d12420b8f546'){
            response.data[index].role = 'admin'
        }else{
            response.data[index].role = 'user'
        }
    })
    return response.data;
}