import { Router } from 'express';

const router = Router();

router.get('/', (req, res)=>{
    res.send('Get Users')
});

router.post('/', (req, res)=>{
    res.send('post Users')
});

router.delete('/:id', (req, res)=>{
    res.send('delete Usrs')
});

router.put('/:id', (req, res)=>{
    res.send('put Users')
});

export default router;