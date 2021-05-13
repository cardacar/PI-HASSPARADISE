//Rutas para el inicio de sesion y la creacion de usuarios
import {Router} from 'express';
import * as authCtrl from '../controllers/authController';
import { authJwt } from "../middleware";

const router = Router();
//Creacion de usuarios, solo accesible desde el administrador
router.post('/signUp', authJwt.isAdmin, authCtrl.signUp);
//Inicio de sesion
router.post('/signIn', authCtrl.signIn);

export default router;