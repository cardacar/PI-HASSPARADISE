import {Router} from 'express'
import * as fertilizationCtrl from '../controllers/fertilizationController'
import {authJwt} from '../middleware'

const router = Router();

router.post('/', authJwt.verifyToken, fertilizationCtrl.createFertilization);

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], fertilizationCtrl.getFertilizationAll);

router.get('/user', authJwt.verifyToken, fertilizationCtrl.getUserFertilization);

router.get('/:fertilizationId',  authJwt.verifyToken, fertilizationCtrl.getFertilizationById);

router.put('/:fertilizationId', authJwt.verifyToken, fertilizationCtrl.updateFertilizationById);

router.delete('/:fertilizationId',  authJwt.verifyToken, fertilizationCtrl.deleteFertilizationById);




export default router;