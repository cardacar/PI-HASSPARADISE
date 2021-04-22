import conexion from "../database/db.js";
export const getUser = async (req, res) => {
  /* const queryGetAllUsers = await conexion.query(`SELECT nombre,pass FROM hasspabd.usuarios
     WHERE nombre='${username}' AND pass='${password}'`,
    (error, results, fields)=>{
        if(error){
            throw error;
        }
        results.forEach(data => {
            console.log(data.pass)
        });
    });
     */
  res.json({ hola: "hola" });
};

export const addUser =(req,res) => {

}

export const logInUser = (req, res) => {
  const { username, password } = req.body;
  conexion.query(
    `SELECT * FROM hasspabd.usuarios WHERE nombre = ? AND pass = ?`,
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "El usuario o contraseña son incorrectos" });
      }
    }
  );
  //conexion.end();
};
