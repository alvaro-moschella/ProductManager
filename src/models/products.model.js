import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const productsSchema = new Schema({
    title: { 
        type: String, 
        index: true,
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    code: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: Boolean, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    thumbnails: { 
        type: [String], 
        required: false 
    }
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = model(productCollection, productsSchema)