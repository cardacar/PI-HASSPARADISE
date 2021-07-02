import {Router} from 'express'
import * as sowingCtrl from '../controllers/sowingController';
import {authJwt} from '../middleware'

const router = Router();

router.post('/', authJwt.verifyToken, sowingCtrl.createSowing);

router.get('/',[authJwt.verifyToken, authJwt.verifyToken], sowingCtrl.getSowingAll);
router.get('/:sowingId', authJwt.verifyToken, sowingCtrl.getSowingById)

router.put('/:sowingId', authJwt.verifyToken, sowingCtrl.updateSowingById);

router.delete('/:sowingId', authJwt.verifyToken, sowingCtrl.deleteSowingById);


export default router;