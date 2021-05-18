//Modelo de usuario
import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
//Creacion del usuario
const userSchema = new Schema({
    fullName: {type: String,  required: true},
    cc: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    birthDate:{type: Date, required: true},
    numberTelephony: {type: String, required: false, default: null},
    cellphone: {type: String, required: true},
    role:[{//Asignacion de roles referenciando al modelo de roles
        ref:"role",
        type: Schema.Types.ObjectId
    }]
},{
    versionKey:false,
    timestamps:true
});

//funcion para encriptar la contraseña
userSchema.statics.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}
//funcion para comparar contraseñas encriptadas
userSchema.statics.comparePassword = async (password, passwordHash)=>{
    return await bcrypt.compare(password, passwordHash);
}


export default model('user', userSchema);