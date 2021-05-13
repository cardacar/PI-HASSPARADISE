import express from 'express';
import morgan from  'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import fertilizationRoutes from './routes/fertilizationRoutes';
import fumigationRoutes from './routes/fumigationRoutes';
import inventoryRoutes from './routes/inventoryRoutes'
import precipitationRoutes from './routes/precipitationRoutes';
import userAdminRoutes from './routes/userAdminRoutes';
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
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({origin:"http://localhost:3000", credentials:true}));

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



export default app;

