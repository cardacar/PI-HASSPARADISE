import conexion from '../database/db.js'

export const addUser = (req,res)=> {
    const {name1, password, idUser, date} = req.body
    conexion.query("INSERT INTO hasspabd.usuarios (`idUsuarios`, `pass`, `nombre`, `apellido`, `fechaNacimiento`) VALUES (?, ?, ?, ?, ?)",
    [name1,password,idUser,date],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send({message:"data received"})
        }
      console.log(result)  
    }
    );


}


export const deleteUser =(req,res)=> {
    res.send("otra cosa")
}