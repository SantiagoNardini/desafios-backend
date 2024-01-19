import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://CoderUser:1234@codercluster.v6fm1bm.mongodb.net/ecommerce?retryWrites=true&w=majority')
        console.log('Conectado a la base de datos')  
    } catch (error) {
        console.log(error)
    }
}

export default connectDB