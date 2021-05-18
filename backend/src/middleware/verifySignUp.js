import { ROLES } from "../models/rolModel";
import User from "../models/userModel";

//Verifico si el usuario que se usa para crear existe
export const userRepeat = async (req, res, next) => {
  //Obtengo la cc del usuario a crear y lo busco en la BD
  const user = await User.findOne({ cc: req.body.cc });
  //Si el usuario existe envio mensaje
  if (user) return res.status(400).json({ message: "The user already exists" });
  //Si no existe le permito procedeer
  next();
};

//Verifico si los roles que me pasan por parametros existen
export const checkRoleExisting = (req, res, next) => {
  //Obtengo los roles
  const { role } = req.body;
  //Si hay un rol hago la verificacion con los datos guardados
  if (role) {
    for (let i = 0; i < role.length; i++) {
      if (!ROLES.includes(role[i])) {
        //Si el rol no existe envio el mensaje
        return res
          .status(400)
          .json({ message: `Role ${role[i]} does not exists` });
      }
    }
  }
  next();
};
