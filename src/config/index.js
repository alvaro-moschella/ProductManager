import { connect } from 'mongoose'
import { MongoSingleton } from '../utils/MongoSingleton.js'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
    MongoSingleton.getInstance()
}