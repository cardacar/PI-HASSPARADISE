import sowing from '../models/sowingModel';

//Creacion datos
export const createSowing = async(req, res)=>{
    const {
        userId,
        Name,
        lot,
        variety,
        vegetableOrigin,
        totalTrees,
        distance,
        microesentials,
        Agrocilceo,
        Agrimins,
        calDolomita,
        micorrizas,
        Organomineral
    } = req.body;

    const newSowing = new sowing({
        fullName:Name,
        lot,
        variety,
        vegetableOrigin,
        totalTrees,
        distance,
        microesentials,
        Agrocilceo,
        Agrimins,
        calDolomita,
        micorrizas,
        Organomineral,
        user:[userId]
    });
    const sowingSave = await newSowing.save();
    res.status(201).json(sowingSave);

}

export const getSowingAll = async(req, res)=>{
    const allSowing = await sowing.find();
    res.json(allSowing);

}

export const getSowingById = async(req, res)=>{
    const {sowingId} = req.params;
    const getSowing = sowing.findById(sowingId);
    res.json(getSowing);

}

export const getUserSowing = async(req, res)=>{
    const {userId} = req.body
    const usersowing = await sowing.find({user:userId})
    res.json(usersowing);
  }

export const updateSowingById = async(req, res)=>{
    const {sowingId} = req.params;
    const updateSowing = await sowing.findByIdAndUpdate(
        sowingId,
        req.body,{
            new:true
        }
    );
    res.status(200).json(updateSowing);

}

export const deleteSowingById = async(req, res)=>{
    const {sowingId} = req.params;
    await sowing.findByIdAndDelete(sowingId);
    res.status(204).json();

}