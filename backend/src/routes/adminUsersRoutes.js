import { Router } from 'express';
import * as adminUserCtrl from "../controllers/adminUsersControllers.js" 
import conexion from '../database/db.js'

const router = Router();

/* router.get('/',(req, res)=>{
    res.send('No implementado')
}); */

router.post('/register', adminUserCtrl.addUser);

router.delete('/:id', adminUserCtrl.deleteUser);

router.put('/:id', adminUserCtrl.updateUser);

router.get('/:id', adminUserCtrl.getUser);

router.get('/', adminUserCtrl.getAllUsers);



/* router.get('/',(req, res) =>{
    res.send('probando rutas')
}) */

export default router;