import { Router } from 'express';
import * as usersCtrl from '../controllers/usersController.js'

const router = Router();



router.post('/logIn', usersCtrl.logInUser);

router.post('/logOut', (req, res)=>{
    res.send('post User')
});

router.post('/addUser', usersCtrl.addUser);

router.post('/logOut', (req, res)=>{
    res.send('post User')
});


export default router;