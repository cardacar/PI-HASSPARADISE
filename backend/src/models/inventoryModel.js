import {Schema, model} from 'mongoose';

const inventorySchema = new Schema({
    lote: String,
    big:{type: Number, default: 0},
    medium:{type: Number, default: 0},
    small:{type: Number, default: 0},
    total: Number,
    plantingDistance: String,
    totalPlantingDistance: String,
    hectaresSown: Number

})