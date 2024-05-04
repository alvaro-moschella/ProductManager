const { connect } = require('mongoose')

exports.connectDB = () => {
    try {
        connect('mongodb+srv://admin:tNYclI4wo1nqG1Ge@cluster0.akju9kh.mongodb.net/')
        console.log('Database connected succesfuly')
    } catch (error) {
        console.error('Ha ocurrido un error al intentar conectarnos a la DB', error.message)
    }
}