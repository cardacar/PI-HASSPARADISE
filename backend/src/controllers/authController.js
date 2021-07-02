//Controlador para el inicio de sesion
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import Roles from "../models/rolModel";


export const signUp = async (req, res) => {
  //Obtengo los datos para crear el usuario del body
  const { fullName, cc, password, birthDate, cellphone, roles } = req.body;

  //Creo un objeto con los datos para crear el usuario
  const newUser = new User({
    fullName,
    cc,
    password: await User.encryptPassword(password),
    birthDate,
    cellphone,
  });
  
  //Verifico si pasaron el rol
  if (roles) {
    //si existe un rol proporcionado, busco el id en la bd
    //y se lo asigno como un atributo del usuario
    const foundRole = await Roles.find({ name: { $in: roles } });
    newUser.role = foundRole.map((rol) => rol._id);
  } else {
    //si no pasan un rol, le agrego el rol de usuario
    const role = await Roles.findOne({ name: "user" });
    newUser.role = [role._id];
  }
  //obtengo el usuario que se guardo en la bd
  const userSave = await newUser.save();
/*   //Creacion del token con el id del usuario en la bd con javawebtokens con un expiracion de 7 dias
  const token = jwt.sign({ id: userSave._id }, "hola123", {
    expiresIn: 60 * 60 * 24 * 7,
  }); */
  //Devuelvo el token con los datos del usuario
  res.json({ message: "Usuario creado satisfactoriamente" });
};

export const signIn = async (req, res) => {
    const {cedula,password} = req.body;

    //Primero verifico si el usuario con la cedula recibida existe
    const userFound = await User.findOne({cc:cedula}).populate("role");

    //Si no existe ningun usuario devuelvo el mensaje de que es incorrecto
    if(!userFound) return res.json({message:"El usuario no existe"})

    //Comparo la contraseña ingresada con la que se tiene en la BD
    const passwordMatch = await User.comparePassword(password,userFound.password);

    //Si la contraseña no coincide mando el mensaje
    if(!passwordMatch) return res.json({message:"Contraseña incorrecta"});
    //Creo el token con el id del usuario
    const token = jwt.sign({id:userFound._id}, "hola123",{
        expiresIn: 60 * 60 * 24 * 7,
    })
    //Si todo es correcto envio el token con los  datos del usuario
    res.json({token})
  
};
