import conexion from "../database/db.js";

//Obtengo todos los datos de la tabla fertilizacion
export const getAllDataFertilization = (req,res)=>{
    //Creo objeto para guardar los datos recibidos
    
    let data = {}
    //Query que me trae todos los datos de la tabla
    conexion.query(
        "SELECT * FROM hasspabd.fertilizacion;",
         (err, result) => {
             //Si el error existe lo muestro
            if(err){
                res.send({error:error});
            }
            
            //Si existe por lo menos un dato lo guardo en la variable data
            if(result.length>0) {
                data = result
                res.send({data})
            }else{//Si no tiene datos envio un mensaje notificando
                res.send({message: 'no hay datos en la tabla'})
            }
            
        }
    )
}

//Obtengo los datos filtrando por usuario
export const getDataUserFertilization = (req,res)=>{
    //Obtengo los datos del usuario
    const {id, nombre, apellido} = req.body
    //Concateno el nombre para obtener el nombre completo del usuario
    const fullName = `${nombre} ${apellido}`;
    //Creo un objeto donde guardo los datos recibidos
    let data = {}
    //Query que me trae los datos de la bd que coinciden con el operario
    conexion.query(
        "SELECT * FROM hasspabd.fertilizacion WHERE operarioEncargado=?",
        fullName,
         (err, result) => {
            if(err){//Verifico si existe un error
                res.send({error:'error'});
            }
            if(result.length>0) {//Si existen los datos los fuardo en la variable data y los envio como respuesta
                data = result
                res.send({data})
            }else{
                res.send({message: 'El usuario no tiene datos'})
            }
            
        }
    )
}

export const postFertilization = (req, res) => {
//Obtengo los datos que se ingresaran a la bd del request body
  const {
    id,
    nombre,
    apellido,
    lote,
    producto,
    visitaTecnica,
    observacion,
    metodo,
    equipo,
    cantidad,
  } = req.body;

  //Concateno los parametros del nombre y el apellido para obtener el nombre completo
  const fullName = `${nombre} ${apellido}`;
  //Obtengo la fecha actual en milisegundos
  const tiempoTranscurrido = Date.now();
  //Obtengo el dia actual de una forma mas entendible
  const diaActual = new Date(tiempoTranscurrido);
  //Transformo la fecha actual y tomo solo la parte que me importa
  const diaActualToString = diaActual.toISOString().split("T")[0];

  /* 
  Le envio un query a la base de datos para ingresar los datos 
  como se esta usando el middleware de userExtract se que el usuario existe
  y puedo ejecutar la query sin ningun problema
  */
  conexion.query(
    "INSERT INTO `hasspabd`.`fertilizacion` (`fecha`, `lote`, `producto`, `operarioEncargado`, `visitaTecnica#`, `observaciones`, `metodoAplicacion`, `equipoAplicacion`, `cantidad(cc/lt)`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
        diaActualToString, 
        lote, producto, 
        fullName, 
        visitaTecnica, 
        observacion,
        metodo,
        equipo,
        cantidad
    ],
    (err, result) => {//Verifico si existe algun error
      if (err) {
        res.send({ error: err });
      }
      //Si no hay ningun error mando un mensaje de aprobacion
      res.send({ success: 'Se ha ingresado correctamente el dato'});
    }
  );
};

//Eliminar un dato con el lote y el nombre del encargado
export const deleteOneFertilization = (req,res)=>{
    //Obtengo los datos pasados por el body con el token
    //Y los datos del params pasado por la URL
    const {id, nombre, apellido} = req.body;
    const {lote} = req.params;
    const fullName = `${nombre} ${apellido}`;
    //Query para eliminar los datos
    conexion.query(
        "DELETE * FROM hasspabd.usuarios WHERE lote=? AND operarioEncargado = ? ;",
        [fullName,lote],
        (err, result)=>{
            if(err){
                res.send({err:err});
            }else{
                res.send({message:'dato eliminado'})
            }

        }
    )
}