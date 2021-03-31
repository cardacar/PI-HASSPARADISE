import { Router } from 'express';

const router =  Router();

router.get('/', (req, res)=>{
    res.send('get Fumigation')
});

router.post('/', (req, res)=>{
    res.send('post Fumigation')
});

router.delete('/:id', (req, res)=>{
    res.send('delete Fumigation')
});

router.put('/:id', (req, res)=>{
    res.send('put Fumigation')
});

export default router;