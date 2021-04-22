import mysql from 'mysql'

const conexion = mysql.createConnection({
    host:'localhost',
    database:'hasspabd',
    user:'root',
    password:'root'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conexion a base de datos Exitosa')
    }
});



export default conexion;

