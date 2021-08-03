import mongoose from 'mongoose';


(async ()=>{
    const MONGODB_URI_LOCAL='mongodb://localhost/hasspd'
    const USER = process.env.USER_DATABASE_MONGO
    const PASSWORD = process.env.PASSWORD_DATABASE_MONGO
    const URI = `mongodb+srv://${USER}:${PASSWORD}@hassparadise.lb5ya.mongodb.net/hasspd?retryWrites=true&w=majority`
    
    try{
        const db = await mongoose.connect(MONGODB_URI_LOCAL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        })
        console.log(`Database is connected: `,db.connection.name)
    }catch(e){
        console.log(e)
    }
})();