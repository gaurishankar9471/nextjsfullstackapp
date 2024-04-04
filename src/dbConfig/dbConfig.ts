import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const conenction = mongoose.connection

        conenction.on('connected', () =>{
            console.log("MongoDB connected");
        })
        conenction.on('error', (err)=>{
            console.log("Error in conecting DB"+ err)
            process.exit()
        })
    } catch (error) {
        console.log("DB conenction failed")
        console.log(error)
    }
    
}