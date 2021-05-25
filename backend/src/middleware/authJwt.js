import jwt from "jsonwebtoken";
import User from "../models/userModel";
import Role from "../models/rolModel";

//Middleware que me verifica el token
export const verifyToken = async (req, res, next) => {
  try {
    //Obtengo el token de la cabecera de autorizacion
    const authorization = req.get("authorization");
    //Verifico que exista algun token, si no existe envio un mensaje
    if (!authorization)
    return res.status(403).json({ message: "No token provider" });
    //Creo la variable token para actualizar el bearer
    let token = {};
    //Verifico que tenga el bearer
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      //Obtengo el token limpio
      token = authorization.substring(7);
    }
    //Variable donde guardare el token decodificado
    let decodedToken = {};
    //Decodifico el token
    decodedToken = jwt.verify(token, "hola123");
    //Agrego el id del token al request
    req.body.userId = decodedToken.id;
    
    //Verifico que el id proporcionado por el token exista en la bd y elimino la contraseña del token
    const user = await User.findById(req.body.userId, { password: 0 });
    
    //Si el usuario no existe envio un mensaje
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    //si el usuario existe agrego el nombre al request
    req.body.Name = user.fullName;
    //Si todo es perfecto hago un next
    next();
  } catch (error) {
    //Si hay algun error mando un mensaje
    console.log(error)
    return res.status(401).json({ message: "No tienes autorizacion" });
  }
};

//Middleware que me verifica si es un admin
export const isAdmin = async (req, res, next) => {
    //Obtengo el usuario con el id 
  const user = await User.findById(req.body.userId);
  //Obtengo los roles que posee el usuario
  const roles = await Role.find({ _id: {$in: user.role} });
  //console.log(role)
//Recorro el array de roles verficando si es un admin
  for (let x = 0; x < roles.length; x++) {
    if (roles[x].name === "admin") {
      next();
      return;
    }
  }
  //Si no tiene la propiedad de admin no le permito seguir
  return res.status(403).json({ message: "requiere admin rol" });
}

export const isGestorReportes = async (req, res, next)=>{
  const user = await User.findById(req.body.userId);
  const roles = await Role.findById({_id: { $in: user.role}});
  for(let x = 0; x < roles.length; x++){
    if(roles[x].name === "gestorReportes"){
      next();
      return;
    }
  }
  return res.status(403).json({ message: "requiere gestor de reportes" });

}
