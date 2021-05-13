//Modelo para los roles de los usuarios
import {Schema, model} from  'mongoose';

export const ROLES = ["user", "admin"]
const roleSchema = new Schema({
    name: String,
},{
    versionKey:false
})

export default model('role', roleSchema);