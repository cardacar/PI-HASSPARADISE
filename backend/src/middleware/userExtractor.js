import jwt from "jsonwebtoken";
//Middleware para saber si el token ingresado es valido y estraer los datos del usuario
export const userExtractor =  (req, res, next) => {
    //Obtengo la autorizacion del reques
  const authorization = req.get("authorization");
  //Inicializo el token como vacio
  let token = {};
  //Compruebo si el token existe y si cumple con el marco de acceso proporcionado por mdn
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      //Si el token existe elimino la cabecera para eliminar el marco
    token = authorization.substring(7);
  }
  //Inicializo variable para decodificar el token
  let decodedToken = {};
  try {
      //Decodifico el token para obtener los datos suministrados
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_WORD);
  } catch (e) {
    console.log(e);
  }

  //Si el token no existe o no tiene el id del usuario
  //finalizo la ejecucion y envio mensaje para que sepa que el token no existe o no es valido
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "missing token or invalid token" });
  }

  //Obtengo los datos suministrados por el token
  const { id, nombre, apellido } = decodedToken;
  //Hago una mutacion del reques body para incluir los datos dados por el token
  //Para asi obtener los datos del usuario que ha ingresado
  req.body.id = id;
  req.body.nombre = nombre;
  req.body.apellido = apellido;
  //Como es un middleware ejecuto next para que siga ejecutando los datos
  next();
};

