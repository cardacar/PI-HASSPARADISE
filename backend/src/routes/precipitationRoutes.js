import {Router} from 'express'
import * as precipitationCtrl from '../controllers/precipitationController';

const router = Router();

router.get('/',(req,res)=>{
    res.json({success:'precipitation'})
})

export default router;