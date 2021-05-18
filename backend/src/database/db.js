import mongoose from 'mongoose';


(async ()=>{
    try{
        const db = await mongoose.connect('mongodb://localhost/hasspd', {
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