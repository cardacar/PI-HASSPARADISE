import express from 'express';
import morgan from 'morgan';
import fertilizationRoutes from './src/routes/fertilizationRoutes.js'
import fumigationRoutes from './src/routes/fumigationRoutes.js'
import inventoryRoutes from './src/routes/inventoryRoutes.js'
import precipitationRoutes from './src/routes/precipitationRoutes.js'
import adminUsersRoutes from './src/routes/adminUsersRoutes.js'
import usersRoutes from './src/routes/usersRoutes.js'


const app = express()

//Sets
app.set('port', process.env.PORT || 3001)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());



//Routes
app.get('/', (req,res)=>{
    res.send('Busca los endpoints xd')
});

app.use('hsp/fertilization', fertilizationRoutes);
app.use('hsp/fumigation', fumigationRoutes);
app.use('hsp/inventory', inventoryRoutes);
app.use('hsp/precipitation', precipitationRoutes);
app.use('hsp/adminUsers', adminUsersRoutes);
app.use('hsp/users', usersRoutes);

export default app;