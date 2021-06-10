import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/hpd/';

let token = null

const logInToken = window.localStorage.getItem("logInUser");

const setToken = newToken=>{
    token = `Bearer ${newToken}`;
}

export const getUsersAxios = async () =>{
    setToken(logInToken)
    const config = {
        headers: {
            Authorization: token
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

export const postUserAxios = async (user)=>{
    const newUser = {
        fullName: user.fullName,
        cc: user.cc,
        birthDate: user.birthDate,
        password: user.password,
        role:[user.role],
        cellphone:user.cellphone
    }

    setToken(logInToken)
    const config = {
        headers:{
            Authorization: token
        }
    }
    
    const response = await axios.post(`${baseUrl}userAdmin`, newUser, config)
    
    response.data.birthDate = response.data.birthDate.split('T')[0];
    response.data.role = (response.data.role[0]==='60a18e786596d12420b8f546')? 'admin':'user'
    
    return response.data
}

export const putUserAxios = async (user, id)=>{
    const Role = user.role;
    if(Role === "admin"){
        user.role = ["60a18e786596d12420b8f546"]
    }else if(Role==="user"){
        user.role = ["60a18e786596d12420b8f545"]
    }
    const newUser = {
        fullName: user.fullName,
        cc: user.cc,
        birthDate: user.birthDate,
        password: user.password,
        role:user.role,
        cellphone:user.cellphone,
    }
    setToken(logInToken)
    const config = {
        headers:{
            Authorization: token
        }
    }
    
    const response = await axios.put(`${baseUrl}userAdmin/${id}`, newUser, config)
    response.data.birthDate = response.data.birthDate.split('T')[0];
    response.data.role = (response.data.role[0]==='60a18e786596d12420b8f546')? 'admin':'user'
    console.log(response.data)
    return response.data;
}

export const deleteUserAxios = async (id)=>{
    setToken(logInToken)
    const config = {
        headers:{
            Authorization: token
        }
    }

    const response = await axios.delete(`${baseUrl}userAdmin/${id}`, config);

    return response;
}

export const getRoles = ()=>([
    { id:"admin", title:"Admin"},
    { id:"user", title:"User"},
    { id:"gestorReportes", title:"gestorReportes"},
])

