import express from 'express';
import morgan from 'morgan';
import fertilizationRoutes from './src/routes/fertilizationRoutes.js'

const app = express()

app.set('port', process.env.PORT || 3001)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Busca los endpoints xd')
});

app.use('/fertilization', fertilizationRoutes);

export default app;