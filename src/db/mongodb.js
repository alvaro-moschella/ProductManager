import mongoose from 'mongoose';

const  URI = 'mongodb+srv://developer:HPXVPZzvDZXdEr2V@cluster0.or3kdfn.mongodb.net/ecommerce?retryWrites=true&w=majority';

export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected succesfuly');
    } catch (error) {
        console.error('Ha ocurrido un error al intentar conectarnos a la DB', error.message);
    }
}