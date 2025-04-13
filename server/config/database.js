import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true
        })
        console.log('connected successfully')
    } catch (e) {
        console.error(e.message)
        process.exit(1)
    }
}

export default connectDB