import {Router} from 'express'
import * as userCtrl from '../controllers/userAdminController';
import { authJwt } from "../middleware";
import {checkRoleExisting, userRepeat} from "../middleware/verifySignUp"
const router = Router();
//rutas para la administracion de usuarios, solo accesible desde el rol admin
//creacion de usuarios
router.post('/',[authJwt.verifyToken, authJwt.isAdmin,checkRoleExisting, userRepeat], userCtrl.createUser);
//obtener todos los usuarios de la bd
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.getAllUser);
//obtener un usuario en especifico
router.get('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.getUserById);
//actualizar un usuario por id
router.put('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.updateUserById);
//eliminar un usuario
router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.deleteUserById);

export default router;