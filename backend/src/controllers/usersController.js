import conexion from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//Loggeo de usuario y creacion de token con jwt
export const logInUser = (req, res) => {
  //Obtengo el id y password del reques body
  const { id, password } = req.body;
  //Realixo una query para ver si el usuario existe en la bd
  conexion.query(
    `SELECT * FROM hasspabd.usuarios WHERE idUsuarios = ?;`,
    id,
    (err, result) => {//Si hay algun error a la hora de consultar lo muestro
      if (err) {
        res.send({ err: err });
      }
      //Si el usuario existe procedos a comparar la contraseña con bcryp
      if (result.length > 0) {
        bcrypt.compare(password, result[0].pass, (error, response) => {
          //Si la contraseña coincide con la de la bd envio los datos del usuario
          if (response) {
            //Obtengo los datos del usuario
            const nombre = result[0].nombre;
            const apellido = result[0].apellido;
            const idUsuarios = result[0].idUsuarios;
            //Creo un objeto con los datos del usuario para crear un token con jwt
            const userForToken = {
              id:idUsuarios,
              nombre:nombre,
              apellido:apellido}
            //Creo un token con el objeto que contiene los datos del usuario y hago
            //que tenga una duracion de maximo 7 dias
            const token = jwt.sign(
              userForToken, 
              process.env.TOKEN_SECRET_WORD,
              {
                expiresIn: 60 * 60 * 24 * 7
              })
            //envio el token como respuesta
            res.send(token);
          } else {//Si la contraseña es diferente envio un mensaje para que verifique los datos y no lo dejo loggearse
            res.send({ message: "El usuario o contraseña son incorrectos" });
          }
        });
      } else {//Si el usuario no existe envio un mensaje para que verifique los datos y no lo dejo loggearse
        res.send({ message: "El usuario o contraseña son incorrectos" });
      }
    }
  );
};
