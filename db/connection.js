import mongoose from 'mongoose';

const connectionDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/sarahApp')
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        
    }
};

export default connectionDB;
