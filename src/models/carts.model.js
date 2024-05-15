import { Schema, model } from 'mongoose'

const cartsSchema = new Schema({
    id: { 
        type: String
    },
    products: { 
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number
        }]
    }
})

cartsSchema.pre('findOne', function() {
    this.populate('products.product')
})

export const cartsModel = model('carts', cartsSchema)