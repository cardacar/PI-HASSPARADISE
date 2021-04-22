import mysql from 'mysql'

const conexion = mysql.createConnection({
    
    host: process.env.HOST_DB,
    database: process.env.DATABASE,
    user: 'root',
    password: 'root'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('LO LOGRAMOS CARLITOS')
    }
});



export default conexion;

