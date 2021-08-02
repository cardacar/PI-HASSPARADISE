import {Schema, model} from 'mongoose';

const inventorySchema = new Schema({
    product: String,
    activeIngredient: String,
    typeProduct: String,
    module: String

},{
    timestamps: true,
    versionKey: false
});

export default model('inventory', inventorySchema);