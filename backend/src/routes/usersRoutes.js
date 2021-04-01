import { Router } from 'express';

const router = Router();

router.get('/logIn', (req, res)=>{
    res.send('LogIn')
});

router.get('/logOut', (req, res)=>{
    res.send('LogOut')
});

router.post('/logIn', (req, res)=>{
    res.send('post Users')
});

router.post('/logOut', (req, res)=>{
    res.send('post User')
});



export default router;