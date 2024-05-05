import { Schema, model } from 'mongoose';

const messagesSchema = new Schema({
    user: {
        type: String,
        unique: true, 
        required: true
    },
    message: { 
        type: String, 
        required: true 
    }
})

const messagesModel = model('messages', messagesSchema)

module.exports = {
    messagesModel
}