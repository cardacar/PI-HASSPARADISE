import { Router } from 'express';

const router =  Router();

router.get('/', (req, res)=>{
    res.send('get Fumigation')
})

export default router;