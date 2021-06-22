import mongoose from 'mongoose';
//const MONGOBD_URI='mongodb+srv://cardacar:822jtZZKSNmrvWS@hassparadise.lb5ya.mongodb.net/hasspd?retryWrites=true&w=majority'
/* const MONGODB_URI_COMPASS='mongodb+srv://cardacar:822jtZZKSNmrvWS@hassparadise.lb5ya.mongodb.net/hasspd?authSource=admin&replicaSet=atlas-2g1tr3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
 */

(async ()=>{
    //const MONGODB_URI_LOCAL='mongodb://localhost/hasspd'
    const USER = 'cardacar'
    const PASSWORD = '822jtZZKSNmrvWS'
    const URI = `mongodb+srv://${USER}:${PASSWORD}@hassparadise.lb5ya.mongodb.net/hasspd?retryWrites=true&w=majority`

    try{
        const db = await mongoose.connect(URI, {
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