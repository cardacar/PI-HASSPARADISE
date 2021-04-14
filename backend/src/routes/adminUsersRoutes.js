import { Router } from 'express';
import * as adminUserCtrl from "../controllers/adminUsersControllers.js" 

const router = Router();

router.get('/',(req, res)=>{
    res.send('No implementado')
});

router.post('/register', adminUserCtrl.addUser);

router.delete('/:id', (req, res)=>{
    res.send('delete adminUsers')
});

router.put('/:id', (req, res)=>{
    res.send('put adminUsers')
});

export default router;