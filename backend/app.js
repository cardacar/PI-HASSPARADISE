import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session'
import cors from 'cors'
import fertilizationRoutes from './src/routes/fertilizationRoutes.js'
import fumigationRoutes from './src/routes/fumigationRoutes.js'
import inventoryRoutes from './src/routes/inventoryRoutes.js'
import precipitationRoutes from './src/routes/precipitationRoutes.js'
//import adminUsersRoutes from './src/routes/adminUsersRoutes.js'
import usersRoutes from './src/routes/usersRoutes.js'
import adminUsersRoutes from "./src/routes/adminUsersRoutes.js";


const app = express()

//Set
app.set('port', process.env.PORT || 3001)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Config
dotenv.config({path: './.env'});
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(cors({ origin: "http://localhost:3000", credentials: true  }))

//Routes
app.get('/', (req,res)=>{
    res.send('Busca los endpoints xd')
});

app.use('/fertilization', fertilizationRoutes);
app.use('/hsp/fumigation', fumigationRoutes);
app.use('/hsp/inventory', inventoryRoutes);
app.use('/hsp/precipitation', precipitationRoutes);
app.use('/hsp/users', usersRoutes);

app.use('/hsp/adminUsers', adminUsersRoutes);

export default app;
