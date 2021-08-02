import {Router} from 'express';
import * as reportCtrl from '../controllers/reportController';
import {authJwt} from '../middleware';

const router = Router();

router.get('/', reportCtrl.getReportFertilizationForLot);

export default router; 