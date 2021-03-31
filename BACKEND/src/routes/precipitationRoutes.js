import { Router } from 'express';

const router = Router();

router.get('/', (req, res)=>{
    res.send('Get precipitation')
});

router.post('/', (req, res)=>{
    res.send('post precipitation')
});

router.delete('/:id', (req, res)=>{
    res.send('delete precipitation')
});

router.put('/:id', (req, res)=>{
    res.send('put precipitation')
});

export default router;