import {Router} from 'express'
import * as userCtrl from '../controllers/userAdminController';
const router = Router();

router.get('/',(req,res)=>{
    res.json({success:'admin users'})
})

export default router;