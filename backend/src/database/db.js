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
        console.log('LO LOGRAMOS CARLITOS')
    }
});


export default conexion;

