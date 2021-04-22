import conexion from '../database/db.js'

export const addUser = (req,res)=> {
    const {nombre,apellido, pass, idUsuario, fechaNacimiento} = req.body
    conexion.query("INSERT INTO hasspabd.usuarios (`idUsuarios`, `pass`, `nombre`, `apellido`, `fechaNacimiento`) VALUES (?, ?, ?, ?, ?)",
    [ idUsuario,pass,nombre,apellido, fechaNacimiento],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send({message:"New User added"})
        }
      console.log(result)  
    }
    );
}


export const deleteUser =(req,res)=> {
    const{id}=req.params
    conexion.query("DELETE FROM hasspabd.usuarios WHERE idUsuarios = ? ",[id],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send({message:"User Deleted"})
        }
      console.log(result)  
    })
}

export const updateUser =(req,res)=>{
    const{id}=req.params
    const {nombre,apellido, pass, fechaNacimiento} = req.body
    if(!nombre || !apellido || !pass || !fechaNacimiento){
        res.json({msg:"Ningun campo puede estar vacio"})

    }else{

    conexion.query("UPDATE hasspabd.usuarios SET  pass = ?, nombre = ? , apellido = ? , fechaNacimiento = ? WHERE idUsuarios = ? ",
    [ pass,nombre,apellido, fechaNacimiento, id],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send({message:"User Updated"})
        }
      console.log(result)  
    }
    )

    }
    
}

export const getUser =(req,res) =>{
    const{id}=req.params
    conexion.query("SELECT * FROM hasspabd.usuarios WHERE idUsuarios = ? ", [id],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send(result)
            //res.send({message:"User Updated"})
        }
      console.log(result)  
    }
    )
    
}


export const getAllUsers =(req,res) =>{
    
    conexion.query("SELECT * FROM hasspabd.usuarios ",
    (err,result)=>{
        if(err){
            res.send({err:err})
        }else{
            res.send(result)
            //res.send({message:"User Updated"})
        }
      console.log(result)  
    }
    )
    
}
