import {connect} from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

export class MongoSingleton {
    static #instance
    constructor(){
        connect(process.env.MONGO_URL_ATLAS)
    }

    static getInstance(){
        if(this.#instance){
            console.log('Base de datos ya esta conectada')
            return this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log('Base de datos conectada')
        return this.#instance
    }
}