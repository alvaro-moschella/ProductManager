const { connect } = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

exports.connectDB = () => {
    try {
        connect(process.env.MONGO_URL_ATLAS)
        console.log('Database connected succesfuly')
    } catch (error) {
        console.error('Ha ocurrido un error al intentar conectarnos a la DB', error.message)
    }
}