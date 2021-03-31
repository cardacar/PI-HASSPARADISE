import { Router } from 'express';

const router = Router();

router.get('/', (req, res)=>{
    res.send('Get Inventory')
});

router.post('/', (req, res)=>{
    res.send('post Inventory')
});

router.delete('/:id', (req, res)=>{
    res.send('delete Inventory')
});

router.put('/:id', (req, res)=>{
    res.send('put Inventory')
});

export default router;