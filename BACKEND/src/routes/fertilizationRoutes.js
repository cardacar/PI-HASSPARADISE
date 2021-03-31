import { Router } from 'express';

const router = Router();

router.get('/', (req,res)=>{
    res.send('Get fertilization')
});

router.post('/', (req, res)=>{
    res.send('post fertilization')
});

router.delete('/:id', (req, res)=>{
    res.send('delete fertilization')
});

router.put('/:id', (req, res)=>{
    res.send('put fertilization')
});

export default router;
