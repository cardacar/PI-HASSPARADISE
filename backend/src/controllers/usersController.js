import conexion from "../database/db.js";
import bcrypt from "bcryptjs";
export const getUser = async (req, res) => {
  const {id, name, token} = req.body;
  if(!token){
    res.send({message:'Por favor'})
  }
};

export const logInUser = (req, res) => {
  const { id, password } = req.body;
  conexion.query(
    `SELECT * FROM hasspabd.usuarios WHERE idUsuarios = ?;`,
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].pass, (error, response) => {
          if (response) {
            const nombre = result[0].nombre;
            const apellido = result[0].apellido;
            const token = null;
            const user = {nombre,apellido,token}
            res.send(user);
          } else {
            res.send({ message: "El usuario o contraseña son incorrectos" });
          }
        });
      } else {
        res.send({ message: "El usuario no existe." });
      }
    }
  );
  //conexion.end();
};
