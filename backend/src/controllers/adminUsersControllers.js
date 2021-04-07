import conexion from '../database/db.js'

export const addUser = async (req,res)=> {
    await conexion.query("INSERT INTO `hasspabd`.`usuarios` (`idUsuarios`, `pass`, `nombre`, `apellido`, `fechaNacimiento`) VALUES ('2', '123', 'sdasd', 'asdasd', '1998-08-04')")
}


export const deleteUser =(req,res)=> {
    res.send("otra cosa")
}