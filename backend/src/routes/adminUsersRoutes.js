import { Router } from 'express';
import * as adminUserCtrl from "../controllers/adminUsersControllers.js" 

const router = Router();

router.get('/',adminUserCtrl.addUser);

router.post('/', (req, res)=>{
    res.send('post adminUsers')
    console.log(req.body)
});

router.delete('/:id', (req, res)=>{
    res.send('delete adminUsers')
});

router.put('/:id', (req, res)=>{
    res.send('put adminUsers')
});

export default router;