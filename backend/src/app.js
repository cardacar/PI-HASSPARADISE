import express from 'express';
import morgan from  'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import fertilizationRoutes from './routes/fertilizationRoutes';
import fumigationRoutes from './routes/fumigationRoutes';
import inventoryRoutes from './routes/inventoryRoutes'
import precipitationRoutes from './routes/precipitationRoutes';
import userAdminRoutes from './routes/userAdminRoutes';
import sowingRoutes from './routes/sowingRoutes';
import reportRoutes from './routes/reportRoutes';
import authRoutes from './routes/authRoutes'
import pkg from '../package.json'
import {createRoles} from './libs/initialSetup'

const app = express();

//Creacion de roles iniciales
createRoles();
//Port
app.set('port', process.env.PORT || 3001)

//package json
app.set('pkg', pkg)
//Variables de entorno
dotenv.config({path:'./.env'})

//Middleware
app.use(morgan('dev'));//ver las peticiones que llegan al servidor
app.use(express.json());//saber leer json
app.use(express.urlencoded({extended:false}));//obtencion de datos de la url
app.use(cors({origin:"http://localhost:3000", credentials:true}));
//app.use(cors({origin:"http://localhost:5000", credentials:true}));//aceptacion de datos desde el frontend

//Routes
app.get('/',(req, res)=>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
});

app.use('/api/hpd/fertilization',fertilizationRoutes);
app.use('/api/hpd/fumigation', fumigationRoutes);
app.use('/api/hpd/inventory', inventoryRoutes);
app.use('/api/hpd/precipitation', precipitationRoutes);
app.use('/api/hpd/userAdmin', userAdminRoutes);
app.use('/api/hpd/auth', authRoutes);
app.use('/api/hpd/sowing', sowingRoutes);
app.use('/api/hpd/report', reportRoutes);



export default app;

