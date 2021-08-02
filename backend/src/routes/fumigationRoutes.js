import {Router} from 'express'
import * as fumigationCtrl from '../controllers/fumigationController'
import { authJwt } from '../middleware';

const router = Router();

router.post('/', authJwt.verifyToken, fumigationCtrl.createFumigation);

router.get('/', [authJwt.verifyToken, authJwt.isAdmin] , fumigationCtrl.getAllFumigation);

router.get('/user', authJwt.verifyToken, fumigationCtrl.getUserFumigation);

router.get('/:fumigationId',authJwt.verifyToken ,fumigationCtrl.deleteFumigationById);

router.put('/:fumigationId', authJwt.verifyToken, fumigationCtrl.updateFumigationById);

router.delete('/:fumigationId', authJwt.verifyToken, fumigationCtrl.deleteFumigationById);

export default router;