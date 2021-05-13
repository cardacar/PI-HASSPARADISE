import User from "../models/userModel";
import Roles from "../models/rolModel";


export const createUser = async (req, res) => {
    //obtengo los datos del body
  const {
    fullName,
    cc,
    password,
    birthDate,
    cellphone,
    numberTelephony,
    roles,
  } = req.body;
  //creo el objeto usuario
  const newUser = new User({
    fullName,
    cc,
    password: await User.encryptPassword(password),
    birthDate,
    cellphone,
    numberTelephony,
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
  await newUser.save();
  //Devuelvo el token con los datos del usuario
  res.json({ message: "Usuario creado satisfactoriamente" });
};

export const getAllUser = async (req, res) => {
    //busco todos los usuarios en la bd
    const allUsers = await User.find();
    //si existen usuarios los muestro 
    if(allUsers) return res.json(allUsers);
    //si no existen usuarios envio un mensaje
    res.json({message: "No hay usuarios"})

};

export const getUserById = async (req, res) => {
    //Obtengo el id del params
    const {userId} = req.params;
    //realizo una busqueda del id pasado
    const userFound = await User.findById(userId);
    //si el usuario existe lo devuelvo de lo contrario envio un mensaje
    if(userFound) return res.json(userFound);
    res.json({message: "El usuario no existe"});
};

export const updateUserById = async (req, res) => {
    //Obtengo el id del params
    const {userId} = req.params;
    //Busco y actualizo los datos del usuario
    const userUpdate = await User.findByIdAndUpdate(userId, req.body,{new:true});
};

export const deleteUserById = async (req, res) => {};
