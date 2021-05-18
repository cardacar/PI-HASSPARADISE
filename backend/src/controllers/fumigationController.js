import fumigation from "../models/fumigationModel";

export const createFumigation = async (req, res) => {
  //extraigo los datos del body
  const {
    userId,
    Name,
    lot,
    timeFinish,
    supplies,
    activeIngredients,
    pr,
    pc,
    plague,
    dose,
    appliedAmount,
    totalSpent,
    equipment,
    surplus,
    technicalVisit,
    meteorologicalCondition,
  } = req.body;

  //creo un objeto gracias al modelo
  const newFumigation = new fumigation({
    fullName:Name,
    lot,
    timeFinish,
    supplies,
    activeIngredients,
    pr,
    pc,
    plague,
    dose,
    appliedAmount,
    totalSpent,
    equipment,
    surplus,
    technicalVisit,
    meteorologicalCondition,
    user: [userId],
  });
  //guardo los datos en la coleccion de fumigation
  const fumigationSave = await newFumigation.save();
  res.status(201).json(fumigationSave);
};

export const getAllFumigation = async (req, res) => {
  const allfumigation = await fumigation.find();
  //Envio los datos obtenidos como respuesta
  res.json(allfumigation);
};

export const getAllFumigationById = async (req, res) => {
  const { fumigationId } = req.params;
  //Realizo la busqueda de los datos que coincidan con  el id
  const getfumigation = await fumigation.findById(fumigationId);
  //Envio el dato obtenido como respuesta
  res.json(getfumigation);
};

export const updateFumigationById = async (req, res) => {
  //Extraigo el id de la url
  const { fumigationId } = req.params;
  //Hago una busqueda por id y actualizo los datos recibidos desde el body y me devuelve
  //el dato actualizado
  const fumigationUpdate = await fumigation.findByIdAndUpdate(
    fumigationId,
    req.body,
    {
      new: true,
    }
  );
  //Envio el dato como respuesta
  res.status(200).json(fumigationUpdate);
};

export const deleteFumigationById = async (req, res) => {
  const { fumigationId } = req.params;
  //Envio la peticion de eliminar datos
  await fumigation.findByIdAndDelete(fumigationId);

  res.status(204).json();
};
