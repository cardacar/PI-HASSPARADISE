import {Schema, model} from 'mongoose';

const precipitationSchema = new Schema({
    data: String
},{
    timestamps: true,
    versionKey: false
});

export default model('precipitation', precipitationSchema);