const { connect } = require('mongoose')

exports.connectDB = () => {
    try {
        // connect('mongodb://127.0.0.1:27017/c53145')
        connect('mongodb+srv://admin:tNYclI4wo1nqG1Ge@cluster0.akju9kh.mongodb.net/ecommerce')
        console.log('Database connected succesfuly')
    } catch (error) {
        console.error('Ha ocurrido un error al intentar conectarnos a la DB', error.message)
    }
}