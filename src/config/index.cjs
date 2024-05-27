const { connect } = require('mongoose')

exports.connectDB = () => {
    try {
        connect('mongodb://127.0.0.1:27017/c53145')
        console.log('Database connected succesfuly')
    } catch (error) {
        console.error('Ha ocurrido un error al intentar conectarnos a la DB', error.message)
    }
}