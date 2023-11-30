import mongoose from 'mongoose';

const  URI = 'enviada-por-privado';

export const init = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected succesfuly');
    } catch (error) {
        console.error('Ha ocurrido un error al intentar conectarnos a la DB', error.message);
    }
}