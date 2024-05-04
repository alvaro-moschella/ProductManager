import { Schema, model } from 'mongoose';

const cartsSchema = new Schema({
    id: { 
        type: String, 
        required: true 
    },
    products: { 
        type: [], 
        required: true 
    }
})

const cartsModel = model('carts', cartsSchema)

module.exports = {
    cartsModel
}