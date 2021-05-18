import {Router} from 'express'
import * as inventoryCtrl from '../controllers/inventoryController'

const router = Router();

router.get('/',(req,res)=>{
    res.json({success:'inventory'})
})

export default router;