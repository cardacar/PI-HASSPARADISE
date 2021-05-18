import fertilization from "../models/fertilizationModel";

//Creacion de datos
export const createFertilization = async (req, res) => {
  //Obtengo los parametros a guardar del body
  const {
    userId,
    Name,
    lot,
    product,
    composition,
    method,
    amount,
    equipment,
    technicalVisit,
    observation,
  } = req.body;
  console.log(req.body.userId);
  //Creo un objeto con los datos a guardar
  const newFertilization = new fertilization({
    fullName:Name,
    lot,
    product,
    composition,
    method,
    amount,
    equipment,
    technicalVisit,
    observation,
    user:[userId]
  });

  //Guardo los datos en mongoDB
  const fertilizationSave = await newFertilization.save();
  //Envio el objeto creado como respuesta
  res.status(201).json(fertilizationSave);
};

//Obtener todos los datos
export const getFertilizationAll = async (req, res) => {
  //Realizo una busqueda en la BD
  const allFertilization = await fertilization.find();
  //Envio los datos obtenidos como respuesta
  res.json(allFertilization);
};

//Obtencion de datos individuales por id
export const getFertilizationById = async (req, res) => {
  //Extraigo el id de la url
  const { fertilizationId } = req.params;
  //Realizo la busqueda de los datos que coincidan con  el id
  const getFertilization = await fertilization.findById(fertilizationId);
  //Envio el dato obtenido como respuesta
  res.json(getFertilization);
};

//Actualizar datos
export const updateFertilizationById = async (req, res) => {
  //Extraigo el id de la url
  const { fertilizationId } = req.params;
  //Hago una busqueda por id y actualizo los datos recibidos desde el body y me devuelve
  //el dato actualizado
  const fertilizationUpdate = await fertilization.findByIdAndUpdate(
    fertilizationId,
    req.body,
    {
      new: true,
    }
  );
  //Envio el dato como respuesta
  res.status(200).json(fertilizationUpdate);
};

//Eliminar datos
export const deleteFertilizationById = async (req, res) => {
  //Extraigo el id de la url
  const { fertilizationId } = req.params;
  //Envio la peticion de eliminar datos
  await fertilization.findByIdAndDelete(fertilizationId);

  res.status(204).json();
};
